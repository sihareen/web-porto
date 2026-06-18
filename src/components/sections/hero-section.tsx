import Image from "next/image";

import { heroContent } from "@/data/site-content";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--line)]">
      <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:py-16">
        <div className="z-10 flex max-w-[650px] flex-col items-start">
          <h1 className="font-[family-name:var(--font-heading)] text-[4.2rem] font-medium leading-[0.88] text-[var(--text)] sm:text-[5.8rem] lg:text-[6.8rem] xl:text-[7.8rem]">
            {heroContent.headline}
          </h1>
          <p className="mt-8 max-w-[560px] text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            IoT Engineer / Embedded Systems Engineer / Research Engineer
          </p>
          <p className="mt-5 max-w-[560px] text-xl leading-9 text-[var(--muted)]">
            {heroContent.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={heroContent.ctaTarget}
              className="inline-flex items-center border border-[var(--text)] bg-[var(--text)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--surface)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent)]"
            >
              {heroContent.ctaLabel}
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center border border-[var(--line)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Download CV
            </a>
          </div>
        </div>

        <figure className="relative">
          <div className="relative aspect-[4/5] max-h-[640px] overflow-hidden bg-[var(--image-wash)] lg:aspect-[5/6]">
            <Image
              src="/project-covers/buoy-utews.jpg"
              alt="Field-deployed monitoring buoy and instrumentation"
              fill
              priority
              className="object-cover transition duration-700 hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-3 text-xs leading-5 text-[var(--muted)]">
            <span>Field deployment, environmental telemetry system.</span>
            <span className="uppercase tracking-[0.18em] text-[var(--accent)]">Disaster resilience</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
