import { createExperienceAction } from "@/app/admin/actions";
import { ExperienceForm } from "@/components/admin/experience-form";

type NewExperiencePageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewExperiencePage({ searchParams }: NewExperiencePageProps) {
  const params = await searchParams;
  const errorMessage =
    params.error === "db_error"
      ? "Failed to save entry to database. Check DATABASE_URL and retry."
      : params.error
        ? "Invalid input. Please review all fields."
        : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Add Experience</h1>
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

      <ExperienceForm action={createExperienceAction} submitLabel="Create Entry" />
    </div>
  );
}
