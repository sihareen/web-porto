import { uploadCoverImageAction } from "@/app/admin/actions";

type CoverUploadProps = {
  referer: string;
};

export function CoverUpload({ referer }: CoverUploadProps) {
  return (
    <form
      action={uploadCoverImageAction}
      className="space-y-3 rounded border border-dashed border-[var(--border)] bg-[var(--background)] p-4"
    >
      <input type="hidden" name="_referer" value={referer} />

      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        Upload New Cover Image
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          name="file"
          accept=".png,.jpg,.jpeg,.webp,.gif"
          required
          className="block w-full max-w-xs text-sm text-[var(--text-primary)] file:mr-3 file:cursor-pointer file:border file:border-[var(--border)] file:bg-[var(--surface)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--text-primary)] file:hover:border-[var(--text-primary)]"
        />
        <button
          type="submit"
          className="border border-[var(--border)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
        >
          Upload
        </button>
      </div>

      <p className="text-xs text-[var(--text-secondary)]">
        Max 10 MB. Format: png, jpg, jpeg, webp, gif.
      </p>
    </form>
  );
}
