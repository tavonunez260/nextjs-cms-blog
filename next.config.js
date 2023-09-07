/** @type {import("next").NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
const createNextPluginPreval = require('next-plugin-preval/config');
const path = require('path');
const withNextPluginPreval = createNextPluginPreval();


const nextConfig = {
	assetPrefix: undefined,
	basePath: '',
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	images: {
		domains: ['media.graphassets.com']
	}
};

module.exports = withBundleAnalyzer(withNextPluginPreval(nextConfig));
