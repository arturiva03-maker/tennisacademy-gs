import { TeamSectionBlock } from '@/components/ui/team-section-block';

export default function Trainer() {
  return (
    <>
      <section className="page-hero page-hero--trainer" style={{ backgroundImage: "url('/trainer-team.jpg')", backgroundPosition: 'center 30%' }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Unser Trainerteam</h1>
        </div>
      </section>

      <TeamSectionBlock />
    </>
  );
}
