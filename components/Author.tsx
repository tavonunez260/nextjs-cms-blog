import { AuthorType } from '@/types';

export function Author(author: AuthorType) {
	return <div>Author {JSON.stringify(author)}</div>;
}
