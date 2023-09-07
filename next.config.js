/** @type {import("next").NextConfig} */

const path = require('path');

const nextConfig = {
	assetPrefix: undefined,
	basePath: '',
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['media.graphassets.com']
	}
};

module.exports = nextConfig;
