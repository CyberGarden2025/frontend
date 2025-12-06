import * as Sentry from '@sentry/react';

const SENTRY_DSN = 'https://c7ffa6fc63c610c495e4c8e854619473@sentry.k-lab.su/1';

let hasInitialized = false;

export const initSentry = (): void => {
    if (hasInitialized) {
        return;
    }

    Sentry.init({
        dsn: SENTRY_DSN,
        sendDefaultPii: true,
    });

    hasInitialized = true;
};

export const triggerSentryTestError = (): void => {
    const error = new Error('Sentry test error (manual trigger)');
    Sentry.captureException(error);
};

export { Sentry };
