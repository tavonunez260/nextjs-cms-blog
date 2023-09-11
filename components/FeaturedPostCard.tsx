import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PostType } from '@/types';

export function FeaturedPostCard(post: PostType) {
	return (
		<div className="relative h-72">
			<div
				className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
				style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
			/>
			<div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
			<div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
				<p className="text-white mb-4 text-shadow font-semibold text-xs">
					{moment(post.createdAt).format('MMM DD, YYYY')}
				</p>
				<p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
					{post.title}
				</p>
				<div className="flex items-center absolute w-[30px] h-[30px] bottom-5 justify-center">
					<Image
						unoptimized
						alt={post.author.name}
						fill
						className="w-full h-full align-middle drop-shadow-lg rounded-full"
						src={post.author.photo.url}
					/>
					<p className="inline align-middle text-white text-shadow ml-2 font-medium">
						{post.author.name}
					</p>
				</div>
			</div>
			<Link href={`/post/${post.slug}`}>
				<span className="cursor-pointer absolute w-full h-full" />
			</Link>
		</div>
	);
}