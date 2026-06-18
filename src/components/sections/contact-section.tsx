import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell id="contact" sectionNumber="06" title="Contact">
      <div className="mx-auto max-w-2xl space-y-8">
        <p className="text-center text-lg leading-[1.7] text-[var(--secondary)]">
          Available for IoT and embedded systems engineering projects
        </p>

        <div className="flex justify-center">
          <a
            href={`mailto:${contactContent.email}`}
            className="inline-flex items-center gap-3 bg-[var(--primary)] px-8 py-4 text-base font-bold text-white transition-all duration-240 hover:bg-[var(--accent)]"
          >
            <FiMail className="h-5 w-5" />
            {contactContent.email}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
