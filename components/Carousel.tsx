import React from 'react';

export const customLeftArrow = (
	<div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6 text-white"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10 19l-7-7m0 0l7-7m-7 7h18"
			/>
		</svg>
	</div>
);

export const customRightArrow = (
	<div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6 text-white"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M14 5l7 7m0 0l-7 7m7-7H3"
			/>
		</svg>
	</div>
);
