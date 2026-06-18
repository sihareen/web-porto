import { notFound } from "next/navigation";

import { deleteExperienceAction, updateExperienceAction } from "@/app/admin/actions";
import { ExperienceForm } from "@/components/admin/experience-form";
import { getPrisma } from "@/lib/prisma";

type EditExperiencePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditExperiencePage({ params, searchParams }: EditExperiencePageProps) {
  const { id } = await params;
  const query = await searchParams;
  const errorMessage =
    query.error === "db_error"
      ? "Failed to update/delete entry in database. Check DATABASE_URL and retry."
      : query.error
        ? "Invalid input. Please review all fields."
        : null;

  const entry = await getPrisma().experienceEntry.findUnique({ where: { id } });
  if (!entry) {
    notFound();
  }

  const boundUpdateAction = updateExperienceAction.bind(null, entry.id);
  const boundDeleteAction = deleteExperienceAction.bind(null, entry.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Edit Experience</h1>
        <a
          href="/admin/experiences"
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

      <ExperienceForm
        action={boundUpdateAction}
        submitLabel="Update Entry"
        defaults={{
          period: entry.period,
          title: entry.title,
          company: entry.company ?? "",
          description: entry.description,
          tags: entry.tags,
          category: entry.category,
          displayOrder: entry.displayOrder,
        }}
      />

      <form action={boundDeleteAction} className="pt-4">
        <button
          type="submit"
          className="border-2 border-rose-600 bg-rose-600/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-rose-700 transition-colors hover:bg-rose-600 hover:text-white"
        >
          Delete Entry
        </button>
      </form>
    </div>
  );
}
