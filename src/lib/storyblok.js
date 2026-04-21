import Page from '@/components/Page';
import Feature from '@/components/Feature';
import Grid from '@/components/Grid';
import Teaser from '@/components/Teaser';
import HeroBlock from '@/components/blocks/HeroBlock';
import DisciplineCards from '@/components/blocks/DisciplineCards';
import BrandMarquee from '@/components/blocks/BrandMarquee';
import EmployeeStories from '@/components/blocks/EmployeeStories';
import GlobalNav from '@/components/blocks/GlobalNav';
import FooterBlock from '@/components/blocks/FooterBlock';
import JobAlerts from '@/components/blocks/JobAlerts';
import JobSuggestions from '@/components/blocks/JobSuggestions';
import WhoWeAre from '@/components/blocks/WhoWeAre';
import JobsSearch from '@/components/blocks/JobsSearch';
import JobList from '@/components/blocks/JobList';
import JobDetail from '@/components/blocks/JobDetail';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		hero_block: HeroBlock,
		discipline_cards: DisciplineCards,
		brand_marquee: BrandMarquee,
		employee_stories: EmployeeStories,
		global_nav: GlobalNav,
		footer_block: FooterBlock,
		job_alerts: JobAlerts,
		job_suggestions: JobSuggestions,
		who_we_are: WhoWeAre,
		jobs_search: JobsSearch,
		job_list: JobList,
		job_detail: JobDetail,
		job_faq_item: () => null,
		team_member: () => null,
		global_config: () => null,
	},
	apiOptions: {
		region: process.env.STORYBLOK_REGION || 'eu',
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
