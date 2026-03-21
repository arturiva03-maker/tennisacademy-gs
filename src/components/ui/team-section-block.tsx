import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { User } from "lucide-react";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { useState } from "react";

const teamMembers = [
  {
    name: "Michael Lingner",
    role: "Leitung der Tennis Academy",
    bio: "A-Trainer · Verbandstrainer des TVBB, DTB Vereinsmanager",
    image: "/michael.jpg",
    imagePosition: "center 10%",
    location: "Berlin",
    skills: ["A-Trainer", "TVBB Lehrteam", "VDT"],
    gradient: "from-white/10 via-white/5 to-transparent",
    bullets: [
      "Verbandstrainer des TVBB, DTB Vereinsmanager",
      "TVBB Lehrteam, VDT Mitglied",
      "Langjähriger Regionalliga-Spieler",
      "Inhaber Tennisshop Grand Slam seit 1998",
      "IHK-Ausbilder, ehem. Lehrbeauftragter FU Berlin",
    ],
    social: {
      email: "info@tennisacademy-gs.de",
    },
  },
  {
    name: "Jana Hladká-Kissal",
    role: "Leitung der Tennis Academy",
    bio: "B-Trainer · Ehemalige Profispielerin aus der Slowakei",
    image: "/jana.jpg",
    imagePosition: "center 0%",
    location: "Berlin",
    skills: ["B-Trainer", "Kids on Court", "Profi"],
    gradient: "from-white/12 via-white/5 to-transparent",
    bullets: [
      "Ehemalige Profispielerin aus der Slowakei",
      "10 Jahre Regionalliga beim TC Grunewald als Nr. 1",
      "Deutsche Mannschaftsmeisterin Damen 40+ (2014)",
      "Verbandsmeisterin 50+ (2021 & 2024)",
      "Trainerin seit 1994 – Schwerpunkt: Kids on Court",
    ],
    social: {
      email: "info@tennisacademy-gs.de",
    },
  },
  {
    name: "Zlatan Palazov",
    role: "Leitung der Tennis Academy",
    bio: "B-Trainer · Ehemaliger Profispieler aus Bulgarien",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop",
    location: "Berlin",
    skills: ["B-Trainer", "Kinder", "Erwachsene"],
    gradient: "from-white/12 via-white/5 to-transparent",
    bullets: [
      "Ehemaliger Profispieler aus Bulgarien",
      "Seit sechs Jahren Tennistrainer in Berlin",
      "Trainiert Kinder, Jugendliche und Erwachsene",
      "Aktiver Spieler der 1. Herrenmannschaft",
    ],
    social: {
      email: "info@tennisacademy-gs.de",
    },
  },
  {
    name: "Artur Ivanenko",
    role: "Leitung der Tennis Academy",
    bio: "B-Trainer · Spielt seit früher Kindheit leidenschaftlich Tennis",
    image: "/artur.jpg",
    imagePosition: "center 30%",
    location: "Berlin",
    skills: ["B-Trainer", "Fitness", "Mini-Tennis"],
    gradient: "from-white/12 via-white/5 to-transparent",
    bullets: [
      "Spielt seit früher Kindheit leidenschaftlich Tennis",
      "Trainiert Kinder, Jugendliche und Erwachsene",
      "Breiten- und Leistungssport, Einzel und Gruppe",
      "Mini-Tennis ab 3 Jahren, Fitness-Tennis",
      "Aktiver Spieler der 1. Herrenmannschaft",
    ],
    social: {
      email: "info@tennisacademy-gs.de",
    },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function TeamMemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = (event.clientX - rect.left) / rect.width - 0.5;
    const yPos = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      className="perspective-1000"
    >
      <Card
        className={`group relative overflow-hidden border-[--border] bg-white
          transition-all duration-500
          ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  background: isHovered
                    ? [
                        "radial-gradient(circle at 20% 50%, rgba(var(--tw-primary), 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(var(--tw-primary), 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(var(--tw-primary), 0.1) 0%, transparent 50%)",
                      ]
                    : undefined,
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "linear" }
          }
        />

        {/* Large photo */}
        <div className="relative h-60 overflow-hidden">
          {member.image ? (
            <motion.img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
              style={
                member.imagePosition
                  ? { objectPosition: member.imagePosition }
                  : undefined
              }
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: isHovered ? 1.05 : 1 }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[--bg]">
              <User className="h-16 w-16 text-[--text-light]" />
            </div>
          )}
          <Badge
            className="absolute top-4 right-4 bg-[--navy] text-white border-0 text-xs"
          >
            {member.skills[0]}
          </Badge>
        </div>

        {/* Info */}
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-[--text-dark]">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-primary">{member.role}</p>

          {/* Bullets */}
          {member.bullets && (
            <ul className="mt-3 space-y-1">
              {member.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[--text-medium]"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[--navy]" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {member.skills.slice(1).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-[--bg] text-xs hover:bg-gray-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--tw-primary)), transparent)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: isHovered ? 1 : 0 }
          }
        />
      </Card>
    </motion.div>
  );
}

export function TeamSectionBlock() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: '#fff' }}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 top-0 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(22,61,94,0.04)' }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 100, 0], y: [0, -50, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, duration: 20, ease: "linear" }
          }
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(22,61,94,0.04)' }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -100, 0], y: [0, 50, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, duration: 25, ease: "linear" }
          }
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
          >
            Unser Trainerteam
          </Badge>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[--text-dark] sm:text-5xl">
            Erfahrung trifft Leidenschaft
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[--text-medium]">
            Unser qualifiziertes Team steht dir mit jahrelanger Erfahrung und
            Leidenschaft für den Tennissport zur Verfügung.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.4 }
          }
          className="mt-16 text-center"
        >
          <Card className="mx-auto max-w-2xl border-[--border] bg-[--bg] p-8">
            <h3 className="mb-2 text-xl font-semibold text-[--text-dark]">
              Interesse an einem Probetraining?
            </h3>
            <p className="mb-6 text-[--text-medium]">
              Kontaktiere uns für ein unverbindliches Probetraining mit einem
              unserer erfahrenen Trainer.
            </p>
            <ButtonWithIcon href="/kontakt">
              Kontakt aufnehmen
            </ButtonWithIcon>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
