type StudentDetailsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
};

export function StudentDetailsDrawer({ isOpen, onClose, studentId }: StudentDetailsDrawerProps) {
  if (!isOpen || !studentId) return null;

  return (
    <aside
      aria-label="Detalhes do aluno"
      className="fixed inset-y-0 right-0 z-40 w-full max-w-[440px] border-l border-[var(--border-primary)] bg-[var(--background-primary)] p-6 shadow-[0_8px_24px_rgb(0_0_0_/_0.12)]"
    >
      <div className="flex items-start justify-between">
        <div className="grid gap-1">
          <h2 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [line-height:var(--typography-body-x-large-semibold-line-height)] text-[var(--content-primary)]">
            Detalhes do aluno
          </h2>
          <p className="text-[var(--content-secondary)]">ID selecionado: {studentId}</p>
        </div>
        <button
          className="rounded-md px-3 py-2 text-[var(--content-secondary)] hover:bg-[var(--background-secondary)]"
          onClick={onClose}
          type="button"
        >
          Fechar
        </button>
      </div>
      <p className="mt-4 text-[var(--content-secondary)]">
        Estrutura pronta para receber todas as informações completas do aluno.
      </p>
    </aside>
  );
}

