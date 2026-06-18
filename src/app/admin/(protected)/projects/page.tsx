import type { Project } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  let projects: Project[] = [];
  let hasDbError = false;

  try {
    projects = await getPrisma().project.findMany({
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to load admin projects list.", error);
    hasDbError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Manage Projects</h1>
        <a
          href="/admin/projects/new"
          className="inline-flex items-center justify-center bg-[var(--text-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--surface)] transition-opacity hover:opacity-90"
        >
          Add Project
        </a>
      </div>

      <div className="h-px w-full bg-[var(--border)]" />

      <div className="space-y-3">
        {hasDbError ? (
          <div className="border border-rose-400/30 bg-rose-500/5 p-4 text-sm text-rose-700">
            Gagal memuat data project dari database. Periksa konfigurasi `DATABASE_URL`.
          </div>
        ) : null}
        {projects.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No projects yet. Create your first one.</p>
          </div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col gap-4 border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text-primary)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">{project.title}</h2>
                  <span className="inline-block border border-[var(--border)] px-2 py-1 text-xs font-mono uppercase text-[var(--text-secondary)]">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm font-mono text-[var(--text-secondary)]">/{project.slug}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                  Order: {project.displayOrder}
                </p>
              </div>
              <a
                href={`/admin/projects/${project.id}/edit`}
                className="inline-flex items-center justify-center border-2 border-[var(--text-primary)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--surface)] sm:self-start"
              >
                Edit
              </a>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
