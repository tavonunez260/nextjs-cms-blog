import React from 'react';

import { Header } from '@/components/Header';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<body suppressHydrationWarning={true}>
			<Header />
			{children}
		</body>
	);
}
