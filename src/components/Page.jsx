import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Page = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body?.map((nestedBlok, i) => (
      <ScrollReveal key={nestedBlok._uid} delay={i === 0 ? 0 : i * 80}>
        <StoryblokServerComponent blok={nestedBlok} />
      </ScrollReveal>
    ))}
  </main>
);

export default Page;
