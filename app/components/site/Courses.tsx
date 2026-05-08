"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaClock,
  FaMagic,
  FaAward,
  FaBox,
  FaSyncAlt,
  FaFire,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

// ── Static course definitions ──────────────────────────────────────────────
type Course = {
  id: string;
  name: string;
  price: string;
  duration: string;
  tags: string[];
  deposit?: string;
  highlights: string[];
};

const COURSES: Course[] = [
  {
    id: "nails-lashes-3",
    name: "Nails & Cluster Lashes",
    price: "R1 200",
    duration: "3 Days",
    tags: ["Nails", "Cluster Lashes"],
    deposit: "50% deposit required",
    highlights: [
      "Gel & acrylic nail basics",
      "Cluster lash application",
      "Shape, fill & adhesive techniques",
      "Aftercare & client guidance",
    ],
  },
  {
    id: "nails-lashes-5",
    name: "Nails & Cluster Lashes",
    price: "R1 500",
    duration: "5 Days",
    tags: ["Nails", "Cluster Lashes"],
    deposit: "50% deposit required",
    highlights: [
      "Advanced nail art & lash styles",
      "Cluster & individual hybrid methods",
      "Corrections & removal techniques",
      "Salon workflow & client management",
      "Branding & pricing guidance",
    ],
  },
  {
    id: "installation-basic",
    name: "Installation Training",
    price: "R1 500",
    duration: "3 Days (Basic)",
    tags: ["Installation"],
    highlights: [
      "Protective style fundamentals",
      "Braid-down patterns",
      "Track & weft installation",
      "Client scalp care",
    ],
  },
  {
    id: "installation-styles",
    name: "Installation + Styles",
    price: "+R700",
    duration: "Add-on",
    tags: ["Installation", "Styling"],
    highlights: [
      "Curling, flat-iron & blowout styling",
      "Color blending techniques",
      "Wig customisation & finishing",
      "Portfolio shoot tips",
    ],
  },
  {
    id: "makeup-3",
    name: "Makeup Training",
    price: "R1 300",
    duration: "3 Days",
    tags: ["Makeup"],
    highlights: [
      "Skin prep & colour theory",
      "Foundation matching for all skin tones",
      "Day & evening looks",
      "Eye makeup fundamentals",
    ],
  },
  {
    id: "makeup-5",
    name: "Makeup Training",
    price: "R1 700",
    duration: "5 Days",
    tags: ["Makeup"],
    highlights: [
      "Advanced contouring & baking",
      "Bridal & event makeup",
      "Lash application with makeup",
      "Client consultation skills",
      "Hygiene & kit management",
    ],
  },
  {
    id: "lashes-individual",
    name: "Individual Lashes",
    price: "R2 000",
    duration: "5 Days",
    tags: ["Lashes"],
    highlights: [
      "Classic & volume individual lash sets",
      "Isolation techniques",
      "Retention & removal methods",
      "Allergy & patch-test protocols",
      "Business set-up & pricing",
    ],
  },
];

// ── Specials ───────────────────────────────────────────────────────────────
type Special = {
  id: string;
  title: string;
  items: { label: string; price: string }[];
  deadline: Date;
  note: string;
};

const SPECIALS: Special[] = [
  {
    id: "nails-lashes-may",
    title: "Nails & Lashes Special",
    items: [
      { label: "3 Days", price: "R650" },
      { label: "5 Days", price: "R850" },
    ],
    deadline: new Date("2026-05-31T23:59:59"),
    note: "Until 31 May 2026",
  },
  {
    id: "hot-combo-june",
    title: "Hot Special Combo",
    items: [{ label: "Installation, Makeup, Nails & Cluster", price: "R2 000" }],
    deadline: new Date("2026-06-30T23:59:59"),
    note: "Until end of June 2026",
  },
];

// ── Event dates ────────────────────────────────────────────────────────────
type EventDate = {
  id: string;
  date: Date;
  label: string;
  location: string;
};

const EVENT_DATES: EventDate[] = [
  { id: "ev1", date: new Date("2026-06-05"), label: "5 June 2026", location: "Moletjie Motinti" },
  { id: "ev2", date: new Date("2026-06-15"), label: "15 June 2026", location: "Modimolle in Town" },
  {
    id: "ev3",
    date: new Date("2026-06-25"),
    label: "25 June 2026",
    location: "Tzaneen Madumeleng",
  },
];

export function Courses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".courses-grid", start: "top 80%" },
      });
      gsap.from(".courses-header > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".courses-header", start: "top 85%" },
      });
    }, sectionRef);
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);
    return () => {
      window.clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="courses-header">
          <SectionHeader
            eyebrow="Training"
            title="Courses & Pricing"
            subtitle="Pay a 50% deposit to secure your spot (where required). Every course includes hands-on practice and certification on completion. Tap any card to see what's inside."
          />
        </div>

        {/* Regular courses */}
        <div className="courses-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {COURSES.map((c) => (
            <FlipCard key={c.id} course={c} />
          ))}
        </div>

        {/* Hot specials with countdowns */}
        <TrainingSpecials now={now} />

        {/* Upcoming event dates */}
        <TrainingEvents now={now} />
      </div>
    </section>
  );
}

// ── Special offer card with countdown ─────────────────────────────────────
function formatTimeLeft(deadline: Date, now: number) {
  const diff = deadline.getTime() - now;
  if (diff <= 0) return "Expired";

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diff / (1000 * 60 * 60));

  if (totalDays > 0) {
    return `${totalDays} day${totalDays === 1 ? "" : "s"} left`;
  }

  if (totalHours > 0) {
    return `${totalHours} hour${totalHours === 1 ? "" : "s"} left`;
  }

  return "Ends soon";
}

function SpecialCard({ special, now }: { special: Special; now: number }) {
  const timeLeft = formatTimeLeft(special.deadline, now);
  return (
    <article className="rounded-3xl border-2 border-primary/30 bg-gradient-soft p-6 shadow-soft flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <FaFire className="w-5 h-5 text-primary" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold">{special.title}</h3>
      </div>

      <ul className="space-y-2">
        {special.items.map((item) => (
          <li key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-foreground/80">{item.label}</span>
            <span className="font-display text-lg text-primary font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-primary/20 space-y-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {special.note}
        </p>
        <p className="text-sm font-semibold text-primary">{timeLeft}</p>
        <Button
          asChild
          size="sm"
          className="w-full bg-gradient-pink text-white rounded-full shadow-soft hover:shadow-glow"
        >
          <a href="#contact">Book Now</a>
        </Button>
      </div>
    </article>
  );
}

function TrainingSpecials({ now }: { now: number }) {
  const active = SPECIALS.filter((s) => s.deadline.getTime() > now);
  if (active.length === 0) return null;

  return (
    <div className="mt-20">
      <SectionHeader
        eyebrow="Limited Time"
        title="🔥 Hot Specials"
        subtitle="Grab these deals before they expire — prices auto-update as the deadline passes."
      />
      <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto">
        {active.map((s) => (
          <SpecialCard key={s.id} special={s} now={now} />
        ))}
      </div>
    </div>
  );
}

// ── Upcoming event dates ───────────────────────────────────────────────────
function TrainingEvents({ now }: { now: number }) {
  // Show events happening today or in the future (compare date at start of day)
  const upcoming = EVENT_DATES.filter((ev) => {
    const endOfDay = new Date(ev.date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.getTime() >= now;
  });
  if (upcoming.length === 0) return null;

  return (
    <div className="mt-20">
      <SectionHeader
        eyebrow="Come Find Us"
        title="Upcoming Events"
        subtitle="Hot Special · Nails, Lashes & Makeup sessions at these locations."
      />
      <div className="grid sm:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
        {upcoming.map((ev) => (
          <article
            key={ev.id}
            className="rounded-3xl border bg-card p-6 shadow-soft flex flex-col gap-3 text-center"
          >
            <FaCalendarAlt className="w-7 h-7 text-primary mx-auto" aria-hidden="true" />
            <time
              className="font-display text-lg font-semibold"
              dateTime={ev.date.toISOString().slice(0, 10)}
            >
              {ev.label}
            </time>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <FaMapMarkerAlt className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{ev.location}</span>
            </div>
            <Button asChild size="sm" className="mt-auto bg-gradient-pink text-white rounded-full">
              <a href="#contact">Book Spot</a>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── Flip card ──────────────────────────────────────────────────────────────
function FlipCard({ course }: { course: Course }) {
  const [flipped, setFlipped] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotationX: flipped ? 180 : 0,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [flipped]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${course.name} — ${course.duration}, ${course.price}. Press Enter or Space to ${flipped ? "see pricing" : "see what you'll learn"}.`}
      className="course-card relative h-115 perspective-[1500px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-3xl"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div ref={innerRef} className="relative w-full h-full transform-3d">
        {/* FRONT */}
        <article className="absolute inset-0 backface-hidden rounded-3xl bg-card border p-6 shadow-soft hover:shadow-glow transition-shadow flex flex-col">
          <div className="h-28 -mx-6 -mt-6 mb-5 rounded-t-3xl bg-gradient-soft animate-gradient" />
          <h3 className="font-display text-xl font-semibold leading-tight">{course.name}</h3>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {course.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-secondary text-secondary-foreground text-xs"
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-foreground/70">
            <FaClock className="w-4 h-4" aria-hidden="true" />
            <span>{course.duration}</span>
          </div>

          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            <li className="flex items-center gap-2">
              <FaBox className="w-4 h-4 text-primary shrink-0" aria-hidden="true" /> Certification
              on completion
            </li>
            {course.deposit && (
              <li className="flex items-center gap-2">
                <FaAward className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />{" "}
                {course.deposit}
              </li>
            )}
            <li className="flex items-center gap-2">
              <FaMagic className="w-4 h-4 text-primary shrink-0" aria-hidden="true" /> Hands-on
              practice
            </li>
          </ul>

          <div className="flex items-center justify-between mt-auto pt-4 border-t">
            <span className="font-display text-3xl text-primary">{course.price}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <FaSyncAlt className="w-3 h-3" aria-hidden="true" /> Tap for details
            </div>
          </div>
        </article>

        {/* BACK */}
        <article className="absolute inset-0 backface-hidden transform-[rotateX(180deg)] rounded-3xl border p-6 shadow-soft bg-gradient-soft flex flex-col">
          <h3 className="font-display text-xl font-semibold leading-tight">{course.name}</h3>
          <p className="text-sm text-foreground/70 mt-1">{course.duration} · What you&apos;ll learn</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/85 flex-1">
            {course.highlights.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <FaMagic className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/40">
            <span className="font-display text-2xl text-primary">{course.price}</span>
            <Button
              asChild
              size="sm"
              className="bg-gradient-pink text-white rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="#contact"
                aria-label={`Enroll in ${course.name}`}
                onKeyDown={(e) => e.stopPropagation()}
              >
                Enroll
              </a>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}

