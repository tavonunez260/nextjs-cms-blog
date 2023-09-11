import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '@/services';

type PostWidgetType = {
	categories?: string[];
	slug?: string;
};

export async function PostWidget({ categories, slug }: PostWidgetType) {
	const relatedPosts =
		categories && slug ? await getSimilarPosts(categories, slug) : await getRecentPosts();

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedPosts.map(relatedPost => (
				<div key={relatedPost.title} className="flex items-center w-full mb-4">
					<div className="relative w-8 h-8">
						<img
							src={relatedPost.featuredImage.url}
							alt={relatedPost.title}
							className="align-middle rounded-full w-full h-full"
						/>
					</div>
					<div className="flex-grow ml-4">
						<p className="text-gray-500 font-xs">
							{moment(relatedPost.createdAt).format('MMM DD, YYYY ')}
						</p>
						<Link href={`/post/${relatedPost.slug}`} className="text-md">
							{relatedPost.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}
