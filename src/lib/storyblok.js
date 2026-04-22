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
import EditorialHero from '@/components/blocks/EditorialHero';
import HeroVideo from '@/components/blocks/HeroVideo';
import ValuesBlock from '@/components/blocks/ValuesBlock';
import EditorialLifestyle from '@/components/blocks/EditorialLifestyle';
import BrandCta from '@/components/blocks/BrandCta';
import PageHero from '@/components/blocks/PageHero';
import TeamsGrid from '@/components/blocks/TeamsGrid';
import TeamDetail from '@/components/blocks/TeamDetail';
import BenefitsGrid from '@/components/blocks/BenefitsGrid';
import InternshipOverview from '@/components/blocks/InternshipOverview';
import StoryTimeline from '@/components/blocks/StoryTimeline';
import TestimonialsSelector from '@/components/blocks/TestimonialsSelector';
import TestimonyDetail from '@/components/blocks/TestimonyDetail';
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
		editorial_hero: EditorialHero,
		hero_video: HeroVideo,
		values_block: ValuesBlock,
		editorial_lifestyle: EditorialLifestyle,
		brand_cta: BrandCta,
		value_item: () => null,
		benefit_item: () => null,
		editorial_image: () => null,
		page_hero: PageHero,
		teams_grid: TeamsGrid,
		team_detail: TeamDetail,
		benefits_grid: BenefitsGrid,
		internship_overview: InternshipOverview,
		story_timeline: StoryTimeline,
		testimonials_selector: TestimonialsSelector,
		testimony_detail: TestimonyDetail,
		team_card_item: () => null,
		work_stream_item: () => null,
		ritual_item: () => null,
		ship_item: () => null,
		voice_item_2: () => null,
		team_job_item: () => null,
		benefit_category: () => null,
		benefit_card_item: () => null,
		intern_highlight: () => null,
		timeline_item: () => null,
		story_chapter: () => null,
		founder_item: () => null,
		selector_testimony_item: () => null,
		testimony_chapter: () => null,
		testimony_chapter_item: () => null,
		open_role_item: () => null,
	},
	apiOptions: {
		region: process.env.STORYBLOK_REGION || 'eu',
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
