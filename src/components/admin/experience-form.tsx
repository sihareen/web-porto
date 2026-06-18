import { ExperienceCategory } from "@prisma/client";

type ExperienceFormDefaults = {
  period?: string;
  title?: string;
  company?: string;
  description?: string;
  tags?: string;
  category?: ExperienceCategory;
  displayOrder?: number;
};

type ExperienceFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaults?: ExperienceFormDefaults;
};

export function ExperienceForm({ action, submitLabel, defaults }: ExperienceFormProps) {
  return (
    <form action={action} className="space-y-6 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Period
          <input
            name="period"
            required
            defaultValue={defaults?.period}
            placeholder="2024 - Present"
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Type
          <select
            name="category"
            defaultValue={defaults?.category ?? ExperienceCategory.EXPERIENCE}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          >
            <option value={ExperienceCategory.EXPERIENCE}>Experience</option>
            <option value={ExperienceCategory.EDUCATION}>Education</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
        Title
        <input
          name="title"
          required
          defaultValue={defaults?.title}
          placeholder="IoT & AI Engineer"
          className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
        Company / Institution
        <input
          name="company"
          defaultValue={defaults?.company}
          placeholder="PT Example / University Name"
          className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
        Description
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={defaults?.description}
          className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Tags (comma separated)
          <input
            name="tags"
            required
            defaultValue={defaults?.tags}
            placeholder="IoT, Embedded, AI"
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Display Order
          <input
            name="displayOrder"
            type="number"
            min={0}
            defaultValue={defaults?.displayOrder ?? 0}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--surface)] transition-opacity hover:opacity-90 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}
