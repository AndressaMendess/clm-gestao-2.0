import { CheckCircle2, XCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useOcrFlow } from "../ocr-flow-provider";

export function StepReviewFinal() {
  const { state } = useOcrFlow();
  const extracted = state.extractedData;
  const reviewData = state.reviewFormData;
  const profilePhoto = state.files.find((file) => file.documentTitle === "Foto 3x4");
  const attachedDocuments = new Set(state.files.map((file) => file.documentTitle));
  const moduleLabel = state.manualModule
    ? state.manualModule.replace("module-", "Módulo ").replace("i", "I").replace("ii", "II").replace("iii", "III")
    : "Módulo não definido";
  const classroomLabel = state.manualClassroom ? state.manualClassroom.replace("-", " ") : "Turma não definida";

  const extractionStatus = [
    { extracted: Boolean(extracted?.fullName), label: "Nome completo" },
    { extracted: Boolean(extracted?.rg), label: "RG" },
    { extracted: Boolean(extracted?.cpf), label: "CPF" },
    { extracted: Boolean(extracted?.birthDate), label: "Data de nascimento" },
    { extracted: Boolean(reviewData.phone), label: "Telefone" },
    { extracted: Boolean(reviewData.email), label: "Email" },
  ];
  const documentStatus = [
    { attached: attachedDocuments.has("Formulário de matrícula"), label: "Formulário de matrícula" },
    { attached: attachedDocuments.has("Documento de Identidade"), label: "Documento de Identidade" },
    { attached: attachedDocuments.has("Comprovante de residência"), label: "Comprovante de residência" },
    { attached: attachedDocuments.has("Foto 3x4"), label: "Foto 3x4" },
  ];

  return (
    <div className="grid gap-6">
      <header className="grid justify-items-center gap-1 text-center">
        <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)]">
          Revisão final
        </h3>
        <p className="text-[var(--content-secondary)]">
          Confirme todas as informações antes de salvar o cadastro.
        </p>
      </header>

      <div className="grid gap-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[auto_1fr_1fr]">
          <Avatar
            alt={`Foto de ${extracted?.fullName || "Aluno"}`}
            className="mx-auto md:mx-0"
            name={extracted?.fullName || "Aluno"}
            size="xl"
            src={profilePhoto?.previewUrl}
            variant={profilePhoto?.previewUrl ? "with-image" : "without-image"}
          />
          <div className="grid gap-3">
            <p className="text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)]">
              {reviewData.fullName || extracted?.fullName || "Não informado"}
            </p>
            <p className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              RG:{" "}
              <span className="text-[var(--content-secondary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)]">
                {reviewData.rg || extracted?.rg || "Não informado"}
              </span>
            </p>
            <p className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              Data de nascimento:{" "}
              <span className="text-[var(--content-secondary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)]">
                {reviewData.birthDate || extracted?.birthDate || "Não informado"}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="violet">{moduleLabel}</Badge>
              <Badge variant="blue">{classroomLabel}</Badge>
            </div>
          </div>

          <div className="grid gap-3 md:pt-12">
            <p className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              Telefone:{" "}
              <span className="text-[var(--content-secondary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)]">
                {reviewData.phone || "Não informado"}
              </span>
            </p>
            <p className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              E-mail:{" "}
              <span className="text-[var(--content-secondary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)]">
                {reviewData.email || "Não informado"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="grid gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
            Dados extraídos
          </h4>

          <ul className="grid gap-2">
            {extractionStatus.map((item) => (
              <li className="flex items-center gap-2" key={item.label}>
                {item.extracted ? (
                  <CheckCircle2 className="h-4 w-4 text-[var(--feedback-success-content)]" />
                ) : (
                  <XCircle className="h-4 w-4 text-[var(--feedback-error-content)]" />
                )}
                <span className="text-[var(--content-primary)]">{item.label}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="grid gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
            Documentos anexados
          </h4>

          <ul className="grid gap-2">
            {documentStatus.map((item) => (
              <li className="flex items-center gap-2" key={item.label}>
                {item.attached ? (
                  <CheckCircle2 className="h-4 w-4 text-[var(--feedback-success-content)]" />
                ) : (
                  <XCircle className="h-4 w-4 text-[var(--feedback-error-content)]" />
                )}
                <span className="text-[var(--content-primary)]">{item.label}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
