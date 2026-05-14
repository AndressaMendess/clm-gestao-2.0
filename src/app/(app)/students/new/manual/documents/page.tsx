"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { CepInput, CpfInput, Input, RgInput } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { useManualFlowForm } from "../_components/manual-flow-provider";
import { ManualFlowShell } from "../_components/manual-flow-shell";

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

export default function StudentCreateManualDocumentsPage() {
  const router = useRouter();
  const { formData, updateFormData } = useManualFlowForm();
  const { rg, cpf, street, number, district, city, stateCode, zipCode } = formData;

  const isNextDisabled = !rg.trim();
  const ufSelectOptions = useMemo(() => UF_OPTIONS.map((uf) => ({ label: uf, value: uf })), []);
  const requiredLabelStyles =
    "[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-primary)]";

  return (
    <ManualFlowShell
      currentStep={2}
      nextDisabled={isNextDisabled}
      onNext={() => router.push("/students/new/manual/enrollment")}
      onPrevious={() => router.push("/students/new/manual/personal-data")}
    >
      <div className="grid gap-6">
        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Documentos
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="manual-rg">
                RG <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <RgInput
                id="manual-rg"
                onValueChange={(_, maskedValue) => updateFormData({ rg: maskedValue })}
                placeholder="00.000.000-0"
                required
                showLabel={false}
                value={rg}
              />
            </div>

            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="manual-cpf">
                CPF
              </label>
              <CpfInput
                id="manual-cpf"
                onValueChange={(_, maskedValue) => updateFormData({ cpf: maskedValue })}
                placeholder="000.000.000-00"
                showLabel={false}
                value={cpf}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Endereço
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <Input
              label="Rua"
              onChange={(event) => updateFormData({ street: event.currentTarget.value })}
              placeholder="Nome da rua"
              wrapperClassName="md:col-span-10"
              value={street}
            />

            <Input
              label="Número"
              onChange={(event) => updateFormData({ number: event.currentTarget.value })}
              placeholder="N°"
              wrapperClassName="md:col-span-2"
              value={number}
            />

            <Input
              label="Bairro"
              onChange={(event) => updateFormData({ district: event.currentTarget.value })}
              placeholder="Nome do bairro"
              wrapperClassName="md:col-span-12"
              value={district}
            />

            <Input
              label="Cidade"
              onChange={(event) => updateFormData({ city: event.currentTarget.value })}
              placeholder="Nome da cidade"
              wrapperClassName="md:col-span-9"
              value={city}
            />

            <SelectField
              label="UF"
              onValueChange={(value) => updateFormData({ stateCode: value })}
              options={ufSelectOptions}
              placeholder="Selecione"
              wrapperClassName="md:col-span-3"
              value={stateCode}
            />

            <CepInput
              label="CEP"
              onValueChange={(_, maskedValue) => updateFormData({ zipCode: maskedValue })}
              placeholder="00000-000"
              wrapperClassName="md:col-span-12"
              value={zipCode}
            />
          </div>
        </section>
      </div>
    </ManualFlowShell>
  );
}
