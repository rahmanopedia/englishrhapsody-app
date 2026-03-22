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

    private SpeechRecognizer speechRecognizer;
    private boolean active = false;

    private void destroyRecognizer() {
        if (speechRecognizer != null) {
            speechRecognizer.cancel();
            speechRecognizer.destroy();
            speechRecognizer = null;
        }
        active = false;
    }

    @PluginMethod
    public void start(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            // Eğer analiz/dinleme sürecindeyse önce iptal et
            destroyRecognizer();

            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
            speechRecognizer.setRecognitionListener(this);
            active = true;

            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            // Cihaz üzerinde (offline) tanıma — Google sunucusuna gönderme
            intent.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, true);

            speechRecognizer.startListening(intent);
        });
        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (speechRecognizer != null && active) {
                speechRecognizer.stopListening();
            }
        });
        call.resolve();
    }

    @Override
    public void onResults(Bundle results) {
        active = false;
        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        String text = (matches != null && !matches.isEmpty()) ? matches.get(0) : "";
        JSObject data = new JSObject();
        data.put("text", text);
        notifyListeners("result", data, true);
        notifyListeners("end", new JSObject(), true);
    }

    @Override
    public void onPartialResults(Bundle partial) {
        ArrayList<String> matches = partial.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (matches != null && !matches.isEmpty()) {
            JSObject data = new JSObject();
            data.put("text", matches.get(0));
            notifyListeners("partial", data, true);
        }
    }

    @Override
    public void onError(int error) {
        active = false;
        // ERROR_CLIENT (5) = cancel() çağrısından gelir — sessizce yoksay
        if (error == SpeechRecognizer.ERROR_CLIENT) return;

        String code;
        switch (error) {
            case SpeechRecognizer.ERROR_NO_MATCH:
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                code = "no-speech"; break;
            default:
                code = "service-not-available"; break;
        }
        JSObject err = new JSObject();
        err.put("code", code);
        notifyListeners("error", err, true);
        notifyListeners("end", new JSObject(), true);
    }

    @Override public void onReadyForSpeech(Bundle params) {}
    @Override public void onBeginningOfSpeech() {}
    @Override public void onRmsChanged(float rmsdB) {}
    @Override public void onBufferReceived(byte[] buffer) {}
    @Override public void onEndOfSpeech() {}
    @Override public void onEvent(int eventType, Bundle params) {}
}
