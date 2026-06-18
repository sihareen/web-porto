export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Muhammad Rizkan Harin Faza</p>
        <p className="text-xs text-[var(--muted)]">
          IoT / Embedded Systems / Research Engineering / Environmental Monitoring
        </p>
      </div>
    </footer>
  );
}
