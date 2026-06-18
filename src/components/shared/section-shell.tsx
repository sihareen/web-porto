import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  sectionNumber: string;
  children: ReactNode;
};

export function SectionShell({ id, title, sectionNumber, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mb-20 space-y-8">
        <div className="flex items-center gap-6">
          <span className="section-number text-base font-bold">{sectionNumber}</span>
          <h2 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-tight uppercase text-[var(--primary)] leading-[0.95]">
            {title}
          </h2>
        </div>
        <div className="section-divider" />
      </div>
      {children}
    </section>
  );
}
