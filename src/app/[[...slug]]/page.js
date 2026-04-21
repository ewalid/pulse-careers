import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

// Always fetch fresh — prevents Next.js from caching Storyblok responses
export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
	const { slug } = await params;

	let fullSlug = slug ? slug.join('/') : 'home';

	let sbParams = {
		version: process.env.STORYBLOK_VERSION || 'published',
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

	return <StoryblokStory story={data.story} />;
}
