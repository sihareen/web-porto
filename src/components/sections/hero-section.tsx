export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1100px] flex-col justify-center px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="flex w-full flex-col gap-16">
          <div className="flex items-center justify-between">
            <span className="section-number text-base">01</span>
            <div className="h-px flex-1 bg-[var(--border)] mx-6" />
            <span className="text-xs font-mono tracking-wider text-[var(--accent)] uppercase">Electrical Engineer</span>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[var(--primary)] uppercase">
                MUHAMMAD RIZKAN<br />HARIN FAZA
              </h1>
              
              <div className="flex flex-col gap-1 text-[clamp(1.125rem,2vw,1.375rem)] font-semibold leading-[1.3] text-[var(--secondary)]">
                <p>IoT Engineer</p>
                <p>Embedded Systems Specialist</p>
                <p>Telemetry & Communication Systems</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-[var(--border)]" />
            
            <p className="max-w-[680px] text-[1.25rem] leading-[1.5] text-[var(--text-primary)] font-medium">
              Electrical Engineer specializing in IoT architecture, embedded systems, telemetry networks, and intelligent automation.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <a
                href="#projects"
                className="inline-flex items-center bg-[var(--primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[var(--accent)]"
              >
                View Projects
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center border-2 border-[var(--primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--primary)] transition-all duration-200 hover:bg-[var(--primary)] hover:text-white"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
