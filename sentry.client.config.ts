import { initSentry } from '@akinon/next/sentry';

async function initializeSentry() {
  const response = await fetch('/api/sentry', { next: { revalidate: 0 } });
  const data = await response.json();

  const options = {
    dsn: data.dsn,
    integrations: [],
    tracesSampleRate: 1.0
  };

  initSentry('Client', options);
}

initializeSentry();
