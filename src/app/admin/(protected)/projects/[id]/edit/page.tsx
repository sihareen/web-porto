import { notFound } from "next/navigation";

import { deleteProjectAction, updateProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { listProjectCoverFiles, parseLocalCoverFileNamesFromStoredImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; upload?: string; message?: string; file?: string }>;
};

export default async function EditProjectPage({ params, searchParams }: EditProjectPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const coverFiles = await listProjectCoverFiles();
  const errorMessage =
    query.error === "invalid_cover"
      ? "Nama file cover tidak valid. Pilih dari daftar gambar yang tersedia."
      : query.error === "db_error"
        ? "Gagal update/delete ke database. Cek koneksi DATABASE_URL lalu coba ulang."
        : query.error
          ? "Invalid input. Please review all fields."
          : null;

  const uploadMessage =
    query.upload === "success"
      ? `File "${query.file}" berhasil diupload.`
      : query.upload === "error"
        ? query.message
          ? decodeURIComponent(query.message)
          : "Upload gagal."
        : null;

  const project = await getPrisma().project.findUnique({ where: { id } });
  if (!project) {
    notFound();
  }

  const currentCoverFileNames = parseLocalCoverFileNamesFromStoredImages(project.coverImage);
  const currentCoverFileName = currentCoverFileNames[0] ?? "";
  const currentGalleryFileNames = currentCoverFileNames.slice(1);
  const currentProjectLabels = project.labels
    ? project.labels
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((label) => (label === "Embedded" ? "IoT" : label))
        .filter((label, index, arr) => arr.indexOf(label) === index)
    : [];

  const boundUpdateAction = updateProjectAction.bind(null, project.id);
  const boundDeleteAction = deleteProjectAction.bind(null, project.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Edit Project</h1>
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

      {uploadMessage ? (
        <div
          className={`border p-4 text-sm ${
            query.upload === "success"
              ? "border-emerald-400/30 bg-emerald-500/5 text-emerald-700"
              : "border-rose-400/30 bg-rose-500/5 text-rose-700"
          }`}
        >
          {uploadMessage}
        </div>
      ) : null}

      <ProjectForm
        action={boundUpdateAction}
        submitLabel="Update Project"
        coverFiles={coverFiles}
        referer={`/admin/projects/${id}/edit`}
        defaults={{
          title: project.title,
          description: project.description,
          projectLabels: currentProjectLabels,
          techStack: project.techStack,
          externalUrl: project.externalUrl,
          coverImageFileName: currentCoverFileName,
          galleryImageFileNames: currentGalleryFileNames,
          existingCoverImagesRaw: project.coverImage ?? "",
          displayOrder: project.displayOrder,
          status: project.status,
        }}
      />

      <form action={boundDeleteAction} className="pt-4">
        <button
          type="submit"
          className="border-2 border-rose-600 bg-rose-600/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-rose-700 transition-colors hover:bg-rose-600 hover:text-white"
        >
          Delete Project
        </button>
      </form>
    </div>
  );
}
