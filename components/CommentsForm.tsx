'use client';

import { useEffect, useRef, useState } from 'react';

import { submitComment } from '@/services';

export function CommentsForm({ slug }: { slug: string }) {
	const [error, setError] = useState(false);
	// const [localStorage, setLocalStorage] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const commentEl = useRef<HTMLTextAreaElement | null>(null);
	const nameEl = useRef<HTMLInputElement | null>(null);
	const emailEl = useRef<HTMLInputElement | null>(null);
	const storeDataEl = useRef<HTMLInputElement | null>(null);

	const handleCommentSubmission = () => {
		const { value: comment } = commentEl?.current!;
		const { value: name } = nameEl?.current!;
		const { value: email } = emailEl?.current!;
		const { checked: storeData } = emailEl?.current!;
		if (!comment || !name || !email) {
			setError(true);
			return;
		}

		if (storeData) {
			window.localStorage.setItem('name',  name);
			window.localStorage.setItem('email',  email);
		} else {
			window.localStorage.removeItem('name');
			window.localStorage.removeItem('email');
		}
		submitComment({ name, email, comment, slug }).then(() => {
			setShowSuccessMessage(true);
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		});
	};

	useEffect(() => {
		if (nameEl && nameEl.current) {
			nameEl.current.value = window.localStorage.getItem('name') as string;
		}
		if (emailEl && emailEl.current) {
			emailEl.current.value = window.localStorage.getItem('name') as string;
		}

	}, []);


	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a reply</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentEl}
					className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Comment"
					name="comment"
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					type="text"
					ref={nameEl}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Name"
					name="name"
				/>
				<input
					type="text"
					ref={emailEl}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Email"
					name="email"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div className="flex items-center">
					<input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
					<label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">
						Save my email and name for the next time I comment
					</label>
				</div>
			</div>
			{error && <p className="text-xs text-red-500">All fields are required</p>}
			<div className="mt-8">
				<button
					type="button"
					onClick={handleCommentSubmission}
					className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
				>
					Post Comment
				</button>
				{showSuccessMessage && (
					<span className="text-xl float-right font-semibold mt-3 text-green-500">
						Comment submitted for review
					</span>
				)}
			</div>
		</div>
	);
}
