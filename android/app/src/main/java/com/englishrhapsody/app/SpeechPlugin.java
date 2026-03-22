package com.englishrhapsody.app;

import android.app.Activity;
import android.content.Intent;
import android.speech.RecognizerIntent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;

@CapacitorPlugin(name = "NativeSpeech")
public class SpeechPlugin extends Plugin {

    private static final int SPEECH_REQUEST = 1001;

    @PluginMethod
    public void start(PluginCall call) {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Cümleyi İngilizce söyle…");

        try {
            startActivityForResult(call, intent, SPEECH_REQUEST);
        } catch (Exception e) {
            JSObject err = new JSObject();
            err.put("code", "service-not-available");
            notifyListeners("error", err, true);
            notifyListeners("end", new JSObject(), true);
            call.resolve();
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        call.resolve();
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode != SPEECH_REQUEST) return;

        if (resultCode == Activity.RESULT_OK && data != null) {
            ArrayList<String> results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            String text = (results != null && !results.isEmpty()) ? results.get(0) : "";
            JSObject resultData = new JSObject();
            resultData.put("text", text);
            notifyListeners("result", resultData, true);
        } else {
            JSObject err = new JSObject();
            err.put("code", resultCode == Activity.RESULT_CANCELED ? "aborted" : "no-speech");
            notifyListeners("error", err, true);
        }
        notifyListeners("end", new JSObject(), true);
    }
}
