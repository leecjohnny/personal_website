export function articleSlug(sourceUrl: string) {
	const pathname = new URL(sourceUrl).pathname;
	return pathname.split('/').filter(Boolean).at(-1) ?? '';
}

export function articlePath(sourceUrl: string) {
	return '/i/' + articleSlug(sourceUrl) + '/';
}
