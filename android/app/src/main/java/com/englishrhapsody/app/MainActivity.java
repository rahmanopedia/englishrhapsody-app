package com.englishrhapsody.app;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.WindowManager;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private WindowInsetsControllerCompat insetsController;
    private final Handler hideHandler = new Handler(Looper.getMainLooper());
    private final Runnable hideSystemBars = () -> {
        if (insetsController != null) {
            insetsController.hide(WindowInsetsCompat.Type.systemBars());
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // NativeSpeech plugin'ini kaydet — super.onCreate'dan önce olmalı
        registerPlugin(SpeechPlugin.class);
        super.onCreate(savedInstanceState);

        // Edge-to-edge: CSS safe-area-inset değerlerini doğru iletir
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // Ekran görüntüsü ve ekran kaydını engelle
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );

        // System bar gizleme davranışı: kenardan kaydırınca geçici göster
        View decorView = getWindow().getDecorView();
        insetsController = new WindowInsetsControllerCompat(getWindow(), decorView);
        insetsController.setSystemBarsBehavior(
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        );

        // Mikrofon iznini runtime'da iste
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                new String[]{ Manifest.permission.RECORD_AUDIO }, 1);
        }

        // 3 saniye sonra status bar + nav bar gizle
        hideHandler.postDelayed(hideSystemBars, 3000);
    }

    @Override
    public void onResume() {
        super.onResume();
        hideHandler.postDelayed(hideSystemBars, 3000);
    }

    @Override
    public void onPause() {
        super.onPause();
        hideHandler.removeCallbacks(hideSystemBars);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        hideHandler.removeCallbacks(hideSystemBars);
    }
}
