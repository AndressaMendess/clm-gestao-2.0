"use client";

import { FileText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ModalContainer } from "@/components/ui/modal-container";
import StudentsPage from "../page";

const cardBaseStyles =
  "relative flex min-h-[280px] w-full flex-col items-center justify-center gap-5 rounded-[24px] border border-[var(--border-primary)] bg-[var(--background-primary)] p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--brand-primary-main)]";

export default function StudentCreateEntryPage() {
  const router = useRouter();

  return (
    <>
      <StudentsPage />

      <ModalContainer
        closeLabel="Fechar seleção de cadastro"
        isOpen
        onClose={() => router.push("/students")}
        subtitle="Escolha como deseja realizar o cadastro."
        title="Adicionar Aluno"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <button className={cardBaseStyles} onClick={() => router.push("/students/new/manual")} type="button">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--background-secondary)] text-[var(--content-secondary)]">
              <FileText className="h-6 w-6" />
            </span>
            <div className="grid gap-3">
              <h3 className="[font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)] [line-height:var(--typography-body-large-semibold-line-height)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
                Cadastro Manual
              </h3>
              <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                Preencha todos os dados do aluno manualmente através de um formulário completo
              </p>
              <span className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                Modo tradicional
              </span>
            </div>
          </button>

          <button
            className={`${cardBaseStyles} border-[var(--brand-primary-main)]`}
            onClick={() => router.push("/students/new/ocr")}
            type="button"
          >
            <span className="absolute right-4 top-4 rounded-full bg-[var(--brand-primary-main)] px-3 py-1 text-[var(--content-inverse)] [font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)]">
              Recomendado
            </span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary-main)] text-[var(--content-inverse)]">
              <Upload className="h-6 w-6" />
            </span>
            <div className="grid gap-3">
              <h3 className="[font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)] [line-height:var(--typography-body-large-semibold-line-height)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
                Escaneamento de Documentos
              </h3>
              <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                Envie fotos dos documentos e deixe o sistema preencher os dados automaticamente
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="orange">Mais rápido</Badge>
                <Badge variant="orange">Menos erros</Badge>
              </div>
            </div>
          </button>
        </div>
      </ModalContainer>
    </>
  );
}
