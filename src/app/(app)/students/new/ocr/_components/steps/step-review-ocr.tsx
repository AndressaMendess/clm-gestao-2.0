"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ClickableCard } from "@/components/ui/clickable-card";
import { CepInput, CpfInput, DatePicker, Input, PhoneInput, RgInput } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { useOcrFlow } from "../ocr-flow-provider";

type ConfidenceLevel = "Alta" | "Média" | "Baixa";

const confidenceByField: Record<string, ConfidenceLevel> = {
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
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
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
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(state.files[0]?.id ?? null);

  const selectedDocument = useMemo(
    () => state.files.find((file) => file.id === selectedDocumentId) ?? state.files[0] ?? null,
    [selectedDocumentId, state.files],
  );

  const extracted = state.extractedData;
  const fallbackValue = "";

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
            <Input label="Nome completo" value={extracted?.fullName ?? fallbackValue} />
            <ConfidenceHelper level={confidenceByField.fullName} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <DatePicker label="Data de nascimento" value={extracted?.birthDate ?? fallbackValue} />
                <ConfidenceHelper level={confidenceByField.birthDate} />
              </div>
              <div>
                <SelectField
                  label="Sexo"
                  options={SEX_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
                  placeholder="Selecione"
                  value={fallbackValue}
                />
                <ConfidenceHelper level={confidenceByField.sex} />
              </div>
              <div>
                <SelectField
                  label="Estado civil"
                  options={MARITAL_STATUS_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
                  placeholder="Selecione"
                  value={fallbackValue}
                />
                <ConfidenceHelper level={confidenceByField.maritalStatus} />
              </div>
              <div>
                <Input label="Nacionalidade" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.nationality} />
              </div>
            </div>

            <Input label="Email" value={fallbackValue} />
            <ConfidenceHelper level={confidenceByField.email} />

            <PhoneInput label="Telefone" value={fallbackValue} />
            <ConfidenceHelper level={confidenceByField.phone} />
          </div>

          <div className="grid gap-3">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
              Documentos
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <RgInput label="RG" value={extracted?.rg ?? fallbackValue} />
                <ConfidenceHelper level={confidenceByField.rg} />
              </div>
              <div>
                <CpfInput label="CPF" value={extracted?.cpf ?? fallbackValue} />
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
                <Input label="Rua" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.street} />
              </div>
              <div className="md:col-span-3">
                <Input label="Número" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.number} />
              </div>
              <div className="md:col-span-12">
                <Input label="Bairro" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.district} />
              </div>
              <div className="md:col-span-8">
                <Input label="Cidade" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.city} />
              </div>
              <div className="md:col-span-4">
                <SelectField
                  label="UF"
                  options={UF_OPTIONS.map((item) => ({ label: item, value: item }))}
                  placeholder="Selecione"
                  value={fallbackValue}
                />
                <ConfidenceHelper level={confidenceByField.stateCode} />
              </div>
              <div className="md:col-span-12">
                <CepInput label="CEP" value={fallbackValue} />
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
                <Input label="Nome do pai" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.fatherName} />
              </div>
              <div>
                <Input label="Nome da mãe" value={fallbackValue} />
                <ConfidenceHelper level={confidenceByField.motherName} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
