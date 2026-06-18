import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";

export function AboutSection() {
  return (
    <SectionShell id="about" sectionNumber="05" title="About">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
        <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
          <div className="aspect-[3/4]">
            <Image
              src="/profile/me.jpg"
              alt="Muhammad Rizkan Harin Faza"
              width={900}
              height={1200}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6 text-lg leading-[1.8] text-[var(--text-primary)]">
            <p>
              I architect intelligent systems from embedded hardware through cloud integration. My work spans the complete engineering stack: hardware interfacing, firmware development, communication protocols, backend systems, and AI deployment.
            </p>
            <p>
              Projects range from tsunami early warning buoys and emergency VoIP systems to AI-powered quality control and autonomous edge devices. Each implementation emphasizes reliable field operation, maintainable architecture, and measurable outcomes.
            </p>
            <p>
              Electrical Engineering graduate from Universitas Lampung. Thesis focused on Python-based transmission systems for remote ocean monitoring platforms.
            </p>
          </div>

          <div className="border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)] p-6">
            <p className="text-base font-bold text-[var(--primary)]">
              Open to collaboration on intelligent systems projects
            </p>
            <p className="mt-2 text-base leading-[1.7] text-[var(--secondary)]">
              IoT architecture · Embedded development · Edge AI · System integration
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
