import Head from 'next/head';
import React from 'react';

import { Categories, PostCard, PostWidget } from '@/components';
import { FeaturedPosts } from '@/sections';
import { getFeaturedPosts, getPosts } from '@/services';

export default async function Home() {
	const posts = (await getPosts()) || [];
	const featuredPosts = (await getFeaturedPosts()) || [];

	return (
		<main className="container mx-auto px-10 mb-8">
			<Head>
				<title>CMS Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<FeaturedPosts featuredPosts={featuredPosts} />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
				<div className="lg:col-span-8 col-span-1">
					{posts.map(post => (
						<PostCard post={post.node} key={post.node.title} />
					))}
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</main>
	);
}
