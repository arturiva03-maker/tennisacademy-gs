import { TeamSectionBlock } from '@/components/ui/team-section-block';

export default function Trainer() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Unser Trainerteam</h1>
        </div>
      </section>

      <TeamSectionBlock />
    </>
  );
}
