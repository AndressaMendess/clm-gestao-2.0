"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AttachmentCollapsible } from "@/components/ui/attachment-collapsible";
import { Badge } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { STUDENT_ROWS } from "../_data/students.mock";
import StudentsPage from "../page";

type StudentDetails = {
  address: {
    city: string;
    complement: string;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    zipCode: string;
  };
  attendance: {
    history: Array<{
      date: string;
      notes?: string;
      status: "Presente" | "Ausente" | "Justificado";
    }>;
    justifiedAbsences: number;
    presentRate: string;
    totalAbsences: number;
    totalClasses: number;
  };
  attachments: string[];
  personalData: {
    birthDate: string;
    cpf: string;
    fatherName: string;
    fullName: string;
    maritalStatus: string;
    motherName: string;
    nationality: string;
    rg: string;
    sex: string;
  };
  schoolEmail: string;
};

const STUDENT_DETAILS_BY_EMAIL: Record<string, StudentDetails> = {
  "ana.costa@email.com": {
    address: {
      city: "São Paulo",
      complement: "Apto 42",
      neighborhood: "Vila Mariana",
      number: "120",
      state: "SP",
      street: "Rua das Flores",
      zipCode: "04101-100",
    },
    attendance: {
      history: [
        { date: "2026-05-11", notes: "Chegou no horário", status: "Presente" },
        { date: "2026-05-08", status: "Ausente" },
      ],
      justifiedAbsences: 1,
      presentRate: "92%",
      totalAbsences: 2,
      totalClasses: 24,
    },
    attachments: ["RG frente", "RG verso", "Comprovante de residência"],
    personalData: {
      birthDate: "2008-03-12",
      cpf: "123.456.789-00",
      fatherName: "Carlos Eduardo Costa",
      fullName: "Ana Clara Costa",
      maritalStatus: "Solteira",
      motherName: "Fernanda Lima Costa",
      nationality: "Brasileira",
      rg: "45.678.901-2",
      sex: "Feminino",
    },
    schoolEmail: "ana.costa@escola-musica.edu.br",
  },
  "bruno.silva@email.com": {
    address: {
      city: "São Paulo",
      complement: "Casa 2",
      neighborhood: "Ipiranga",
      number: "42",
      state: "SP",
      street: "Rua Maestro Lima",
      zipCode: "04210-050",
    },
    attendance: {
      history: [{ date: "2026-05-10", notes: "Participação ativa", status: "Presente" }],
      justifiedAbsences: 0,
      presentRate: "88%",
      totalAbsences: 3,
      totalClasses: 25,
    },
    attachments: ["RG frente", "RG verso"],
    personalData: {
      birthDate: "2007-11-02",
      cpf: "234.567.890-11",
      fatherName: "Marcos Silva",
      fullName: "Bruno Henrique Silva",
      maritalStatus: "Solteiro",
      motherName: "Luciana Souza Silva",
      nationality: "Brasileiro",
      rg: "56.789.012-3",
      sex: "Masculino",
    },
    schoolEmail: "bruno.silva@escola-musica.edu.br",
  },
  "camila.rocha@email.com": {
    address: {
      city: "São Bernardo do Campo",
      complement: "Bloco B",
      neighborhood: "Centro",
      number: "300",
      state: "SP",
      street: "Av. Harmonia",
      zipCode: "09710-110",
    },
    attendance: {
      history: [
        { date: "2026-05-12", notes: "Atestado médico", status: "Justificado" },
        { date: "2026-05-09", status: "Ausente" },
      ],
      justifiedAbsences: 2,
      presentRate: "79%",
      totalAbsences: 5,
      totalClasses: 24,
    },
    attachments: ["RG frente", "RG verso", "CPF", "Laudo médico"],
    personalData: {
      birthDate: "2009-08-19",
      cpf: "345.678.901-22",
      fatherName: "Roberto Rocha",
      fullName: "Camila Rocha",
      maritalStatus: "Solteira",
      motherName: "Patrícia Almeida Rocha",
      nationality: "Brasileira",
      rg: "67.890.123-4",
      sex: "Feminino",
    },
    schoolEmail: "camila.rocha@escola-musica.edu.br",
  },
};

const EMPTY_DETAILS: StudentDetails = {
  address: {
    city: "-",
    complement: "-",
    neighborhood: "-",
    number: "-",
    state: "-",
    street: "-",
    zipCode: "-",
  },
  attendance: { history: [], justifiedAbsences: 0, presentRate: "-", totalAbsences: 0, totalClasses: 0 },
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

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const [activeTab, setActiveTab] = useState("personal-data");
  const [attachmentItems, setAttachmentItems] = useState<Array<{ id: string; name: string }>>([]);

  const student = useMemo(() => {
    const decodedStudentId = decodeURIComponent(params.studentId);
    return STUDENT_ROWS.find((item) => item.email === decodedStudentId) ?? null;
  }, [params.studentId]);

  const details = student ? STUDENT_DETAILS_BY_EMAIL[student.email] ?? EMPTY_DETAILS : EMPTY_DETAILS;

  useEffect(() => {
    setAttachmentItems(
      details.attachments.map((attachmentName, index) => ({
        id: `${student?.email ?? "student"}-${index}`,
        name: attachmentName,
      })),
    );
  }, [details.attachments, student?.email]);

  const drawerTabs = useMemo(
    () => [
      { id: "personal-data", label: "Dados pessoais" },
      { id: "contact", label: "Contato" },
      { id: "address", label: "Endereço" },
      {
        id: "attachments",
        label: (
          <span className="inline-flex items-center gap-2">
            <span>Anexos</span>
            <Badge variant="blue">{attachmentItems.length}</Badge>
          </span>
        ),
      },
      { id: "attendance", label: "Frequência" },
    ],
    [attachmentItems.length],
  );

  const statusVariant =
    student?.statusFilter === "active"
      ? "success"
      : student?.statusFilter === "inactive"
        ? "subtle"
        : "warning";

  const copyToClipboard = async (value: string) => {
    if (!value || value === "-") return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // noop for unsupported clipboard contexts
    }
  };

  return (
    <>
      <StudentsPage />

      <Drawer
        avatarInitials={student?.initials ?? "--"}
        avatarSrc={student?.avatarSrc}
        isOpen
        onClose={() => router.push("/students")}
        onDeleteStudent={() => undefined}
        onEditStudent={() => undefined}
        onTabChange={setActiveTab}
        statusLabel={student?.status ?? "Não encontrado"}
        statusVariant={statusVariant}
        studentName={student?.name ?? "Aluno não encontrado"}
        tabValue={activeTab}
        tabs={drawerTabs}
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
                { id: "motherName", label: "Nome da mãe", value: details.personalData.motherName },
              ]}
            />

            <Card
              fields={[
                {
                  id: "module",
                  label: "Módulo",
                  value: (
                    <div className="pt-1">
                      <Badge variant={student?.moduleVariant ?? "violet"}>{student?.module ?? "-"}</Badge>
                    </div>
                  ),
                },
                {
                  id: "classroom",
                  label: "Turma",
                  value: (
                    <div className="pt-1">
                      <Badge variant={student?.classroomVariant ?? "blue"}>{student?.classroom ?? "-"}</Badge>
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
                      {student?.phone ?? "-"}
                    </p>
                    <IconButton icon={Copy} label="Copiar telefone" onClick={() => copyToClipboard(student?.phone ?? "")} />
                  </div>
                ),
              },
              {
                id: "email",
                label: "E-mail",
                value: (
                  <div className="flex items-start justify-between gap-3">
                    <p className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--brand-primary-main)]">
                      {student?.email ?? "-"}
                    </p>
                    <IconButton icon={Copy} label="Copiar e-mail" onClick={() => copyToClipboard(student?.email ?? "")} />
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

        {activeTab === "address" ? (
          <Card
            columns={2}
            fields={[
              { id: "zipCode", label: "CEP", value: details.address.zipCode },
              { id: "number", label: "Número", value: details.address.number },
              { id: "street", label: "Rua", value: details.address.street },
              { id: "complement", label: "Complemento", value: details.address.complement },
              { id: "neighborhood", label: "Bairro", value: details.address.neighborhood },
              { id: "city", label: "Cidade", value: details.address.city },
              { id: "state", label: "Estado", value: details.address.state },
            ]}
          />
        ) : null}

        {activeTab === "attachments" ? (
          <AttachmentCollapsible
            items={attachmentItems}
            onItemsChange={(nextItems) =>
              setAttachmentItems(nextItems.map((item) => ({ id: item.id, name: item.name })))
            }
            title="Documentos pessoais"
          />
        ) : null}

        {activeTab === "attendance" ? (
          <div className="grid gap-4">
            <Card
              fields={[]}
              title={
                <div className="grid gap-1">
                  <p>Histórico Recente</p>
                  <p className="[font-size:var(--typography-body-small-regular-font-size)] [line-height:var(--typography-body-small-regular-line-height)] [font-weight:var(--typography-body-small-regular-font-weight)] [letter-spacing:var(--typography-body-small-regular-letter-spacing)] text-[var(--content-secondary)]">
                    Últimas {details.attendance.history.length} ocorrências de presença
                  </p>
                </div>
              }
            />

            {details.attendance.history.length ? (
              <Card
                className="border border-[var(--border-primary)]"
                columns={2}
                fields={[
                  {
                    id: "lastDate",
                    label: "Data",
                    value: details.attendance.history[0].date,
                  },
                  {
                    id: "lastStatus",
                    label: "Status",
                    value: (
                      <Badge
                        variant={
                          details.attendance.history[0].status === "Presente"
                            ? "success"
                            : details.attendance.history[0].status === "Justificado"
                              ? "blue"
                              : "warning"
                        }
                      >
                        {details.attendance.history[0].status}
                      </Badge>
                    ),
                  },
                  {
                    id: "lastNotes",
                    label: "Observações",
                    value: details.attendance.history[0].notes ?? "Sem observações.",
                  },
                ]}
              />
            ) : (
              <Card
                className="border border-[var(--border-primary)]"
                fields={[
                  {
                    id: "emptyAttendance",
                    label: "Sem registros",
                    value: "Nenhuma atualização de frequência disponível.",
                  },
                ]}
              />
            )}

            <div className="w-full">
              <Button
                className="w-full"
                onClick={() => router.push(`/students/${encodeURIComponent(student?.email ?? "")}/attendance-history`)}
                variant="secondary"
              >
                Ver histórico completo
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
