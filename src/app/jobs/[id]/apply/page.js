import { getJobById } from '@/lib/ats-mock';
import { notFound } from 'next/navigation';
import ApplyForm from '@/components/ApplyForm';

export const dynamic = 'force-dynamic';

export default async function ApplyPage({ params }) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();
  return <ApplyForm job={job} />;
}
