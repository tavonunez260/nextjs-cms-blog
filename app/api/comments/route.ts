import { GraphQLClient, gql } from 'graphql-request';
import { NextRequest, NextResponse } from 'next/server';

import { CommentRequest } from '@/types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_EP;

export async function POST(request: NextRequest) {
	const res: CommentRequest = await request.json();

	const graphQLClient = new GraphQLClient(graphqlAPI!, {
		headers: {
			Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
		}
	});
	const query = gql`
		mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
			createComment(
				data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
			) {
				id
			}
		}
	`;

	try {
		const result = await graphQLClient.request(query, res);
		return NextResponse.json(result);
	} catch (err) {
		return NextResponse.json(err);
	}
}
