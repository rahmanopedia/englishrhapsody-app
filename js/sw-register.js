if ('serviceWorker' in navigator) {
  var _prevCtrl = navigator.serviceWorker.controller;
  var _reloaded  = false;

  // Yeni SW devreye girince sayfayı otomatik yenile
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (_prevCtrl && !_reloaded) {
      _reloaded = true;
      window.location.reload();
    }
  });

  function _swShowUpdateBanner(worker) {
    if (document.getElementById('sw-update-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'sw-update-banner';
    banner.innerHTML =
      '🔄 Yeni güncelleme mevcut' +
      '<button id="sw-update-btn">Güncelle</button>';
    document.body.appendChild(banner);
    document.getElementById('sw-update-btn').addEventListener('click', function () {
      worker.postMessage({ type: 'SKIP_WAITING' });
      banner.remove();
    });
    // 10 saniye sonra otomatik kapat
    setTimeout(function () { banner && banner.remove(); }, 10000);
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('service-worker.js').then(function (reg) {

      // Kayıt sırasında zaten bekleyen SW varsa
      if (reg.waiting && navigator.serviceWorker.controller) {
        _swShowUpdateBanner(reg.waiting);
      }

      // Yeni SW yüklenirken
      reg.addEventListener('updatefound', function () {
        var newWorker = reg.installing;
        newWorker.addEventListener('statechange', function () {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            _swShowUpdateBanner(newWorker);
          }
        });
      });

    }).catch(function () {});
  });
}
