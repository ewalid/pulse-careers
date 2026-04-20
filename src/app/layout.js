import './globals.css';
import { Space_Grotesk, JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google';
import StoryblokProvider from '@/components/StoryblokProvider';
import { getStoryblokApi } from '@/lib/storyblok';
import GlobalNav from '@/components/blocks/GlobalNav';
import FooterBlock from '@/components/blocks/FooterBlock';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	weight: ['400', '600'],
	variable: '--font-mono',
});

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-body',
});

export const metadata = {
	title: 'Pulse Careers',
	description: 'Find where you belong. Build what\'s next.',
	icons: {
		icon: '/favicon.svg',
	},
};

async function getGlobals() {
	try {
		const storyblokApi = getStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/config', {
			version: process.env.STORYBLOK_VERSION || 'published',
		});
		return data.story.content;
	} catch {
		return null;
	}
}

export default async function RootLayout({ children }) {
	const globals = await getGlobals();
	const headerBlok = globals?.header?.[0] ?? null;
	const footerBlok = globals?.footer?.[0] ?? null;

	return (
		<StoryblokProvider>
			<html
				lang="en"
				className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}
			>
				<body>
					<GlobalNav blok={headerBlok} />
					{children}
					<FooterBlock blok={footerBlok} />
				</body>
			</html>
		</StoryblokProvider>
	);
}
