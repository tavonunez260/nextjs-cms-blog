import { request, gql } from 'graphql-request';

import { CategoryType, CommentRequest, CommentType, NodeType, PostType } from '@/types';

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

	const results = await request<{ postsConnection: { edges: NodeType[] } }>(
		graphqlAPI as string,
		query
	);
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

	const results = await request<{ posts: PostType[] }>(graphqlAPI as string, query);
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

	const results = await request<{ posts: PostType[] }>(graphqlAPI as string, query, {
		slug,
		categories
	});
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

	const results = await request<{ categories: CategoryType[] }>(graphqlAPI as string, query);
	return results.categories;
};

export const getComments = async (slug: string) => {
	const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

	const results = await request<{ comments: CommentType[] }>(graphqlAPI as string, query, { slug });

	return results.comments;
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

	const results = await request<{ post: PostType }>(graphqlAPI as string, query, { slug });
	return results.post;
};

export const submitComment = async (obj: CommentRequest) => {
	const result = await fetch('/api/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	});

	return result.json();
};

export const getFeaturedPosts = async () => {
	const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

	const result = await request<{ posts: PostType[] }>(graphqlAPI as string, query);
	return result.posts;
};

export const getCategoryPost = async (slug: string) => {
	const query = gql`
		query GetCategoryPost($slug: String!) {
			postsConnection(where: { categories_some: { slug: $slug } }) {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
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

	const result = await request<{ postsConnection: { edges: NodeType[] }}>(graphqlAPI as string, query, { slug });

	return result.postsConnection.edges;
};

