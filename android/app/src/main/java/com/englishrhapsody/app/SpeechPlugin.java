package com.englishrhapsody.app;

import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;

@CapacitorPlugin(name = "NativeSpeech")
public class SpeechPlugin extends Plugin implements RecognitionListener {

    private SpeechRecognizer recognizer;

    @PluginMethod
    public void start(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (recognizer != null) {
                recognizer.destroy();
                recognizer = null;
            }
            if (!SpeechRecognizer.isRecognitionAvailable(getContext())) {
                JSObject err = new JSObject();
                err.put("code", "service-not-available");
                notifyListeners("error", err, true);
                notifyListeners("end", new JSObject(), true);
                call.resolve();
                return;
            }
            recognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
            recognizer.setRecognitionListener(this);

            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            recognizer.startListening(intent);
            call.resolve();
        });
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (recognizer != null) recognizer.stopListening();
        });
        call.resolve();
    }

    @Override public void onReadyForSpeech(Bundle params) {}
    @Override public void onBeginningOfSpeech() {}
    @Override public void onRmsChanged(float rmsdB) {}
    @Override public void onBufferReceived(byte[] buffer) {}
    @Override public void onEndOfSpeech() {}
    @Override public void onEvent(int eventType, Bundle params) {}

    @Override
    public void onPartialResults(Bundle partialResults) {
        ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (matches != null && !matches.isEmpty() && !matches.get(0).isEmpty()) {
            JSObject data = new JSObject();
            data.put("text", matches.get(0));
            notifyListeners("partial", data, true);
        }
    }

    @Override
    public void onResults(Bundle results) {
        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        String text = (matches != null && !matches.isEmpty()) ? matches.get(0) : "";
        JSObject data = new JSObject();
        data.put("text", text);
        notifyListeners("result", data, true);
        notifyListeners("end", new JSObject(), true);
        cleanup();
    }

    @Override
    public void onError(int error) {
        String code;
        switch (error) {
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS: code = "not-allowed"; break;
            case SpeechRecognizer.ERROR_NO_MATCH:
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT: code = "no-speech"; break;
            case SpeechRecognizer.ERROR_NETWORK:
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
            case SpeechRecognizer.ERROR_SERVER: code = "network"; break;
            case SpeechRecognizer.ERROR_RECOGNIZER_BUSY: code = "busy"; break;
            default: code = "aborted"; break;
        }
        JSObject data = new JSObject();
        data.put("code", code);
        notifyListeners("error", data, true);
        notifyListeners("end", new JSObject(), true);
        cleanup();
    }

    private void cleanup() {
        if (recognizer != null) {
            recognizer.destroy();
            recognizer = null;
        }
    }
}
