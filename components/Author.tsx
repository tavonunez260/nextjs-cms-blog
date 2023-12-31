import { AuthorType } from '@/types';

export function Author({ author }: { author: AuthorType }) {
	return (
		<div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
			<div className="absolute left-1/2 transform -translate-x-1/2 -top-14 w-[100px] h-[100px]">
				<img
					alt={author.name}
					src={author.photo.url}
					className="w-full h-full align-middle rounded-full"
				/>
			</div>
			<h3 className="text-white my-4 text-xl">{author.name}</h3>
			<p className="text-white text-lg">{author.bio}</p>
		</div>
	);
}
