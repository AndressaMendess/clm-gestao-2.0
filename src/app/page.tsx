import { CheckCircle2, Plus, Search } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button, IconButton } from "../components/ui/button";
import { Checkbox, CheckboxField } from "../components/ui/checkbox";
import { DocumentUploadField } from "../components/ui/document-upload-field";
import { CpfInput, DatePicker, Input, PhoneInput, RgInput, SearchInput } from "../components/ui/input";
import { SelectField } from "../components/ui/select-field";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] px-6 py-10 text-[var(--content-primary)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium">UI Playground</h1>
          <p className="text-sm text-[var(--content-secondary)]">
            PÃ¡gina de validaÃ§Ã£o visual dos componentes e variantes.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Button</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Salvar</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="ghost">Voltar</Button>
            <Button variant="danger">Excluir</Button>
            <Button icon={Search}>Buscar</Button>
            <IconButton icon={Plus} label="Adicionar" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button disabled variant="primary">
              Desabilitado
            </Button>
            <Button disabled variant="secondary">
              Desabilitado
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Badge</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="violet">Violet</Badge>
            <Badge variant="orange">Orange</Badge>
            <Badge variant="blue">Blue</Badge>
            <Badge variant="pink">Pink</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge appearance="dot" variant="blue">
              Online
            </Badge>
            <Badge appearance="icon" icon={<CheckCircle2 size={14} />} variant="success">
              ConcluÃ­do
            </Badge>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Checkbox</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Checkbox aria-label="Default unchecked" />
            <Checkbox aria-label="Default checked" defaultChecked />
            <Checkbox aria-label="Default indeterminate" indeterminate />
            <Checkbox aria-label="Success checked" defaultChecked variant="success" />
            <Checkbox aria-label="Large success checked" defaultChecked size="lg" variant="success" />
            <Checkbox aria-label="Disabled" disabled />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CheckboxField
              defaultChecked
              description="Receber notificaÃ§Ãµes por e-mail."
              label="NotificaÃ§Ãµes"
              variant="success"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Input</h2>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Nome" placeholder="Digite seu nome" />
            <Input
              helperText="Use seu e-mail institucional."
              label="E-mail"
              placeholder="nome@empresa.com"
            />
            <Input
              helperText="Campo obrigatÃ³rio."
              tone="error"
              label="Documento"
              placeholder="000.000.000-00"
            />
            <Input
              defaultValue="Andressa"
              helperText="Valor vÃ¡lido."
              tone="success"
              label="Nome completo"
            />
            <CpfInput label="CPF" placeholder="000.000.000-00" />
            <RgInput label="RG" placeholder="00.000.000-0" />
            <PhoneInput label="Telefone" placeholder="(00) 00000-0000" />
            <DatePicker label="Data de nascimento" />
            <SearchInput placeholder="Buscar aluno, turma, matrÃ­cula..." />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">SelectField</h2>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              label="Turma"
              placeholder="Selecione uma turma"
              options={[
                { label: "Turma A", value: "a" },
                { label: "Turma B", value: "b" },
                { label: "Turma C", value: "c" },
              ]}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">DocumentUploadField</h2>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            <DocumentUploadField
              label="Upload de documento"
              maxSizeMb={5}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

