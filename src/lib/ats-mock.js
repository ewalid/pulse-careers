export const JOBS = [
  {
    id: 'job-001',
    title: 'Principal Research Engineer, Model Reliability',
    location: 'Lisbon, PT',
    job_category: 'AI & Research',
    contract_type: 'Full-time',
    seniority: 'Principal',
    job_description: 'Lead reliability efforts across our flagship foundation models. You will own the end-to-end reliability roadmap, designing systems that catch regressions before they reach production and building the observability stack our research teams depend on.',
    skills: ['PyTorch', 'ML Systems', 'Python', 'Distributed Training'],
    publication_date: '2026-04-17',
  },
  {
    id: 'job-002',
    title: 'Staff ML Engineer, Inference Optimisation',
    location: 'Berlin, DE',
    job_category: 'Engineering',
    contract_type: 'Full-time',
    seniority: 'Staff',
    job_description: 'Own the inference stack for our production models — latency, throughput, cost. You will work across CUDA kernels, serving infrastructure, and quantisation research to push the frontier of what is deployable at scale.',
    skills: ['CUDA', 'C++', 'TensorRT', 'Python', 'Triton'],
    publication_date: '2026-04-15',
  },
  {
    id: 'job-003',
    title: 'Senior Data Scientist, Causal Inference',
    location: 'Remote EU',
    job_category: 'Data Science',
    contract_type: 'Full-time',
    seniority: 'Senior',
    job_description: 'Design and analyse experiments that inform product and business decisions. You will build the causal modelling framework used by every product team and mentor a cohort of analysts learning rigorous experimental design.',
    skills: ['Python', 'R', 'Causal ML', 'SQL', 'Statistics'],
    publication_date: '2026-04-12',
  },
  {
    id: 'job-004',
    title: 'Platform Engineer, Infrastructure',
    location: 'Lisbon, PT',
    job_category: 'Engineering',
    contract_type: 'Full-time',
    seniority: 'Senior',
    job_description: 'Build and maintain the cloud infrastructure powering 2,400 engineers and researchers. You will design for reliability and cost-efficiency at a scale most engineers never touch, and make the platform invisible so the teams above it can move fast.',
    skills: ['Kubernetes', 'Terraform', 'Go', 'AWS', 'Observability'],
    publication_date: '2026-04-10',
  },
  {
    id: 'job-005',
    title: 'Principal Product Designer, Research Tools',
    location: 'Lisbon, PT',
    job_category: 'Design',
    contract_type: 'Full-time',
    seniority: 'Principal',
    job_description: 'Define the design language for internal research tooling used by 400+ scientists. You will partner directly with researchers, uncover workflow pain points that tooling can solve, and craft interfaces that make hard cognitive work feel effortless.',
    skills: ['Figma', 'Prototyping', 'User Research', 'Systems Design'],
    publication_date: '2026-04-08',
  },
  {
    id: 'job-006',
    title: 'Head of People Operations, EMEA',
    location: 'London, UK',
    job_category: 'Operations',
    contract_type: 'Full-time',
    seniority: 'Director',
    job_description: 'Lead the People Ops function across our EMEA region, covering 1,200+ employees in 5 countries. You will set the standard for hiring, onboarding, and retention in a region that is scaling fast, and partner with legal and finance to keep us compliant and competitive.',
    skills: ['HR Operations', 'Employment Law', 'Org Design', 'People Analytics'],
    publication_date: '2026-04-05',
  },
  {
    id: 'job-007',
    title: 'Research Scientist, AI Safety',
    location: 'Remote Global',
    job_category: 'AI & Research',
    contract_type: 'Full-time',
    seniority: 'Senior',
    job_description: 'Conduct original research into alignment, interpretability, and robustness of large language models. You will publish freely, collaborate with the broader safety community, and ensure our models remain trustworthy as they grow more capable.',
    skills: ['ML Research', 'Python', 'Alignment', 'Interpretability'],
    publication_date: '2026-04-03',
  },
  {
    id: 'job-008',
    title: 'Analytics Engineer, Growth Data',
    location: 'NYC, US',
    job_category: 'Data Science',
    contract_type: 'Full-time',
    seniority: 'Mid',
    job_description: 'Build the data models and pipelines that power our growth and product analytics. You will work closely with product managers and marketers, turning raw event data into clean, trustworthy tables that anyone at Pulse can query with confidence.',
    skills: ['dbt', 'SQL', 'Python', 'BigQuery', 'Looker'],
    publication_date: '2026-04-01',
  },
];

export function getJobs({ category, limit } = {}) {
  let jobs = JOBS;
  if (category) jobs = jobs.filter(j => j.job_category === category);
  if (limit) jobs = jobs.slice(0, limit);
  return jobs;
}

export function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  const months = Math.floor(diff / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}
