var CACHE_NAME = 'FDZ_TIMER_V1';
var urlsToCache = [
'./',
'./index.html',
'./manifest.json',
'./main.js',
'./style.css',
'./beep.mp3',
'./beep2.mp3',
'./favicon.png',
'./service-worker.js'];

self.addEventListener('install', function(event){
  //Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache){
      console.log('Opened cached');
      return cache.addAll(urlsToCache);
    })
  );
 });

self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      //Cache hit - return response
      if(response){
        console.log(`Successfully fetched resource from cache: ${event.request.url}`);
        return response;
      }else{
        console.error(`Failed to fetch resource: ${event.request.url}`);
      }
      return fetch(event.request);
    })
    );
});

// Delete outdated caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})