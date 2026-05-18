"use client";

import { CheckCircle2, ChevronLeft, Plus, Search, Users, X } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { AttachmentCollapsible } from "@/components/ui/attachment-collapsible";
import { Badge } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { ClickableCard } from "@/components/ui/clickable-card";
import { ContentShell } from "@/components/ui/content-shell";
import { Drawer } from "@/components/ui/drawer";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { FeatureCard } from "@/components/ui/feature-card";
import { CpfInput, DatePicker, Input, PasswordInput, PhoneInput, RgInput, SearchInput, TextArea } from "@/components/ui/input";
import { ListCollapsible } from "@/components/ui/list-collapsible";
import { LinkText } from "@/components/ui/link-text";
import { ModalContainer } from "@/components/ui/modal-container";
import { NavItem } from "@/components/ui/nav-item";
import { SelectField } from "@/components/ui/select-field";
import { Sidebar } from "@/components/ui/sidebar";
import { Stepper } from "@/components/ui/stepper";
import { TableCard } from "@/components/ui/table-card";
import { Tabs } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";

type StudentTableRow = {
  avatarSrc?: string;
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
  const [activeTab, setActiveTab] = useState("students");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState("overview");
  const studentRows: StudentTableRow[] = [
    {
      avatarSrc:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23e6eef2'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23c0cfdb'/%3E%3Cpath d='M14 72c4-14 14-22 26-22s22 8 26 22' fill='%23c0cfdb'/%3E%3C/svg%3E",
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
  const studentRowsPaginated: StudentTableRow[] = [
    ...studentRows,
    {
      initials: "AM",
      name: "Amanda Martins",
      status: "Ativo",
      phone: "(11) 91432-4455",
      email: "amanda.martins@email.com",
      module: "Módulo II",
      moduleVariant: "orange",
      classroom: "Violão",
      classroomVariant: "pink",
    },
    {
      initials: "CV",
      name: "Caio Vieira",
      status: "Ativo",
      phone: "(11) 91543-5566",
      email: "caio.vieira@email.com",
      module: "Módulo I",
      moduleVariant: "violet",
      classroom: "Classe 5",
      classroomVariant: "blue",
    },
    {
      initials: "LM",
      name: "Larissa Moura",
      status: "Trancamento",
      phone: "(11) 91654-6677",
      email: "larissa.moura@email.com",
      module: "Módulo III",
      moduleVariant: "orange",
      classroom: "Canto",
      classroomVariant: "pink",
    },
    {
      initials: "EG",
      name: "Eduardo Gomes",
      status: "Ativo",
      phone: "(11) 91765-7788",
      email: "eduardo.gomes@email.com",
      module: "Módulo I",
      moduleVariant: "violet",
      classroom: "Classe 6",
      classroomVariant: "blue",
    },
    {
      initials: "NB",
      name: "Natália Barbosa",
      status: "Ativo",
      phone: "(11) 91876-8899",
      email: "natalia.barbosa@email.com",
      module: "Módulo II",
      moduleVariant: "orange",
      classroom: "Percussão",
      classroomVariant: "blue",
    },
    {
      initials: "RF",
      name: "Renato Faria",
      status: "Trancamento",
      phone: "(11) 91987-9900",
      email: "renato.faria@email.com",
      module: "Módulo III",
      moduleVariant: "orange",
      classroom: "Classe 7",
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
            <Button icon={X} variant="secondary">
              Cancelar
            </Button>
            <Button icon={ChevronLeft} variant="ghost">
              Voltar
            </Button>
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
            <Button loading loadingLabel="Salvando..." variant="primary">
              Salvar
            </Button>
            <Button loading loadingLabel="Carregando ação" variant="icon" icon={Plus} />
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
          <h2 className="text-lg font-medium">ClickableCard</h2>
          <div className="w-full max-w-4xl">
            <ClickableCard
              subtitle="Atualizado há 2 minutos"
              title="Status de matrícula"
            />
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
            <PasswordInput helperText="Use pelo menos 8 caracteres." label="Senha" placeholder="Digite sua senha" />
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
            <SelectField
              aria-label="Filtrar por turma"
              placeholder="Filtrar por turma"
              variant="without-label"
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
          <h2 className="text-lg font-medium">AttachmentCollapsible</h2>
          <div className="w-full max-w-4xl">
            <AttachmentCollapsible
              initialItems={[
                { id: "rg-frente", name: "RG frente.pdf", sizeInBytes: 182000 },
                { id: "comprovante", name: "Comprovante de residência.jpg", sizeInBytes: 264000 },
              ]}
              title="Documentos pessoais"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">ListCollapsible</h2>
          <div className="w-full max-w-4xl">
            <ListCollapsible
              items={[
                {
                  badgeLabel: "Ativo",
                  badgeVariant: "success",
                  id: "item-1",
                  text: "Matrícula validada",
                },
                {
                  badgeLabel: "Pendente",
                  badgeVariant: "warning",
                  id: "item-2",
                  text: "Aguardando confirmação de endereço",
                },
                {
                  badgeLabel: "Inativo",
                  badgeVariant: "error",
                  id: "item-3",
                  text: "Documentação incompleta",
                },
              ]}
              subtitle="Status detalhado por item"
              title="Lista de acompanhamento"
            />
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
          <h2 className="text-lg font-medium">Drawer</h2>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsDrawerOpen(true)} variant="primary">
              Abrir drawer
            </Button>
          </div>
          <Drawer
            avatarInitials="TL"
            closeLabel="Fechar drawer do aluno"
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onDeleteStudent={() => undefined}
            onEditStudent={() => undefined}
            onTabChange={setActiveDrawerTab}
            statusLabel="Ativo"
            statusVariant="success"
            studentName="Thiago Fernandes Luz"
            tabValue={activeDrawerTab}
            tabs={[
              { id: "overview", label: "Resumo" },
              { id: "enrollment", label: "Matrícula" },
              { id: "history", label: "Histórico" },
            ]}
          >
            {activeDrawerTab === "overview" ? (
              <div className="grid gap-2">
                <strong className="text-[var(--content-primary)]">Resumo do aluno</strong>
                <p className="text-[var(--content-secondary)]">
                  Informações dinâmicas do perfil, status e turma atual.
                </p>
              </div>
            ) : null}
            {activeDrawerTab === "enrollment" ? (
              <div className="grid gap-2">
                <strong className="text-[var(--content-primary)]">Dados de matrícula</strong>
                <p className="text-[var(--content-secondary)]">
                  Conteúdo da matrícula pode ser alterado sem mudar o layout do drawer.
                </p>
              </div>
            ) : null}
            {activeDrawerTab === "history" ? (
              <div className="grid gap-2">
                <strong className="text-[var(--content-primary)]">Histórico</strong>
                <p className="text-[var(--content-secondary)]">
                  Exemplo de histórico acadêmico e eventos relevantes do aluno.
                </p>
              </div>
            ) : null}
          </Drawer>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">FeatureCard</h2>
          <div className="w-full max-w-[520px]">
            <FeatureCard
              backgroundColorClassName="bg-[var(--accent-purple-background-primary)]"
              icon={Users}
              iconBackgroundColorClassName="bg-[var(--accent-purple-background-secondary)]"
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
                    <Avatar
                      alt={`Avatar de ${row.name}`}
                      initials={row.initials}
                      name={row.name}
                      src={row.avatarSrc}
                      variant={row.avatarSrc ? "with-image" : "without-image"}
                    />
                    <span className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--content-primary)] transition-colors hover:text-[var(--brand-primary-main)]">
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
          <h2 className="text-lg font-medium">TableCard (Paginação)</h2>
          <TableCard
            ariaLabel="Tabela de alunos com paginação"
            rowKey={(row) => row.email}
            selectableRows
            title="Alunos"
            titleBadge={`${studentRowsPaginated.length} alunos`}
            columns={[
              {
                id: "name",
                header: "Nome",
                key: "name",
                sortable: true,
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <Avatar
                      alt={`Avatar de ${row.name}`}
                      initials={row.initials}
                      name={row.name}
                      src={row.avatarSrc}
                      variant={row.avatarSrc ? "with-image" : "without-image"}
                    />
                    <span className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--content-primary)] transition-colors hover:text-[var(--brand-primary-main)]">
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
            rows={studentRowsPaginated}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Tabs</h2>
          <Tabs
            ariaLabel="Navegação por abas"
            items={[
              { id: "students", label: "Alunos" },
              { id: "classes", label: "Turmas" },
              { id: "modules", label: "Módulos" },
            ]}
            onValueChange={setActiveTab}
            value={activeTab}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Tooltip</h2>
          <div className="w-full max-w-4xl">
            <Tooltip content="Visualizar dados do aluno">
              <Button variant="secondary">Passar mouse</Button>
            </Tooltip>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">LinkText</h2>
          <div className="flex flex-wrap items-center gap-6">
            <LinkText href="#">Ver detalhes</LinkText>
            <LinkText href="#" aria-disabled>
              Link desabilitado
            </LinkText>
          </div>
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

