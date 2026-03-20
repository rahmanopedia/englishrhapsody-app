if('serviceWorker' in navigator){
  var _prevCtrl = navigator.serviceWorker.controller;
  var _reloaded = false;

  // Yeni SW devreye girince sayfayı otomatik yenile
  navigator.serviceWorker.addEventListener('controllerchange', function(){
    if(_prevCtrl && !_reloaded){
      _reloaded = true;
      window.location.reload();
    }
  });

  window.addEventListener('load', function(){
    navigator.serviceWorker.register('service-worker.js').catch(function(){});
  });
}
