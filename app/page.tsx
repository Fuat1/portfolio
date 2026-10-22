import { ContactSection } from '@/components/contact-section';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { Hero } from '@/components/hero';
import { JsonLd } from '@/components/json-ld';
import { ProductCards } from '@/components/product-cards';
import { ProjectList } from '@/components/project-list';
import { SectionHeading } from '@/components/section-heading';
import { SkillsGrid } from '@/components/skills-grid';
import { profilePageJsonLd } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <Hero />

      <section id="work" aria-labelledby="work-title" className="shell py-16 sm:py-20">
        <SectionHeading index="01" id="work-title" title="Selected work" intro="Case studies: the problem, what I built, the stack and the outcome." />
        <ProjectList />
      </section>

      <section id="experience" aria-labelledby="experience-title" className="shell py-16 sm:py-20">
        <SectionHeading index="02" id="experience-title" title="Experience" />
        <ExperienceTimeline />
      </section>

      <section id="skills" aria-labelledby="skills-title" className="shell py-16 sm:py-20">
        <SectionHeading index="03" id="skills-title" title="Skills" />
        <SkillsGrid />
      </section>

      <section id="products" aria-labelledby="products-title" className="shell py-16 sm:py-20">
        <SectionHeading index="04" id="products-title" title="Products in progress" intro="Products of my own, outside client work." />
        <ProductCards />
      </section>

      <section id="contact" aria-labelledby="contact-title" className="shell py-16 sm:py-24">
        <SectionHeading index="05" id="contact-title" title="Contact" />
        <ContactSection />
      </section>
    </>
  );
}
