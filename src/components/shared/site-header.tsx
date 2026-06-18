"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Work", shortLabel: "Work", href: "#projects", id: "projects" },
  { label: "Field Notes", shortLabel: "Field", href: "#field-notes", id: "field-notes" },
  { label: "Experience", shortLabel: "Story", href: "#experience", id: "experience" },
  { label: "Contact", shortLabel: "Contact", href: "#contact", id: "contact" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) {
          return;
        }

        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)]/70 bg-[var(--bg)]/88 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="min-w-24 font-[family-name:var(--font-heading)] text-xl font-semibold leading-none text-[var(--text)] sm:min-w-0"
        >
          <span className="sm:hidden">MRHF</span>
          <span className="hidden sm:inline">Muhammad Rizkan Harin Faza</span>
        </a>
        <nav aria-label="Primary" className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.18em] transition ${
                    item.id === activeSection ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
