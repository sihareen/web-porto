"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "Capabilities", href: "#skills", id: "skills" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Context", href: "#about", id: "about" },
  { label: "Journey", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <a
          href="#hero"
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-primary)]"
        >
          RHF
        </a>
        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-280 ${
                    item.id === activeSection ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
