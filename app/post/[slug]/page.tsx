import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '@/components';
import { getPosts, getPostsDetails } from '@/services';

export default async function Slug({ params }: { params: { slug: string } }) {
	const post = await getPostsDetails(params.slug);

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					<PostDetail {...post} />
					<Author {...post.author} />
					<CommentsForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-8">
						<PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const posts = await getPosts();

	return posts.map((post) => ({
		slug: post.node.slug
	}));
}
