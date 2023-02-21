/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const nextConfig = (phase) => {
	return {
		reactStrictMode: true,
		poweredByHeader: false,
		compiler: {
			removeConsole: phase === PHASE_PRODUCTION_BUILD,
		},
	};
};

module.exports = nextConfig;