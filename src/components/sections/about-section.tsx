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
              Electrical Engineer specializing in IoT architecture, embedded systems, and telemetry networks. My work spans the complete engineering stack: electronic circuit interfacing, firmware development, communication protocols, instrumentation systems, and edge AI deployment.
            </p>
            <p>
              Projects include tsunami early warning buoy systems, emergency VoIP communication networks, AI-powered quality control systems, and autonomous connected devices. Each implementation emphasizes reliable field operation, robust electronic design, and measurable outcomes.
            </p>
            <p>
              Bachelor of Electrical Engineering from Universitas Lampung. Thesis focused on Python-based telemetry transmission systems for remote ocean monitoring platforms.
            </p>
          </div>

          <div className="border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)] p-6">
            <p className="text-base font-bold text-[var(--primary)]">
              Open to collaboration on IoT and embedded systems projects
            </p>
            <p className="mt-2 text-base leading-[1.7] text-[var(--secondary)]">
              IoT architecture · Embedded development · Telemetry systems · Electronic instrumentation
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
