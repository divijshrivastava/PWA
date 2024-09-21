
const cacheName = 'v1';

self.addEventListener('install', e =>{
    console.log("Installing SW");

  /*  e.waitUntil(

        

    );*/
})

self.addEventListener('activate', e => {
   // self.clients.claim();
   e.waitUntil(clients.claim());
   console.log("Activating.")
})

self.addEventListener('fetch', event => {

    event.respondWith(

        fetch(event.request).then(resp =>{
            const respClone = resp.clone();

            caches.open(cacheName).then( cache =>{
                console.log("Putting response in cache.")
                cache.put(event.request, respClone).then(c =>{
                    console.log("Successfully put in cache.")
                })
                .catch( err =>{
                    console.log(`Cannot put in cache: ${err}`)
                });
            })
             console.log("Returning response from the server.")

            return resp;

        }).catch( err => {
            console.log(`Server down. ${err}`)
            return caches.match(event.request)
            .then(
                resp => {
                console.log("Return response from the cache.")
                return resp;
            })
        })
    )
})



