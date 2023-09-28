async function updateSW(worker) {
  if (!alert('New version available!  Ready to update?'))
    worker.postMessage({ action: 'SKIP_WAITING' });
}

function trackUpdate(worker) {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      updateSW(worker);
    }
  });
}

export default function manageServiceWorker() {
  if (process.env.DEP_ENV !== 'prod') return;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        if (registration.waiting) {
          updateSW(registration.waiting);
          return;
        }
        if (registration.installing) {
          trackUpdate(registration.installing);
          return;
        }
        registration.addEventListener('updatefound', () => {
          trackUpdate(registration.installing);
        });
      });

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
}
