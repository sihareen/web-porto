import { ProjectStatus } from "@prisma/client";

type ProjectFormDefaults = {
  title?: string;
  description?: string;
  projectLabels?: string[];
  techStack?: string;
  externalUrl?: string;
  coverImageFileName?: string;
  galleryImageFileNames?: string[];
  existingCoverImagesRaw?: string;
  displayOrder?: number;
  status?: ProjectStatus;
};

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  coverFiles: string[];
  defaults?: ProjectFormDefaults;
};

const PROJECT_LABELS = ["IoT", "AI", "Data"] as const;

export function ProjectForm({ action, submitLabel, coverFiles, defaults }: ProjectFormProps) {
  return (
    <form action={action} className="space-y-6 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Title
          <input
            name="title"
            required
            defaultValue={defaults?.title}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          External URL
          <input
            name="externalUrl"
            type="url"
            required
            defaultValue={defaults?.externalUrl}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>
      </div>

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

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Labels
          <select
            name="projectLabels"
            multiple
            defaultValue={defaults?.projectLabels ?? []}
            className="h-28 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          >
            {PROJECT_LABELS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-[var(--text-secondary)]">Pilih lebih dari satu dengan Ctrl/Cmd + klik</p>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)] sm:col-span-2">
          Tech Stack (comma separated)
          <input
            name="techStack"
            required
            defaultValue={defaults?.techStack}
            placeholder="LoRa, MQTT, Node.js"
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Display Order
          <input
            name="displayOrder"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={defaults?.displayOrder ?? 0}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          />
          <p className="text-xs text-[var(--text-secondary)]">Semakin kecil, semakin atas</p>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
          Status
          <select
            name="status"
            defaultValue={defaults?.status ?? ProjectStatus.DRAFT}
            className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
          >
            <option value={ProjectStatus.DRAFT}>Draft</option>
            <option value={ProjectStatus.PUBLISHED}>Published</option>
          </select>
        </label>
      </div>

      <div className="h-px w-full bg-[var(--border)]" />

      <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
        Cover Image (thumbnail)
        <select
          name="coverImageFileName"
          defaultValue={defaults?.coverImageFileName ?? ""}
          disabled={coverFiles.length === 0}
          className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)] disabled:opacity-50"
        >
          <option value="">Auto from gallery</option>
          {coverFiles.map((fileName) => (
            <option key={`cover-${fileName}`} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
        Gallery Images (popup slider)
        <select
          name="galleryImageFileNames"
          multiple
          defaultValue={defaults?.galleryImageFileNames ?? []}
          disabled={coverFiles.length === 0}
          className="h-44 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)] disabled:opacity-50"
        >
          {coverFiles.map((fileName) => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
        <p className="text-xs text-[var(--text-secondary)]">
          Gunakan Ctrl/Cmd + klik untuk pilih banyak gambar. Cover akan dipakai dari field Cover Image atau gambar
          pertama gallery.
        </p>
        {coverFiles.length === 0 ? (
          <p className="text-xs text-amber-700">
            Belum ada file gambar. Tambahkan file ke `public/project-covers` lalu refresh halaman.
          </p>
        ) : null}
      </label>

      <input type="hidden" name="existingCoverImagesRaw" value={defaults?.existingCoverImagesRaw ?? ""} />

      <button
        type="submit"
        className="w-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--surface)] transition-opacity hover:opacity-90 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}
