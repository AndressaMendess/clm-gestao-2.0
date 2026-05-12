"use client";

import { CheckCircle2, Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { ContentShell } from "@/components/ui/content-shell";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { FeatureCard } from "@/components/ui/feature-card";
import { CpfInput, DatePicker, Input, PhoneInput, RgInput, SearchInput, TextArea } from "@/components/ui/input";
import { ModalContainer } from "@/components/ui/modal-container";
import { NavItem } from "@/components/ui/nav-item";
import { SelectField } from "@/components/ui/select-field";
import { Sidebar } from "@/components/ui/sidebar";
import { Stepper } from "@/components/ui/stepper";
import { TableCard } from "@/components/ui/table-card";

type StudentTableRow = {
  classroom: string;
  classroomVariant: "blue" | "pink";
  email: string;
  initials: string;
  module: string;
  moduleVariant: "orange" | "violet";
  name: string;
  phone: string;
  status: "Ativo" | "Trancamento";
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavItemCompositeOpen, setIsNavItemCompositeOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview");
  const [activeSidebarModule, setActiveSidebarModule] = useState<string | null>("module-i");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const studentRows: StudentTableRow[] = [
    {
      initials: "TL",
      name: "Thiago Fernandes Luz",
      status: "Ativo",
      phone: "(11) 90987-9900",
      email: "thiago.luz@email.com",
      module: "Módulo II",
      moduleVariant: "orange",
      classroom: "Percussão",
      classroomVariant: "blue",
    },
    {
      initials: "SO",
      name: "Sofia Barbosa Oliveira",
      status: "Ativo",
      phone: "(11) 91098-8890",
      email: "sofia.oliveira@email.com",
      module: "Módulo I",
      moduleVariant: "violet",
      classroom: "Classe 2",
      classroomVariant: "pink",
    },
    {
      initials: "RP",
      name: "Rafael Teixeira Pinto",
      status: "Trancamento",
      phone: "(11) 91109-7788",
      email: "rafael.pinto@email.com",
      module: "Módulo II",
      moduleVariant: "orange",
      classroom: "Teclado",
      classroomVariant: "pink",
    },
    {
      initials: "PS",
      name: "Patrícia Lima Sousa",
      status: "Ativo",
      phone: "(11) 91210-6677",
      email: "patricia.sousa@email.com",
      module: "Módulo III",
      moduleVariant: "orange",
      classroom: "Coral Avançado",
      classroomVariant: "blue",
    },
    {
      initials: "OS",
      name: "Otávio Ribeiro Santos",
      status: "Ativo",
      phone: "(11) 91321-5566",
      email: "otavio.ribeiro@email.com",
      module: "Módulo I",
      moduleVariant: "violet",
      classroom: "Classe 4",
      classroomVariant: "pink",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--background-primary)] px-6 py-10 text-[var(--content-primary)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium">UI Playground</h1>
          <p className="text-sm text-[var(--content-secondary)]">
            Página de validação visual dos componentes e variantes.
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
          <h2 className="text-lg font-medium">ContentShell</h2>
          <ContentShell contentClassName="min-h-[420px]">
            <div className="h-full rounded-2xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 text-[var(--content-secondary)]">
              Área de conteúdo interno da página
            </div>
          </ContentShell>
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
              Concluído
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
              description="Receber notificações por e-mail."
              label="Notificações"
              variant="success"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Input</h2>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Nome" placeholder="Digite seu nome" />
            <Input helperText="Use seu e-mail institucional." label="E-mail" placeholder="nome@empresa.com" />
            <Input helperText="Campo obrigatório." tone="error" label="Documento" placeholder="000.000.000-00" />
            <Input defaultValue="Andressa" helperText="Valor válido." tone="success" label="Nome completo" />
            <CpfInput label="CPF" placeholder="000.000.000-00" />
            <RgInput label="RG" placeholder="00.000.000-0" />
            <PhoneInput label="Telefone" placeholder="(00) 00000-0000" />
            <DatePicker label="Data de nascimento" />
            <SearchInput placeholder="Buscar aluno, turma, matrícula..." />
            <TextArea label="Observações" placeholder="Digite observações adicionais..." />
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
            <DocumentUploadField label="Upload de documento" maxSizeMb={5} />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">ModalContainer</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)} variant="primary">
              Abrir modal
            </Button>
          </div>

          <ModalContainer
            closeLabel="Fechar modal de exemplo"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            subtitle="Esse modal reutiliza o mesmo header e footer."
            title="Adicionar aluno"
            footer={
              <>
                <Button onClick={() => setIsModalOpen(false)} variant="ghost">
                  Cancelar
                </Button>
                <Button variant="primary">Continuar</Button>
              </>
            }
          >
            <div className="grid gap-2">
              <strong className="text-[var(--content-primary)]">Conteúdo dinâmico</strong>
              <p className="text-[var(--content-secondary)]">
                O miolo muda por fluxo, mantendo estrutura padronizada.
              </p>
            </div>
          </ModalContainer>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">FeatureCard</h2>
          <div className="w-full max-w-[520px]">
            <FeatureCard
              icon={Users}
              onClick={() => undefined}
              subtitle="Gerencie o cadastro completo de alunos."
              title="Alunos"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">TableCard</h2>
          <TableCard
            ariaLabel="Tabela de alunos"
            rowKey={(row) => row.email}
            selectableRows
            title="Alunos"
            titleBadge={`${studentRows.length} alunos`}
            columns={[
              {
                id: "name",
                header: "Nome",
                key: "name",
                sortable: true,
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-purple-background)] text-[var(--content-primary)] [font-size:var(--typography-body-large-medium-font-size)] [font-weight:var(--typography-body-large-medium-font-weight)]">
                      {row.initials}
                    </span>
                    <span className="[font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
                      {row.name}
                    </span>
                  </div>
                ),
              },
              {
                id: "status",
                header: "Status",
                key: "status",
                sortable: true,
                render: (row) => (
                  <Badge appearance="dot" variant={row.status === "Ativo" ? "success" : "warning"}>
                    {row.status}
                  </Badge>
                ),
              },
              {
                id: "contact",
                header: "Contato",
                key: "phone",
                render: (row) => (
                  <div className="grid gap-0.5">
                    <span>{row.phone}</span>
                    <span className="text-[var(--content-secondary)]">{row.email}</span>
                  </div>
                ),
              },
              {
                id: "module",
                header: "Módulo",
                key: "module",
                sortable: true,
                render: (row) => <Badge variant={row.moduleVariant}>{row.module}</Badge>,
              },
              {
                id: "classroom",
                header: "Turma",
                key: "classroom",
                sortable: true,
                render: (row) => <Badge variant={row.classroomVariant}>{row.classroom}</Badge>,
              },
            ]}
            rows={studentRows}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Stepper</h2>
          <div className="w-full max-w-4xl rounded-2xl bg-[var(--background-primary)] p-4">
            <Stepper
              ariaLabel="Progresso da matrícula"
              currentStep={2}
              steps={[
                { id: "student", label: "Aluno" },
                { id: "document", label: "Documentação" },
                { id: "review", label: "Revisão" },
                { id: "finish", label: "Finalizar" },
              ]}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Sidebar</h2>
          <div className="hidden lg:block">
            <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)]">
              <Sidebar
                activeItem={activeSidebarItem}
                activeModuleId={activeSidebarModule}
                isCollapsed={isSidebarCollapsed}
                isOpen
                onClose={() => undefined}
                onNavigate={(itemId) => {
                  setActiveSidebarItem(itemId);
                }}
                onNavigateModule={(moduleId) => setActiveSidebarModule(moduleId)}
                onToggleCollapse={() => {
                  setIsSidebarCollapsed((current) => !current);
                }}
                showOverlay={false}
                showFloatingTrigger={false}
              />
              <div className="h-full pl-[280px] pr-6 pt-6">
                <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 text-[var(--content-secondary)]">
                  Área de conteúdo da página. Item ativo: {activeSidebarItem}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-[var(--content-tertiary)] lg:hidden">
            Preview da Sidebar disponível apenas em telas desktop no playground.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">NavItem</h2>
          <div className="grid w-full max-w-4xl gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4">
            <NavItem
              icon={Search}
              label="Item simples ativo"
              onClick={() => undefined}
              state="active"
              variant="simple"
            />

            <NavItem
              icon={Search}
              label="Item simples inativo"
              onClick={() => undefined}
              state="inactive"
              variant="simple"
            />

            <NavItem
              ariaControls="nav-item-subpages"
              ariaExpanded={isNavItemCompositeOpen}
              icon={Search}
              label="Item composto"
              onClick={() => setIsNavItemCompositeOpen((current) => !current)}
              showChevron
              state={isNavItemCompositeOpen ? "active" : "inactive"}
              variant="composite"
            >
              {isNavItemCompositeOpen ? (
                <div className="grid gap-1" id="nav-item-subpages">
                  <NavItem
                    label="Subpágina 1"
                    onClick={() => undefined}
                    showLabel
                    state="active"
                    variant="subitem"
                  />
                  <NavItem
                    label="Subpágina 2"
                    onClick={() => undefined}
                    showLabel
                    state="inactive"
                    variant="subitem"
                  />
                </div>
              ) : null}
            </NavItem>

            <div className="mt-2 grid max-w-[92px] gap-2">
              <NavItem
                icon={Search}
                label="Item colapsado ativo"
                onClick={() => undefined}
                showLabel={false}
                state="active"
                variant="simple-collapsed"
              />
              <NavItem
                icon={Search}
                label="Item colapsado inativo"
                onClick={() => undefined}
                showLabel={false}
                state="inactive"
                variant="simple-collapsed"
              />
              <NavItem
                icon={Search}
                label="Item composto colapsado"
                onClick={() => undefined}
                showLabel={false}
                state="inactive"
                variant="composite-collapsed"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

