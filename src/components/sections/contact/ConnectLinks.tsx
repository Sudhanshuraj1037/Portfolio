import { Download } from "lucide-react";
import { PROFILE_LINKS, CV_FILES } from "@/lib/profile";

// Flip to true once real files exist at the paths in CV_FILES (under public/).
const CV_READY = false;

type ConnectItem = {
  label: string;
  href: string;
  external: boolean;
};

const CONNECT_ITEMS: ConnectItem[] = [
  { label: "LinkedIn", href: PROFILE_LINKS.linkedin, external: true },
  { label: "GitHub", href: PROFILE_LINKS.github, external: true },
  { label: "GeeksforGeeks", href: PROFILE_LINKS.geeksforgeeks, external: true },
  { label: "Kaggle", href: PROFILE_LINKS.kaggle, external: true },
  { label: "LeetCode", href: PROFILE_LINKS.leetcode, external: true },
  { label: "Instagram", href: PROFILE_LINKS.instagram, external: true },
  {
    label: "Email",
    href: PROFILE_LINKS.email ? `mailto:${PROFILE_LINKS.email}` : "",
    external: false,
  },
];

function ConnectRow({ item }: { item: ConnectItem }) {
  const isConfigured = Boolean(item.href);

  if (!isConfigured) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={`Add your ${item.label} URL to go live`}
        className="flex w-full cursor-not-allowed items-center justify-between py-3 text-left text-sm text-[color:var(--color-text-tertiary)] opacity-60"
      >
        {item.label}
        <span aria-hidden="true" className="font-mono">
          →
        </span>
      </button>
    );
  }

  return (
    <a
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center justify-between py-3 text-sm text-[color:var(--color-text-primary)] transition-colors hover:text-[color:var(--color-signal-text)]"
    >
      {item.label}
      <span aria-hidden="true" className="font-mono text-[color:var(--color-text-tertiary)]">
        →
      </span>
    </a>
  );
}

function CvButton({
  format,
  href,
  filename,
}: {
  format: string;
  href: string;
  filename: string;
}) {
  if (!CV_READY) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="CV coming soon"
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-[var(--radius-sm)] border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-tertiary)] opacity-60"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {format}
      </button>
    );
  }

  return (
    <a
      href={href}
      download={filename}
      className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {format}
    </a>
  );
}

export function ConnectLinks() {
  return (
    <div className="mt-14">
      <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
        CONNECT
      </p>
      <div className="mt-4 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
        {CONNECT_ITEMS.map((item) => (
          <ConnectRow key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
          CV / RESUME
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          A concise version of my engineering background.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CvButton format="PDF" href={CV_FILES.pdf} filename="Sudhanshu_Raj_CV.pdf" />
          <CvButton format="Word" href={CV_FILES.docx} filename="Sudhanshu_Raj_CV.docx" />
        </div>
      </div>
    </div>
  );
}
