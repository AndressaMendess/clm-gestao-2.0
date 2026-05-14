import type { TeacherDetails } from "../_types/teacher-details.types";

export const TEACHER_DETAILS_BY_EMAIL_MOCK: Record<string, TeacherDetails> = {
  "marina.alves@email.com": {
    attachments: ["certificado-licenciatura.pdf", "contrato-docente.pdf"],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName: "Marina Alves",
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  },
  "rafael.souza@email.com": {
    attachments: ["curriculo-atualizado.pdf"],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName: "Rafael Souza",
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  },
  "camila.lima@email.com": {
    attachments: ["diploma-musica.pdf", "registro-profissional.pdf"],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName: "Camila Lima",
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  },
  "joao.mendes@email.com": {
    attachments: ["portifolio-coral.pdf"],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName: "Joao Mendes",
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  },
};
