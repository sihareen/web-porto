"use client";

type ExperienceCardItem = {
  period: string;
  title: string;
  company: string | null;
  description: string;
  tags: string[];
  category: string;
};

type ExperienceGalleryProps = {
  items: ExperienceCardItem[];
};

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  return (
    <div className="relative">
      <div className="absolute left-[7.5rem] top-0 hidden h-full w-px bg-[var(--line)] md:block" />
      <div className="space-y-12">
        {items.map((item) => (
          <article key={`${item.period}-${item.title}`} className="grid gap-5 md:grid-cols-[8rem_1fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">{item.period}</p>
            </div>
            <div className="relative border-t border-[var(--line)] pt-6 md:pl-10">
              <span className="absolute -left-[0.34rem] top-5 hidden h-3 w-3 rounded-full border border-[var(--accent)] bg-[var(--bg)] md:block" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-2)]">{item.category}</p>
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl leading-tight text-[var(--text)] sm:text-4xl">
                {item.title}
              </h3>
              {item.company ? <p className="mt-2 text-sm text-[var(--muted)]">{item.company}</p> : null}
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">{item.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {item.tags.map((tag) => (
                  <li key={`${item.title}-${tag}`} className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
