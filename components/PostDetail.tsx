import moment from 'moment/moment';
import React from 'react';

import { Child, ChildType, PostType, RawChild } from '@/types';

export function PostDetail({ post }: { post: PostType }) {
	const getContentFragment = (
		index: number,
		text: string | React.ReactNode,
		obj: RawChild | Child | undefined,
		type: ChildType | '' = ''
	) => {
		let modifiedText: string | React.ReactNode | React.ReactNode[] = text;

		if (obj) {
			if ((obj as Child).bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if ((obj as Child).italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if ((obj as Child).underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			case ChildType.HEADING_THREE:
				return (
					<h3 key={index} className="text-xl font-semibold mb-4">
						{(modifiedText as React.ReactNode[])?.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case ChildType.PARAGRAPH:
				return (
					<p key={index} className="mb-8">
						{(modifiedText as React.ReactNode[])?.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				);
			case ChildType.HEADING_FOUR:
				return (
					<h4 key={index} className="text-md font-semibold mb-4">
						{(modifiedText as React.ReactNode[])?.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				);
			case ChildType.IMAGE:
				return (
					<div
						className="relative mx-auto"
						style={{ width: (obj as RawChild)?.width, height: (obj as RawChild)?.height }}
					>
						<img
							key={index}
							alt={(obj as RawChild)?.title as string}
							src={(obj as RawChild)?.src as string}
							className="w-full h-full"
						/>
					</div>
				);
			default:
				return modifiedText;
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 ">
			<div className="relative w-full h-80 overflow-hidden shadow-md mb-6">
				<img src={post.featuredImage.url} alt={post.title} className="object-cover rounded-t-lg" />
			</div>
			<div className="px-4 lg:px-0">
				<div className="flex items-center mb-8 w-full">
					<div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
						<div className="relative w-[30px] h-[30px]">
							<img
								src={post.author.photo.url}
								alt={post.author.name}
								className="align-middle rounded-full w-full h-full"
							/>
						</div>
						<p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
					</div>
					<div className="font-medium text-gray-700">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 inline mr-2 text-pink-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
					</div>
				</div>
				<h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
				{post.content?.raw.children.map((typeObj, index) => {
					const children = typeObj.children.map((item, itemIndex) =>
						getContentFragment(itemIndex, item.text, item)
					);
					return getContentFragment(index, children, typeObj, typeObj.type);
				})}
			</div>
		</div>
	);
}
