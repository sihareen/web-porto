import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SectionShell({ id, title, intro, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mb-12 grid gap-6 border-t border-[var(--line)] pt-7 lg:grid-cols-[0.35fr_1fr]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">{title}</p>
        {intro ? (
          <p className="max-w-4xl font-[family-name:var(--font-heading)] text-3xl leading-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
            {intro}
          </p>
        ) : (
          <h2 className="font-[family-name:var(--font-heading)] text-4xl leading-tight text-[var(--text)] sm:text-5xl">
            {title}
          </h2>
        )}
      </div>
      {children}
    </section>
  );
}
