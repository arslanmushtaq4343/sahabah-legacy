import { useEffect, useMemo, useState } from 'react';
import styles from './PwaPolish.module.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function PwaPolish() {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(() => isStandalone());
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateRegistration, setUpdateRegistration] = useState<ServiceWorkerRegistration | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    const handleUpdate = (event: Event) => {
      const custom = event as CustomEvent<{ registration: ServiceWorkerRegistration }>;
      setUpdateRegistration(custom.detail.registration);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    window.addEventListener('sahabah-sw-update', handleUpdate as EventListener);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          setOfflineReady(Boolean(registration.active || navigator.serviceWorker.controller));
        })
        .catch(() => undefined);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      window.removeEventListener('sahabah-sw-update', handleUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const handleControllerChange = () => {
      if (!refreshing) return;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    return () =>
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
  }, [refreshing]);

  const statusText = useMemo(() => {
    if (!online) return 'Offline mode';
    if (offlineReady) return 'Offline ready';
    return 'Online';
  }, [online, offlineReady]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => undefined);
    setInstallPrompt(null);
  };

  const handleUpdate = () => {
    const worker = updateRegistration?.waiting;
    if (!worker) {
      window.location.reload();
      return;
    }
    setRefreshing(true);
    worker.postMessage({ type: 'SKIP_WAITING' });
  };

  return (
    <div className={styles.wrap} aria-live="polite">
      <div className={`${styles.status} ${online ? styles.statusOnline : styles.statusOffline}`}>
        <span className={styles.dot} />
        <span>{statusText}</span>
      </div>

      {installPrompt && !installed && (
        <button className={styles.installBtn} onClick={handleInstall}>
          Install app
        </button>
      )}

      {updateRegistration && (
        <div className={styles.updateToast}>
          <div>
            <strong>New version available</strong>
            <span>Refresh to load the latest cached encyclopedia.</span>
          </div>
          <button onClick={handleUpdate}>{refreshing ? 'Refreshing...' : 'Update'}</button>
          <button
            className={styles.dismissBtn}
            onClick={() => setUpdateRegistration(null)}
            aria-label="Dismiss update notice"
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
