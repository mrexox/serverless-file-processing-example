import * as sentry from '@sentry/serverless';

sentry.GCPFunction.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.STAGE,
  sampleRate: parseFloat(process.env.SENTRY_ERROR_SAMPLE_RATE || '1'),
});

export const Sentry = sentry;
