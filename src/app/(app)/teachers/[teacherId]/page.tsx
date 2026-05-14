"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AttachmentCollapsible } from "@/components/ui/attachment-collapsible";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { getTeacherRecordByEmail, getTeacherRowsFromRegistry } from "../_data/teachers-registry";
import type { TeacherDetails } from "../_types/teacher-details.types";
import TeachersPage from "../page";

const EMPTY_DETAILS: TeacherDetails = {
  attachments: [],
  personalData: {
    birthDate: "-",
    cpf: "-",
    fatherName: "-",
    fullName: "-",
    maritalStatus: "-",
    motherName: "-",
    nationality: "-",
    rg: "-",
    sex: "-",
  },
  schoolEmail: "-",
};

export default function TeacherDetailsPage() {
  const router = useRouter();
  const params = useParams<{ teacherId: string }>();
  const [activeTab, setActiveTab] = useState("personal-data");
  const [attachmentItems, setAttachmentItems] = useState<Array<{ id: string; name: string }>>([]);
  const teacherRows = useMemo(() => getTeacherRowsFromRegistry(), []);
  const decodedTeacherId = useMemo(() => decodeURIComponent(params.teacherId), [params.teacherId]);

  const teacher = useMemo(() => {
    return teacherRows.find((item) => item.email === decodedTeacherId) ?? null;
  }, [decodedTeacherId, teacherRows]);

  const details = useMemo(() => {
    if (!teacher) return EMPTY_DETAILS;
    const recordDetails = getTeacherRecordByEmail(teacher.email)?.details;
    if (!recordDetails) return EMPTY_DETAILS;
    return {
      attachments: Array.isArray(recordDetails.attachments) ? recordDetails.attachments : [],
      personalData: {
        birthDate: recordDetails.personalData?.birthDate ?? "-",
        cpf: recordDetails.personalData?.cpf ?? "-",
        fatherName: recordDetails.personalData?.fatherName ?? "-",
        fullName: recordDetails.personalData?.fullName ?? teacher.name,
        maritalStatus: recordDetails.personalData?.maritalStatus ?? "-",
        motherName: recordDetails.personalData?.motherName ?? "-",
        nationality: recordDetails.personalData?.nationality ?? "-",
        rg: recordDetails.personalData?.rg ?? "-",
        sex: recordDetails.personalData?.sex ?? "-",
      },
      schoolEmail: recordDetails.schoolEmail ?? "-",
    };
  }, [teacher]);

  useEffect(() => {
    setAttachmentItems(
      details.attachments.map((attachmentName, index) => ({
        id: `${teacher?.email ?? "teacher"}-${index}`,
        name: attachmentName,
      })),
    );
  }, [details.attachments, teacher?.email]);

  const statusVariant =
    teacher?.statusFilter === "active"
      ? "success"
      : teacher?.statusFilter === "inactive"
        ? "subtle"
        : "warning";

  const copyToClipboard = async (value: string) => {
    if (!value || value === "-") return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // noop
    }
  };

  return (
    <>
      <TeachersPage />

      <Drawer
        avatarInitials={teacher?.initials ?? "--"}
        avatarSrc={teacher?.avatarSrc}
        editButtonLabel="Editar professor"
        isOpen
        onClose={() => router.push("/teachers")}
        onDeleteStudent={() => undefined}
        onEditStudent={() => undefined}
        onTabChange={setActiveTab}
        statusLabel={teacher?.status ?? "Nao encontrado"}
        statusVariant={statusVariant}
        studentName={teacher?.name ?? "Professor nao encontrado"}
        tabValue={activeTab}
        tabs={[
          { id: "personal-data", label: "Dados pessoais" },
          { id: "contact", label: "Contato" },
          {
            id: "attachments",
            label: (
              <span className="inline-flex items-center gap-2">
                <span>Anexos</span>
                <Badge variant="blue">{attachmentItems.length}</Badge>
              </span>
            ),
          },
        ]}
      >
        {activeTab === "personal-data" ? (
          <div className="grid gap-6">
            <Card
              columns={2}
              fields={[
                { id: "fullName", label: "Nome completo", value: details.personalData.fullName },
                { id: "rg", label: "RG", value: details.personalData.rg },
                { id: "cpf", label: "CPF", value: details.personalData.cpf },
                { id: "birthDate", label: "Data de nascimento", value: details.personalData.birthDate },
                { id: "sex", label: "Sexo", value: details.personalData.sex },
                { id: "maritalStatus", label: "Estado Civil", value: details.personalData.maritalStatus },
                { id: "nationality", label: "Nacionalidade", value: details.personalData.nationality },
              ]}
            />

            <Card
              fields={[
                { id: "fatherName", label: "Nome do pai", value: details.personalData.fatherName },
                { id: "motherName", label: "Nome da mae", value: details.personalData.motherName },
              ]}
            />

            <Card
              fields={[
                {
                  id: "specialty",
                  label: "Especialidade",
                  value: (
                    <div className="pt-1">
                      <Badge variant={teacher?.specialtyVariant ?? "violet"}>{teacher?.specialty ?? "-"}</Badge>
                    </div>
                  ),
                },
                {
                  id: "status",
                  label: "Status",
                  value: (
                    <div className="pt-1">
                      <Badge appearance="dot" variant={statusVariant}>
                        {teacher?.status ?? "-"}
                      </Badge>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        ) : null}

        {activeTab === "contact" ? (
          <Card
            fields={[
              {
                id: "phone",
                label: "Telefone",
                value: (
                  <div className="flex items-start justify-between gap-3">
                    <p className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--brand-primary-main)]">
                      {teacher?.phone ?? "-"}
                    </p>
                    <IconButton icon={Copy} label="Copiar telefone" onClick={() => copyToClipboard(teacher?.phone ?? "")} />
                  </div>
                ),
              },
              {
                id: "email",
                label: "E-mail",
                value: (
                  <div className="flex items-start justify-between gap-3">
                    <p className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--brand-primary-main)]">
                      {teacher?.email ?? "-"}
                    </p>
                    <IconButton icon={Copy} label="Copiar e-mail" onClick={() => copyToClipboard(teacher?.email ?? "")} />
                  </div>
                ),
              },
              {
                id: "schoolEmail",
                label: "E-mail escolar",
                value: (
                  <div className="flex items-start justify-between gap-3">
                    <p className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--brand-primary-main)]">
                      {details.schoolEmail}
                    </p>
                    <IconButton icon={Copy} label="Copiar e-mail escolar" onClick={() => copyToClipboard(details.schoolEmail)} />
                  </div>
                ),
              },
            ]}
          />
        ) : null}

        {activeTab === "attachments" ? (
          <AttachmentCollapsible
            items={attachmentItems}
            onItemsChange={(nextItems) =>
              setAttachmentItems(nextItems.map((item) => ({ id: item.id, name: item.name })))
            }
            title="Documentos do professor"
          />
        ) : null}
      </Drawer>
    </>
  );
}
