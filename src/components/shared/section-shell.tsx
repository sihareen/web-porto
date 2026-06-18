import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  sectionNumber: string;
  children: ReactNode;
};

export function SectionShell({ id, title, sectionNumber, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1320px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
      <div className="mb-16 space-y-6">
        <span className="section-number">[{sectionNumber}]</span>
        <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
        <div className="section-divider" />
      </div>
      {children}
    </section>
  );
}
