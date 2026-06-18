"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "Featured Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Expertise", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--primary)]"
        >
          Rizkan-Harin
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors duration-240 ${
                    item.id === activeSection
                      ? "font-bold text-[var(--primary)] border-b-2 border-[var(--accent)] pb-1"
                      : "text-[var(--secondary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition-colors hover:border-[var(--primary)] md:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden"
        >
          <ul className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block py-3 px-4 text-sm font-medium transition-colors duration-240 ${
                    item.id === activeSection
                      ? "font-bold text-[var(--primary)] bg-[var(--accent)]/10 border-l-3 border-l-[var(--accent)]"
                      : "text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
