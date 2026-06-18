import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { contactContent } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--text-primary)]">Muhammad Rizkan Harin Faza</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Intelligent Systems Engineer · IoT · Embedded · AI
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${contactContent.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[var(--text-secondary)] transition-colors duration-280 hover:text-[var(--text-primary)]"
            aria-label="Email"
          >
            <FiMail className="h-5 w-5" />
          </a>
          <a
            href={contactContent.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[var(--text-secondary)] transition-colors duration-280 hover:text-[var(--text-primary)]"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
          <a
            href={contactContent.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[var(--text-secondary)] transition-colors duration-280 hover:text-[var(--text-primary)]"
            aria-label="GitHub"
          >
            <FiGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
