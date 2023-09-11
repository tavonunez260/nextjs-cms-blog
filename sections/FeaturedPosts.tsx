'use client';

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { customLeftArrow, customRightArrow, FeaturedPostCard } from '@/components';
import { PostType } from '@/types';
import { responsive } from '@/utils';

export function FeaturedPosts ({ featuredPosts }: {featuredPosts: PostType[]}) {

	return (
		<div className="mb-8">
			<Carousel
				infinite
				customLeftArrow={customLeftArrow}
				customRightArrow={customRightArrow}
				responsive={responsive}
				itemClass="px-4"
			>
				{featuredPosts.map((post, index) => (
					<FeaturedPostCard key={index} {...post} />
				))}
			</Carousel>
		</div>
	);
}
