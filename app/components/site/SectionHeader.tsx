import { WordSplit } from "./WordSplit";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="font-script text-2xl text-primary">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mt-2">
        <WordSplit text={title} />
      </h2>
      {subtitle && <p className="text-muted-foreground mt-4">{subtitle}</p>}
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
