import { getJobById } from '@/lib/ats-mock';
import { getStoryblokApi } from '@/lib/storyblok';
import JobDetail from '@/components/blocks/JobDetail';
import JobViewTracker from '@/components/JobViewTracker';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function JobPage({ params }) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();

  let blok = {};
  try {
    const api = getStoryblokApi();
    const { data } = await api.get('cdn/stories/job-detail-template', {
      version: process.env.STORYBLOK_VERSION || 'published',
    });
    blok = data.story.content;
  } catch {}

  return (
    <>
      <JobViewTracker category={job.job_category} />
      <JobDetail job={job} blok={blok} />
    </>
  );
}
