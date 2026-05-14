export type StudentDetails = {
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

