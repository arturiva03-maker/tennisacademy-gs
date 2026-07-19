import { TeamSectionBlock } from '@/components/ui/team-section-block';
import { useLang } from '../i18n/LanguageContext';

export default function Trainer() {
  const { lang } = useLang();
  return (
    <>
      <section
        className="page-hero page-hero--duotone page-hero--trainer"
        style={{ backgroundImage: "url('/trainer-team.jpg')", backgroundPosition: 'center 42%' }}
      >
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{lang === 'de' ? 'Unser Trainerteam' : 'Our Coaching Team'}</h1>
          <p>
            {lang === 'de'
              ? 'Erfahrung und Leidenschaft auf dem Platz – anerkannt von DTB & VDT.'
              : 'Experience and passion on court – recognised by the DTB & VDT.'}
          </p>
        </div>
      </section>

      <TeamSectionBlock />
    </>
  );
}
