import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell id="contact" sectionNumber="06" title="Contact">
      <div className="mx-auto max-w-2xl space-y-8">
        <p className="text-center text-lg leading-[1.7] text-[var(--text-secondary)]">
          Available for intelligent systems engineering projects
        </p>

        <div className="flex justify-center">
          <a
            href={`mailto:${contactContent.email}`}
            className="inline-flex items-center gap-3 rounded-sm bg-[var(--text-primary)] px-8 py-4 text-base font-medium text-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(29,29,29,0.2)]"
          >
            <FiMail className="h-5 w-5" />
            {contactContent.email}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
