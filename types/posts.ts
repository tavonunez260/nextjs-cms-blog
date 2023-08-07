export type FeaturedImage = {
	url: string;
};

export type Category = {
	name: string;
	slug: string;
};

export type Author = {
	name: string;
	id: string;
	bio: string;
	photo: FeaturedImage;
};

export type Post = {
	author: Author;
	createdAt: Date;
	slug: string;
	title: string;
	excerpt: string;
	featuredImage: FeaturedImage;
	categories: Category[];
};

export type Node = {
	node: Post;
};
