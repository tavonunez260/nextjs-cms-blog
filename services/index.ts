import { request, gql } from 'graphql-request';

import { CategoryType, NodeType, PostType } from '@/types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_EP;
export const getPosts = async (): Promise<NodeType[]> => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							name
							id
							bio
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const results = await request(graphqlAPI as string, query);
	return results.postsConnection.edges;
};

export const getRecentPosts = async (): Promise<PostType[]> => {
	const query = gql`
		query GetPostDetails {
			posts(orderBy: createdAt_ASC, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const results = await request(graphqlAPI as string, query);
	return results.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string): Promise<PostType[]> => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const results = await request(graphqlAPI as string, query, { slug, categories });
	return results.posts;
};

export const getCategories = async (): Promise<CategoryType[]> => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;

	const results = await request(graphqlAPI as string, query);
	return results.categories;
};

export const getPostsDetails = async (slug: string): Promise<PostType> => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					name
					id
					bio
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`;

	const results = await request(graphqlAPI as string, query, {slug});
	return results.post;
};
