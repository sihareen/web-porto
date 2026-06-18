import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      title="Contact"
      intro="For research collaborations, monitoring systems, and resilient infrastructure projects."
    >
      <div className="grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-[1fr_1fr]">
        <p className="max-w-xl text-lg leading-9 text-[var(--muted)]">
          Open to work involving environmental sensing, disaster early warning systems, embedded platforms, telemetry,
          edge AI, and research-driven deployment.
        </p>
        <div className="flex flex-wrap items-center gap-5 lg:justify-end">
        <a
          href={`mailto:${contactContent.email}`}
          className="inline-flex h-13 w-13 items-center justify-center border border-[var(--line)] text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Email"
        >
          <FiMail className="h-5 w-5" aria-hidden />
        </a>

        <a
          href={contactContent.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-13 w-13 items-center justify-center border border-[var(--line)] text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="LinkedIn"
        >
          <FiLinkedin className="h-5 w-5" aria-hidden />
        </a>

        <a
          href={contactContent.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-13 w-13 items-center justify-center border border-[var(--line)] text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="GitHub"
        >
          <FiGithub className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={`mailto:${contactContent.email}`}
          className="editorial-link text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]"
        >
          {contactContent.email}
        </a>
        </div>
      </div>
    </SectionShell>
  );
}
