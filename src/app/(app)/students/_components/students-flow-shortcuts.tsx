import Link from "next/link";

const linkStyles =
  "inline-flex items-center rounded-[10px] border border-[var(--border-primary)] bg-[var(--background-primary)] px-3 py-2 text-[var(--content-primary)] transition-colors hover:bg-[var(--background-secondary)]";

export function StudentsFlowShortcuts() {
  return (
    <section className="flex flex-wrap items-center gap-2">
      <Link className={linkStyles} href="/students/new/manual">
        Novo aluno (manual)
      </Link>
      <Link className={linkStyles} href="/students/new/ocr">
        Novo aluno (OCR)
      </Link>
    </section>
  );
}

