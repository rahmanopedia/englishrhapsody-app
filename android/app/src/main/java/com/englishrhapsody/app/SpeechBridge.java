package com.englishrhapsody.app;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.util.ArrayList;

public class SpeechBridge implements RecognitionListener {

    private final Context context;
    private final WebView webView;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private SpeechRecognizer recognizer;

    public SpeechBridge(Context context, WebView webView) {
        this.context = context;
        this.webView = webView;
    }

    @JavascriptInterface
    public void start() {
        mainHandler.post(() -> {
            if (recognizer != null) {
                recognizer.destroy();
                recognizer = null;
            }
            if (!SpeechRecognizer.isRecognitionAvailable(context)) {
                sendEvent("error", "{\"code\":\"service-not-available\"}");
                sendEvent("end", "{}");
                return;
            }
            recognizer = SpeechRecognizer.createSpeechRecognizer(context);
            recognizer.setRecognitionListener(this);

            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            recognizer.startListening(intent);
        });
    }

    @JavascriptInterface
    public void stop() {
        mainHandler.post(() -> {
            if (recognizer != null) recognizer.stopListening();
        });
    }

    private void sendEvent(String type, String jsonData) {
        String js = "window._androidSpeechEvent && window._androidSpeechEvent('" + type + "'," + jsonData + ")";
        mainHandler.post(() -> webView.evaluateJavascript(js, null));
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
            String text = matches.get(0).replace("'", "\\'");
            sendEvent("partial", "{\"text\":\"" + text + "\"}");
        }
    }

    @Override
    public void onResults(Bundle results) {
        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        String text = (matches != null && !matches.isEmpty()) ? matches.get(0).replace("'", "\\'") : "";
        sendEvent("result", "{\"text\":\"" + text + "\"}");
        sendEvent("end", "{}");
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
        sendEvent("error", "{\"code\":\"" + code + "\"}");
        sendEvent("end", "{}");
        cleanup();
    }

    private void cleanup() {
        if (recognizer != null) {
            recognizer.destroy();
            recognizer = null;
        }
    }
}
