export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1100px] flex-col justify-center px-6 py-32 sm:px-10 lg:px-12 lg:py-40">
        <div className="flex max-w-[780px] flex-col gap-12">
          <div className="flex items-baseline justify-between">
            <span className="section-number">[01]</span>
            <span className="text-xs tracking-wide text-[var(--text-secondary)]">Portfolio</span>
          </div>
          
          <div className="space-y-10">
            <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
              Muhammad Rizkan Harin Faza
            </h1>
            
            <div className="h-px w-full bg-[var(--border)]" />
            
            <div className="space-y-1">
              <p className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-medium leading-[1.4] text-[var(--text-primary)]">
                Intelligent Systems Engineer
              </p>
            </div>
            
            <div className="grid gap-2 text-lg leading-[2] text-[var(--text-secondary)] sm:grid-cols-2">
              <p>IoT Architecture</p>
              <p>Embedded Development</p>
              <p>Edge AI Integration</p>
              <p>Communication Systems</p>
            </div>
            
            <div className="max-w-[560px] rounded-sm border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-[1.125rem] leading-[1.6] text-[var(--text-primary)]">
                Building intelligent systems that connect hardware, software, communication networks, and AI.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center rounded-sm bg-[var(--text-primary)] px-7 py-3.5 text-sm font-medium text-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(29,29,29,0.2)]"
              >
                View Work ↓
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center rounded-sm border border-[var(--text-primary)] px-7 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--text-primary)] hover:text-[var(--surface)]"
              >
                Download CV →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
