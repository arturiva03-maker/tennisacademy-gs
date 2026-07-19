import { TeamSectionBlock } from '@/components/ui/team-section-block';
import { useLang } from '../i18n/LanguageContext';

export default function Trainer() {
  const { lang } = useLang();
  return (
    <>
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="split-hero-text">
            <h1>{lang === 'de' ? 'Unser Trainerteam' : 'Our Coaching Team'}</h1>
            <p>
              {lang === 'de'
                ? 'Erfahrung und Leidenschaft auf dem Platz – anerkannt von DTB & VDT.'
                : 'Experience and passion on court – recognised by the DTB & VDT.'}
            </p>
          </div>
          <div className="split-hero-card split-hero-card--photo">
            <img
              src="/trainer-team.jpg"
              alt={lang === 'de' ? 'Das Trainerteam der Tennis Academy' : 'The Tennis Academy coaching team'}
            />
          </div>
        </div>
      </section>

      <TeamSectionBlock />
    </>
  );
}
