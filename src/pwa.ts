export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        notifyWaitingWorker(registration);

        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(
                new CustomEvent('sahabah-sw-update', { detail: { registration } })
              );
            }
          });
        });

        window.setInterval(
          () => {
            registration.update().catch(() => undefined);
          },
          60 * 60 * 1000
        );
      })
      .catch(error => {
        console.warn('Service worker registration failed:', error);
      });
  });
}

function notifyWaitingWorker(registration: ServiceWorkerRegistration) {
  if (!registration.waiting) return;
  window.dispatchEvent(new CustomEvent('sahabah-sw-update', { detail: { registration } }));
}
