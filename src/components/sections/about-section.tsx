import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { aboutContent } from "@/data/site-content";

export function AboutSection() {
  return (
    <SectionShell id="about" title="Profile" intro={aboutContent.summary}>
      <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:items-start">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--image-wash)]">
            <Image src="/profile/me.jpg" alt="Muhammad Rizkan Harin Faza" fill className="object-cover" sizes="40vw" />
          </div>
          <figcaption className="mt-4 text-xs leading-5 text-[var(--muted)]">
            Engineer-researcher working across hardware, telemetry, AI systems, and field validation.
          </figcaption>
        </figure>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6 text-[17px] leading-8 text-[var(--muted)]">
            <p>
              My work connects physical sensing infrastructure with dependable software layers: firmware, telemetry,
              dashboards, and applied intelligence. The focus is not novelty for its own sake, but systems that survive
              real environments and help people make better decisions.
            </p>
            <p>
              I am drawn to engineering contexts where technology meets water, weather, land, and public safety:
              tsunami early warning, underwater monitoring, flood observation, climate stations, and edge AI
              classification.
            </p>
          </div>

          <dl className="grid gap-6 border-l border-[var(--line)] pl-6">
            {[
              ["Based in", "Indonesia"],
              ["Focus", "Disaster resilience, environmental systems"],
              ["Methods", "IoT, embedded systems, telemetry, edge AI"],
              ["Output", "Research prototypes to field-deployed platforms"],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">{term}</dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  );
}
