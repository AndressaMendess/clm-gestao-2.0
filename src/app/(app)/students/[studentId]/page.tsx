"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { STUDENT_ROWS } from "../_data/students.mock";
import StudentsPage from "../page";

type StudentDetails = {
  address: {
    city: string;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    zipCode: string;
  };
  attendance: {
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
};

const STUDENT_DETAILS_BY_EMAIL: Record<string, StudentDetails> = {
  "ana.costa@email.com": {
    address: {
      city: "São Paulo",
      neighborhood: "Vila Mariana",
      number: "120",
      state: "SP",
      street: "Rua das Flores",
      zipCode: "04101-100",
    },
    attendance: { justifiedAbsences: 1, presentRate: "92%", totalAbsences: 2, totalClasses: 24 },
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
  },
  "bruno.silva@email.com": {
    address: {
      city: "São Paulo",
      neighborhood: "Ipiranga",
      number: "42",
      state: "SP",
      street: "Rua Maestro Lima",
      zipCode: "04210-050",
    },
    attendance: { justifiedAbsences: 0, presentRate: "88%", totalAbsences: 3, totalClasses: 25 },
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
  },
  "camila.rocha@email.com": {
    address: {
      city: "São Bernardo do Campo",
      neighborhood: "Centro",
      number: "300",
      state: "SP",
      street: "Av. Harmonia",
      zipCode: "09710-110",
    },
    attendance: { justifiedAbsences: 2, presentRate: "79%", totalAbsences: 5, totalClasses: 24 },
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
  },
};

const EMPTY_DETAILS: StudentDetails = {
  address: {
    city: "-",
    neighborhood: "-",
    number: "-",
    state: "-",
    street: "-",
    zipCode: "-",
  },
  attendance: { justifiedAbsences: 0, presentRate: "-", totalAbsences: 0, totalClasses: 0 },
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
};

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const [activeTab, setActiveTab] = useState("personal-data");

  const student = useMemo(() => {
    const decodedStudentId = decodeURIComponent(params.studentId);
    return STUDENT_ROWS.find((item) => item.email === decodedStudentId) ?? null;
  }, [params.studentId]);

  const details = student ? STUDENT_DETAILS_BY_EMAIL[student.email] ?? EMPTY_DETAILS : EMPTY_DETAILS;

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
            <Badge variant="blue">{details.attachments.length}</Badge>
          </span>
        ),
      },
      { id: "attendance", label: "Frequência" },
    ],
    [details.attachments.length],
  );

  const statusVariant =
    student?.statusFilter === "active"
      ? "success"
      : student?.statusFilter === "inactive"
        ? "subtle"
        : "warning";

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
            <article className="rounded-[24px] border border-[var(--border-primary)] bg-[var(--background-primary)] p-5 shadow-[0_8px_20px_rgb(0_0_0_/_0.06)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Nome completo
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.fullName}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    RG
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.rg}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    CPF
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.cpf}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Data de nascimento
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.birthDate}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Sexo
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.sex}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Estado Civil
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.maritalStatus}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Nacionalidade
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.nationality}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[24px] border border-[var(--border-primary)] bg-[var(--background-primary)] p-5 shadow-[0_8px_20px_rgb(0_0_0_/_0.06)]">
              <div className="grid gap-4">
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Nome do pai
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.fatherName}</p>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Nome da mãe
                  </p>
                  <p className="[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">{details.personalData.motherName}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[24px] border border-[var(--border-primary)] bg-[var(--background-primary)] p-5 shadow-[0_8px_20px_rgb(0_0_0_/_0.06)]">
              <div className="grid gap-4">
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Módulo
                  </p>
                  <div className="pt-1">
                    <Badge variant={student?.moduleVariant ?? "violet"}>
                      {student?.module ?? "-"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="[font-size:var(--typography-body-small-semibold-font-size)] [line-height:var(--typography-body-small-semibold-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-semibold-letter-spacing)] text-[var(--content-secondary)]">
                    Turma
                  </p>
                  <div className="pt-1">
                    <Badge variant={student?.classroomVariant ?? "blue"}>
                      {student?.classroom ?? "-"}
                    </Badge>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {activeTab === "contact" ? (
          <div className="grid gap-4 text-[var(--content-secondary)]">
            <p><strong className="text-[var(--content-primary)]">E-mail:</strong> {student?.email ?? "-"}</p>
            <p><strong className="text-[var(--content-primary)]">Telefone:</strong> {student?.phone ?? "-"}</p>
          </div>
        ) : null}

        {activeTab === "address" ? (
          <div className="grid gap-4 text-[var(--content-secondary)]">
            <p><strong className="text-[var(--content-primary)]">CEP:</strong> {details.address.zipCode}</p>
            <p><strong className="text-[var(--content-primary)]">Logradouro:</strong> {details.address.street}, {details.address.number}</p>
            <p><strong className="text-[var(--content-primary)]">Bairro:</strong> {details.address.neighborhood}</p>
            <p><strong className="text-[var(--content-primary)]">Cidade/UF:</strong> {details.address.city} - {details.address.state}</p>
          </div>
        ) : null}

        {activeTab === "attachments" ? (
          <div className="grid gap-3 text-[var(--content-secondary)]">
            {details.attachments.length ? (
              details.attachments.map((item) => (
                <p key={item}><strong className="text-[var(--content-primary)]">•</strong> {item}</p>
              ))
            ) : (
              <p>Nenhum anexo cadastrado.</p>
            )}
          </div>
        ) : null}

        {activeTab === "attendance" ? (
          <div className="grid gap-4 text-[var(--content-secondary)]">
            <p><strong className="text-[var(--content-primary)]">Aulas totais:</strong> {details.attendance.totalClasses}</p>
            <p><strong className="text-[var(--content-primary)]">Faltas:</strong> {details.attendance.totalAbsences}</p>
            <p><strong className="text-[var(--content-primary)]">Faltas justificadas:</strong> {details.attendance.justifiedAbsences}</p>
            <p><strong className="text-[var(--content-primary)]">Presença:</strong> {details.attendance.presentRate}</p>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
