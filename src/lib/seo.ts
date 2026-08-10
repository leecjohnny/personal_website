import type { CollectionEntry } from 'astro:content';

export const SITE_URL = 'https://johnnyclee.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_SOCIAL_IMAGE = '/og-default.png';

export const socialProfiles = [
	'https://x.com/ByJohnnyLee',
	'https://github.com/leecjohnny/',
	'https://linkedin.com/in/johnny-c-lee',
];

export const personSchema = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: 'Johnny Lee',
	url: SITE_URL,
	sameAs: socialProfiles,
};

export const websiteSchema = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: SITE_URL,
	name: 'Johnny Lee',
	description: 'Notes on technology, markets, intelligence, and building.',
	inLanguage: 'en',
	author: { '@id': PERSON_ID },
	publisher: { '@id': PERSON_ID },
};

function plainText(markdown: string) {
	return markdown
		.replace(/<p class="external-notice">[\s\S]*?<\/p>/gi, ' ')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/^\s*\[[^\]]+\]:\s+\S+.*$/gm, ' ')
		.replace(/^\s{0,3}#{1,6}\s+/gm, '')
		.replace(/^\s*[-*+]\s+/gm, '')
		.replace(/^\s*\d+[.)]\s+/gm, '')
		.replace(/[>*_~`|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function excerpt(text: string, maximum = 158) {
	if (text.length <= maximum) return text;

	const shortened = text.slice(0, maximum + 1);
	const sentenceEnd = Math.max(
		shortened.lastIndexOf('. '),
		shortened.lastIndexOf('? '),
		shortened.lastIndexOf('! '),
	);
	if (sentenceEnd >= 80) return shortened.slice(0, sentenceEnd + 1);

	const wordEnd = shortened.lastIndexOf(' ');
	return `${shortened.slice(0, wordEnd > 100 ? wordEnd : maximum).trim()}…`;
}

function publicationName(url: string) {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return 'the original publication';
	}
}

export function descriptionForPost(post: CollectionEntry<'blog'>) {
	if (post.data.description) return post.data.description;

	const body = 'body' in post && typeof post.body === 'string' ? post.body : '';
	const text = plainText(body);
	if (text.length >= 40) return excerpt(text);

	if (post.data.externalUrl) {
		return excerpt(
			`Johnny Lee’s essay “${post.data.title},” originally published on ${publicationName(post.data.externalUrl)}.`,
		);
	}

	return excerpt(`Johnny Lee’s essay “${post.data.title}.”`);
}

interface ArticleSchemaOptions {
	title: string;
	description: string;
	url: string;
	datePublished: string;
	dateModified?: string;
	image?: string;
}

export function articleSchema({
	title,
	description,
	url,
	datePublished,
	dateModified = datePublished,
	image = DEFAULT_SOCIAL_IMAGE,
}: ArticleSchemaOptions) {
	return {
		'@type': 'BlogPosting',
		headline: title,
		description,
		url,
		mainEntityOfPage: url,
		datePublished,
		dateModified,
		inLanguage: 'en',
		image: new URL(image, SITE_URL).toString(),
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
	};
}

export function siteSchemaGraph(
	extra: Record<string, unknown> | Record<string, unknown>[] = [],
) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			websiteSchema,
			personSchema,
			...(Array.isArray(extra) ? extra : [extra]),
		],
	};
}
