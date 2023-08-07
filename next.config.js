/** @type {import("next").NextConfig} */

const path = require('path');

const nextConfig = {
	output: 'export',
	assetPrefix:
    process.env.NODE_ENV === 'production' ? 'https://tavonunez260.github.io/nextjs-metaverse-app' : undefined,
	basePath: process.env.NODE_ENV === 'production' ? 'https://tavonunez260.github.io/nextjs-metaverse-app/' : '',
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	}
};

module.exports = nextConfig;
