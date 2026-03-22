package com.englishrhapsody.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
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
    private final Handler handler = new Handler(Looper.getMainLooper());

    private Intent buildIntent() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        return intent;
    }

    @PluginMethod
    public void start(PluginCall call) {
        handler.post(() -> {
            if (speechRecognizer == null) {
                // İlk kez: oluştur ve hemen başlat
                speechRecognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
                speechRecognizer.setRecognitionListener(this);
                active = true;
                speechRecognizer.startListening(buildIntent());
            } else {
                // Mevcut recognizer var: iptal et, 200ms bekle, tekrar başlat
                speechRecognizer.cancel();
                active = false;
                handler.postDelayed(() -> {
                    if (speechRecognizer != null) {
                        active = true;
                        speechRecognizer.startListening(buildIntent());
                    }
                }, 200);
            }
        });
        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        handler.post(() -> {
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
        // ERROR_CLIENT (5) = cancel() çağrısından — yoksay
        if (error == SpeechRecognizer.ERROR_CLIENT) return;
        // ERROR_RECOGNIZER_BUSY (8) = önceki session henüz kapanmadı — yoksay
        if (error == 8) return;

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
