import { createProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { listProjectCoverFiles } from "@/lib/project-covers";

type NewProjectPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const params = await searchParams;
  const coverFiles = await listProjectCoverFiles();
  const errorMessage =
    params.error === "invalid_cover"
      ? "Nama file cover tidak valid. Pilih dari daftar gambar yang tersedia."
      : params.error === "db_error"
        ? "Gagal menyimpan project ke database. Cek koneksi DATABASE_URL dan coba ulang."
        : params.error
          ? "Invalid input. Check: Title (3-120 chars), Description (min 20 chars), Tech Stack (min 2 chars), External URL (must include https://), Display Order (0-9999)."
          : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Add Project</h1>
        <a
          href="/admin/projects"
          className="border border-[var(--border)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
        >
          Back to List
        </a>
      </div>

      <div className="h-px w-full bg-[var(--border)]" />

      {errorMessage ? (
        <div className="border border-rose-400/30 bg-rose-500/5 p-4 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      <ProjectForm action={createProjectAction} submitLabel="Create Project" coverFiles={coverFiles} />
    </div>
  );
}
