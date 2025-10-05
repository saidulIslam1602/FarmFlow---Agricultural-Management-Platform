/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

// Only enable Sentry in production when properly configured
const isSentryConfigured = process.env.NEXT_PUBLIC_SENTRY_DSN && 
                           process.env.SENTRY_ORG && 
                           process.env.SENTRY_PROJECT;

if (isSentryConfigured) {
  const { withSentryConfig } = require('@sentry/nextjs');
  const sentryWebpackPluginOptions = {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  };
  module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
} else {
  module.exports = nextConfig;
}