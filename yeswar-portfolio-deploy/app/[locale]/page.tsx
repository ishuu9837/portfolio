import { setRequestLocale } from 'next-intl/server';
import { IntroOverlay } from '@/components/intro/intro-overlay';
import { Navbar } from '@/components/navigation/navbar';
import { IdentityRail } from '@/components/identity-rail/identity-rail';
import { Hero } from '@/components/hero/hero';
import { About } from '@/components/about/about';
import { ProjectsSection } from '@/components/projects/projects-section';
import { ResearchSection } from '@/components/research/research-section';
import { SkillsSection } from '@/components/skills/skills-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { EducationSection } from '@/components/education/education-section';
import { CertificationsSection } from '@/components/certifications/certifications-section';
import { ContactSection } from '@/components/contact/contact-section';
import { Footer } from '@/components/footer/footer';
import { LocaleTransition } from '@/components/providers/locale-transition';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IntroOverlay />
      <Navbar />
      <IdentityRail />
      <LocaleTransition>
        <main id="main-content" className="relative">
          <Hero />
          <About />
          <ProjectsSection />
          <ResearchSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </LocaleTransition>
    </>
  );
}
