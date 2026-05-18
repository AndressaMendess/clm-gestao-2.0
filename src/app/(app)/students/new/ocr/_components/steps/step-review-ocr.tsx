"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ClickableCard } from "@/components/ui/clickable-card";
import { CepInput, CpfInput, DatePicker, Input, PhoneInput, RgInput } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { useOcrFlow } from "../ocr-flow-provider";

type ConfidenceLevel = "Alta" | "Média" | "Baixa";

type ReviewFormData = {
  birthDate: string;
  city: string;
  cpf: string;
  district: string;
  email: string;
  fatherName: string;
  fullName: string;
  maritalStatus: string;
  motherName: string;
  nationality: string;
  number: string;
  phone: string;
  rg: string;
  sex: string;
  stateCode: string;
  street: string;
  zipCode: string;
};

const confidenceByField: Record<keyof ReviewFormData, ConfidenceLevel> = {
  birthDate: "Média",
  city: "Baixa",
  cpf: "Alta",
  district: "Média",
  email: "Média",
  fatherName: "Baixa",
  fullName: "Alta",
  maritalStatus: "Baixa",
  motherName: "Baixa",
  nationality: "Média",
  number: "Baixa",
  phone: "Média",
  rg: "Alta",
  sex: "Média",
  stateCode: "Baixa",
  street: "Média",
  zipCode: "Média",
};

const SEX_OPTIONS = [
  { label: "Feminino", value: "feminino" },
  { label: "Masculino", value: "masculino" },
  { label: "Outro", value: "outro" },
] as const;

const MARITAL_STATUS_OPTIONS = [
  { label: "Solteiro(a)", value: "solteiro" },
  { label: "Casado(a)", value: "casado" },
  { label: "Divorciado(a)", value: "divorciado" },
  { label: "Viúvo(a)", value: "viuvo" },
] as const;

const UF_OPTIONS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

function getConfidenceVariant(level: ConfidenceLevel) {
  if (level === "Alta") return "success";
  if (level === "Média") return "warning";
  return "error";
}

function ConfidenceHelper({ level }: { level: ConfidenceLevel }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="text-[var(--content-tertiary)] [font-size:var(--typography-body-small-regular-font-size)]">
        Confiança:
      </span>
      <Badge variant={getConfidenceVariant(level)}>{level}</Badge>
    </div>
  );
}

export function StepReviewOcr() {
  const { state } = useOcrFlow();
  const extracted = state.extractedData;

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(state.files[0]?.id ?? null);
  const [reviewData, setReviewData] = useState<ReviewFormData>({
    birthDate: extracted?.birthDate ?? "",
    city: "",
    cpf: extracted?.cpf ?? "",
    district: "",
    email: "",
    fatherName: "",
    fullName: extracted?.fullName ?? "",
    maritalStatus: "",
    motherName: "",
    nationality: "",
    number: "",
    phone: "",
    rg: extracted?.rg ?? "",
    sex: "",
    stateCode: "",
    street: "",
    zipCode: "",
  });

  const selectedDocument = useMemo(
    () => state.files.find((file) => file.id === selectedDocumentId) ?? state.files[0] ?? null,
    [selectedDocumentId, state.files],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <section className="grid content-start gap-4 lg:col-span-3">
        <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
          Documentos
        </h3>

        <div className="grid gap-2">
          {state.files.length === 0 ? (
            <p className="text-[var(--content-secondary)]">Nenhum documento enviado ainda.</p>
          ) : (
            state.files.map((file) => (
              <ClickableCard
                className="min-h-16 px-3 py-2"
                key={file.id}
                onClick={() => setSelectedDocumentId(file.id)}
                subtitle={file.documentSubtitle}
                title={file.documentTitle}
              />
            ))
          )}
        </div>

        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-3">
          {!selectedDocument ? (
            <p className="text-[var(--content-secondary)]">Selecione um documento para visualizar.</p>
          ) : selectedDocument.previewUrl ? (
            <img
              alt={`Pré-visualização de ${selectedDocument.documentTitle}`}
              className="h-auto max-h-[320px] w-full rounded-xl object-contain"
              src={selectedDocument.previewUrl}
            />
          ) : (
            <div className="grid gap-1">
              <p className="text-[var(--content-primary)]">{selectedDocument.name}</p>
              <p className="text-[var(--content-secondary)]">Pré-visualização indisponível para este tipo de arquivo.</p>
            </div>
          )}
        </div>
      </section>

      <section className="grid content-start gap-4 lg:col-span-9">
        <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
          Revise os dados extraídos
        </h3>

        <div className="grid gap-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <div className="grid gap-3">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
              Dados pessoais
            </h4>
            <Input
              label="Nome completo"
              onChange={(event) => setReviewData((previous) => ({ ...previous, fullName: event.currentTarget.value }))}
              value={reviewData.fullName}
            />
            <ConfidenceHelper level={confidenceByField.fullName} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <DatePicker
                  label="Data de nascimento"
                  onDateChange={({ maskedValue }) => setReviewData((previous) => ({ ...previous, birthDate: maskedValue }))}
                  value={reviewData.birthDate}
                />
                <ConfidenceHelper level={confidenceByField.birthDate} />
              </div>
              <div>
                <SelectField
                  label="Sexo"
                  onValueChange={(value) => setReviewData((previous) => ({ ...previous, sex: value }))}
                  options={SEX_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
                  placeholder="Selecione"
                  value={reviewData.sex}
                />
                <ConfidenceHelper level={confidenceByField.sex} />
              </div>
              <div>
                <SelectField
                  label="Estado civil"
                  onValueChange={(value) => setReviewData((previous) => ({ ...previous, maritalStatus: value }))}
                  options={MARITAL_STATUS_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
                  placeholder="Selecione"
                  value={reviewData.maritalStatus}
                />
                <ConfidenceHelper level={confidenceByField.maritalStatus} />
              </div>
              <div>
                <Input
                  label="Nacionalidade"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, nationality: event.currentTarget.value }))}
                  value={reviewData.nationality}
                />
                <ConfidenceHelper level={confidenceByField.nationality} />
              </div>
            </div>

            <Input
              label="Email"
              onChange={(event) => setReviewData((previous) => ({ ...previous, email: event.currentTarget.value }))}
              value={reviewData.email}
            />
            <ConfidenceHelper level={confidenceByField.email} />

            <PhoneInput
              label="Telefone"
              onValueChange={(_, maskedValue) => setReviewData((previous) => ({ ...previous, phone: maskedValue }))}
              value={reviewData.phone}
            />
            <ConfidenceHelper level={confidenceByField.phone} />
          </div>

          <div className="grid gap-3">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
              Documentos
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <RgInput
                  label="RG"
                  onValueChange={(_, maskedValue) => setReviewData((previous) => ({ ...previous, rg: maskedValue }))}
                  value={reviewData.rg}
                />
                <ConfidenceHelper level={confidenceByField.rg} />
              </div>
              <div>
                <CpfInput
                  label="CPF"
                  onValueChange={(_, maskedValue) => setReviewData((previous) => ({ ...previous, cpf: maskedValue }))}
                  value={reviewData.cpf}
                />
                <ConfidenceHelper level={confidenceByField.cpf} />
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
              Endereço
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="md:col-span-9">
                <Input
                  label="Rua"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, street: event.currentTarget.value }))}
                  value={reviewData.street}
                />
                <ConfidenceHelper level={confidenceByField.street} />
              </div>
              <div className="md:col-span-3">
                <Input
                  label="Número"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, number: event.currentTarget.value }))}
                  value={reviewData.number}
                />
                <ConfidenceHelper level={confidenceByField.number} />
              </div>
              <div className="md:col-span-12">
                <Input
                  label="Bairro"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, district: event.currentTarget.value }))}
                  value={reviewData.district}
                />
                <ConfidenceHelper level={confidenceByField.district} />
              </div>
              <div className="md:col-span-8">
                <Input
                  label="Cidade"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, city: event.currentTarget.value }))}
                  value={reviewData.city}
                />
                <ConfidenceHelper level={confidenceByField.city} />
              </div>
              <div className="md:col-span-4">
                <SelectField
                  label="UF"
                  onValueChange={(value) => setReviewData((previous) => ({ ...previous, stateCode: value }))}
                  options={UF_OPTIONS.map((item) => ({ label: item, value: item }))}
                  placeholder="Selecione"
                  value={reviewData.stateCode}
                />
                <ConfidenceHelper level={confidenceByField.stateCode} />
              </div>
              <div className="md:col-span-12">
                <CepInput
                  label="CEP"
                  onValueChange={(_, maskedValue) => setReviewData((previous) => ({ ...previous, zipCode: maskedValue }))}
                  value={reviewData.zipCode}
                />
                <ConfidenceHelper level={confidenceByField.zipCode} />
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
              Matrícula e família
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  label="Nome do pai"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, fatherName: event.currentTarget.value }))}
                  value={reviewData.fatherName}
                />
                <ConfidenceHelper level={confidenceByField.fatherName} />
              </div>
              <div>
                <Input
                  label="Nome da mãe"
                  onChange={(event) => setReviewData((previous) => ({ ...previous, motherName: event.currentTarget.value }))}
                  value={reviewData.motherName}
                />
                <ConfidenceHelper level={confidenceByField.motherName} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
