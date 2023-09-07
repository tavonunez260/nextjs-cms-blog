/** @type {import("next").NextConfig} */

const path = require('path');

const nextConfig = {
	output: 'export',
	assetPrefix:
		process.env.NODE_ENV === 'production' ? 'https://tavonunez260.github.io/nextjs-cms-blog/' : undefined,
	basePath: process.env.NODE_ENV === 'production' ? 'https://tavonunez260.github.io/nextjs-cms-blog/' : '',
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		unoptimized: true,
		domains: ['media.graphassets.com']
	}
};

module.exports = nextConfig;
