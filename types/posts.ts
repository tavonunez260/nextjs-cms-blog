export type FeaturedImageType = {
	url: string;
};

export type CategoryType = {
	name: string;
	slug: string;
};

export type  AuthorType = {
	name: string;
	id: string;
	bio: string;
	photo: FeaturedImageType;
};

export type Child = {
	text: string;
	underline: boolean | undefined;
	italic: boolean | undefined;
	bold: boolean | undefined;
}

export enum ChildType {
	IMAGE = 'image',
	PARAGRAPH = 'paragraph',
	HEADING_THREE = 'heading-three',
	HEADING_FOUR = 'heading-four',
	default = ''
}

export type RawChild = {
	type: ChildType,
	children: Child[];
	src: string | undefined;
	title: string | undefined,
	width: number | undefined,
	handle: string | undefined,
	height: number | undefined,
	altText: string | undefined,
	mimeType: string | undefined
}

export type Raw = {
	children: RawChild[];
}

export type ContentType = {
	raw: Raw;
}

export type PostType = {
	author: AuthorType;
	createdAt: Date;
	slug: string;
	title: string;
	excerpt: string;
	featuredImage: FeaturedImageType;
	categories: CategoryType[];
	content: ContentType | undefined;
};

export type NodeType = {
	node: PostType;
};

export type CommentRequest = {
	name: string;
	email: string;
	comment: string;
	slug: string;
};

export type CommentType = {
	createdAt: Date;
	comment: string;
	name: string;
};
