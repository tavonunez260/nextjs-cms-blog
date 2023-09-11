import { PostCard, Categories } from '@/components';
import { getCategories, getCategoryPost } from '@/services';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const posts = await getCategoryPost(params.slug);

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					{posts.length === 0 && (
						<div className="bg-white shadow-lg rounded-lg p-8">
							<h3 className="text-xl font-semibold">No results to display</h3>
						</div>
					)}
					{posts.length > 0 && posts.map((post, index) => (
						<PostCard key={index} post={post.node} />
					))}
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-8">
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const categories = await getCategories();

	return categories.map(category => ({
		slug: category.slug
	}));
}
