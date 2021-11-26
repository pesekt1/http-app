import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://ab4b5d41ce82498687cfab8a4df4ee08@o345327.ingest.sentry.io/6082573",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logService = { init, log };
export default logService;
