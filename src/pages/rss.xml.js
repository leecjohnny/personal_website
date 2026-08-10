import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { articlePath } from '../lib/article-path';
import { descriptionForPost } from '../lib/seo';

export async function GET(context) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: descriptionForPost(post),
			pubDate: post.data.pubDate,
			link: articlePath(post.data.sourceUrl),
		})),
		customData: '<language>en-us</language>',
	});
}
