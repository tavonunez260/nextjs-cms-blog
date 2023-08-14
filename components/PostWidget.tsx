'use client';

import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getRecentPosts, getSimilarPosts } from '@/services';
import { Post } from '@/types';


type PostWidgetType = {
	categories: string;
	slug?: string;
};

export function PostWidget({ categories, slug }: PostWidgetType) {
	const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

	useEffect(() => {
		if (slug) {
			getSimilarPosts(categories, slug).then(result => setRelatedPosts(result));
		} else {
			getRecentPosts().then(result => setRelatedPosts(result));
		}
	}, [categories, slug]);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedPosts.map(relatedPost => (
				<div key={relatedPost.title} className="flex items-center w-full mb-4">
					<div className="w-16 flex-n one">
						<img
							src={relatedPost.featuredImage.url}
							alt={relatedPost.title}
							className="w-[60px] h-[60px] align-middle rounded-full"
						/>
					</div>
					<div className="flex-grow ml-4">
						<p className="text-gray-500 font-xs">{moment(relatedPost.createdAt).format('MMM DD, YYYY ')}</p>
						<Link href={`/post/${relatedPost.slug}`} className="text-md">{relatedPost.title}</Link>
					</div>
				</div>
			))}
		</div>
	);
}
