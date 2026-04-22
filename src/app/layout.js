import './globals.css';
import { Space_Grotesk, JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google';
import StoryblokProvider from '@/components/StoryblokProvider';
import { getStoryblokApi } from '@/lib/storyblok';
import GlobalNav from '@/components/blocks/GlobalNav';
import FooterBlock from '@/components/blocks/FooterBlock';
import JobAlerts from '@/components/blocks/JobAlerts';
import { SavedJobsProvider } from '@/lib/SavedJobsContext';
import SavedJobsPanel from '@/components/SavedJobsPanel';

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
	description: 'Find where you belong. Build what\'s next. 75 open roles across Engineering, AI, Design, and more.',
	icons: {
		icon: '/favicon.svg',
	},
	openGraph: {
		title: 'Pulse Careers',
		description: 'Find where you belong. Build what\'s next.',
		url: 'https://careers.pulse.com',
		siteName: 'Pulse Careers',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Pulse Careers',
		description: 'Find where you belong. Build what\'s next.',
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
	const jobAlertsBlok = globals?.job_alerts?.[0] ?? {};

	return (
		<StoryblokProvider>
			<html
				lang="en"
				className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}
			>
				<body>
					<SavedJobsProvider>
						<GlobalNav blok={headerBlok} />
						{children}
						<JobAlerts blok={jobAlertsBlok} />
						<FooterBlock blok={footerBlok} />
						<SavedJobsPanel />
					</SavedJobsProvider>
				</body>
			</html>
		</StoryblokProvider>
	);
}
