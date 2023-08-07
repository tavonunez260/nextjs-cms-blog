import { request, gql } from 'graphql-request';

import { Node } from '@/types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_EP;
export const getPosts = async (): Promise<Node[]> => {
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
