"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { DatePicker, Input, PhoneInput } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { useEditFlowForm } from "../_components/edit-flow-provider";
import { EditFlowShell } from "../_components/edit-flow-shell";

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

export default function StudentEditPersonalDataPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const { formData, updateFormData } = useEditFlowForm();
  const { fullName, birthDate, sex, maritalStatus, nationality, email, schoolEmail, phone } = formData;

  const phoneDigits = phone.replace(/\D/g, "");
  const isNextDisabled = !fullName.trim() || !birthDate.trim() || !email.trim() || phoneDigits.length < 10;
  const requiredLabelStyles =
    "[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-primary)]";

  return (
    <EditFlowShell
      currentStep={1}
      nextDisabled={isNextDisabled}
      onNext={() => router.push(`/students/${encodeURIComponent(decodedStudentId)}/edit/documents`)}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className={requiredLabelStyles} htmlFor="edit-full-name">
            Nome completo <span className="text-[var(--feedback-error-content)]">*</span>
          </label>
          <Input
            id="edit-full-name"
            onChange={(event) => updateFormData({ fullName: event.currentTarget.value })}
            placeholder="Digite o nome completo"
            required
            showLabel={false}
            value={fullName}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className={requiredLabelStyles} htmlFor="edit-birth-date">
              Data de nascimento <span className="text-[var(--feedback-error-content)]">*</span>
            </label>
            <DatePicker
              id="edit-birth-date"
              onDateChange={({ maskedValue }) => updateFormData({ birthDate: maskedValue })}
              required
              showLabel={false}
              value={birthDate}
            />
          </div>

          <SelectField
            label="Sexo"
            onValueChange={(value) => updateFormData({ sex: value })}
            options={SEX_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
            placeholder="Selecione"
            value={sex}
          />

          <SelectField
            label="Estado civil"
            onValueChange={(value) => updateFormData({ maritalStatus: value })}
            options={MARITAL_STATUS_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
            placeholder="Selecione"
            value={maritalStatus}
          />

          <Input
            label="Nacionalidade"
            onChange={(event) => updateFormData({ nationality: event.currentTarget.value })}
            placeholder="Digite a nacionalidade"
            value={nationality}
          />
        </div>

        <div className="grid gap-2">
          <label className={requiredLabelStyles} htmlFor="edit-email">
            Email <span className="text-[var(--feedback-error-content)]">*</span>
          </label>
          <Input
            id="edit-email"
            onChange={(event) => updateFormData({ email: event.currentTarget.value })}
            placeholder="nome@email.com"
            required
            showLabel={false}
            type="email"
            value={email}
          />
        </div>

        <Input
          helperText="Caso não tenha, deixe em branco."
          label="Email escolar"
          onChange={(event) => updateFormData({ schoolEmail: event.currentTarget.value })}
          placeholder="nome@escolaclm.com"
          type="email"
          value={schoolEmail}
        />

        <div className="grid gap-2">
          <label className={requiredLabelStyles} htmlFor="edit-phone">
            Telefone <span className="text-[var(--feedback-error-content)]">*</span>
          </label>
          <PhoneInput
            id="edit-phone"
            onValueChange={(_, maskedValue) => updateFormData({ phone: maskedValue })}
            placeholder="(00) 00000-0000"
            required
            showLabel={false}
            value={phone}
          />
        </div>
      </div>
    </EditFlowShell>
  );
}
