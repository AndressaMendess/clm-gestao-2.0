 "use client";

import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle2, Menu, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { tokens } from "../../../design-system/tokens";
import { Button, IconButton } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { CpfInput, DatePicker, Input, PasswordInput, PhoneInput, RgInput, SearchInput, TextArea } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link-text";
import { SelectField } from "@/components/ui/select-field";
import { Stepper } from "@/components/ui/stepper";
import { Tooltip } from "@/components/ui/tooltip";

type DocumentationSection = {
  id: string;
  label: string;
  subSections?: Array<{
    id: string;
    label: string;
  }>;
};

const sections: DocumentationSection[] = [
  { id: "introducao", label: "Introdução" },
  { id: "tokens-primitivos", label: "Tokens Primitivos" },
  { id: "tokens-semanticos", label: "Tokens Semânticos" },
  { id: "tipografia", label: "Tipografia" },
  { id: "espacamentos", label: "Espaçamentos" },
  {
    id: "componentes",
    label: "Componentes",
    subSections: [
      { id: "componentes-button", label: "Button" },
      { id: "componentes-avatar", label: "Avatar" },
      { id: "componentes-badge", label: "Badge" },
      { id: "componentes-checkbox", label: "Checkbox" },
      { id: "componentes-input", label: "Input" },
      { id: "componentes-link-text", label: "Link Text" },
      { id: "componentes-select-field", label: "Select Field" },
      { id: "componentes-stepper", label: "Stepper" },
      { id: "componentes-tooltip", label: "Tooltip" },
    ],
  },
];

const selectFieldOptions = [
  { label: "Módulo I", value: "module-i" },
  { label: "Módulo II", value: "module-ii" },
  { label: "Módulo III", value: "module-iii" },
];

const stepperDemoSteps = [
  { id: "student", label: "Aluno" },
  { id: "documents", label: "Documentos" },
  { id: "review", label: "Revisão" },
  { id: "finish", label: "Finalização" },
];

const primitiveColorFamilies = Object.entries(tokens.colors.primitives).map(([familyName, scales]) => ({
  familyName,
  values: Object.entries(scales).map(([scale, hex]) => ({
    hex,
    name: `${familyName}.${scale}`,
  })),
}));

type SemanticEntry = {
  dark?: string;
  light?: string;
  name: string;
  value?: string;
};

type SemanticFamily = {
  familyName: string;
  values: SemanticEntry[];
};

function collectSemanticEntries(node: unknown, path: string[] = []): SemanticEntry[] {
  if (!node || typeof node !== "object") return [];

  const valueRecord = node as Record<string, unknown>;
  const hasLightDark = typeof valueRecord.light === "string" && typeof valueRecord.dark === "string";

  if (hasLightDark) {
    return [
      {
        dark: valueRecord.dark as string,
        light: valueRecord.light as string,
        name: path.join("."),
      },
    ];
  }

  if (Object.keys(valueRecord).length === 0) return [];

  return Object.entries(valueRecord).flatMap(([key, value]) => {
    if (typeof value === "string") {
      return [{ name: [...path, key].join("."), value }];
    }

    return collectSemanticEntries(value, [...path, key]);
  });
}

const semanticColorFamilies: SemanticFamily[] = Object.entries(tokens.colors.semantic).map(([familyName, values]) => ({
  familyName,
  values: collectSemanticEntries(values),
}));

const typographyScaleTokens = Object.entries(tokens.typography.scale);
const spacingTokens = Object.entries(tokens.spacing);

function getTypographyPreview(tokenName: string) {
  if (tokenName.startsWith("display")) return "Olá, Andressa. Bem-vinda ao painel da Escola CLM.";
  if (tokenName.startsWith("heading-h1")) return "Resumo geral de matrículas";
  if (tokenName.startsWith("heading-h2")) return "Vamos começar a chamada?";
  if (tokenName.startsWith("heading-h3")) return "Próximas atividades complementares";
  if (tokenName.startsWith("heading-h4")) return "Pendências desta semana";
  if (tokenName.startsWith("heading-h5")) return "Status de documentação";
  if (tokenName.startsWith("heading-h6")) return "Últimas atualizações";
  if (tokenName.startsWith("body-x-large")) return "Acompanhe o desempenho das turmas e priorize ações pedagógicas com clareza.";
  if (tokenName.startsWith("body-large")) return "Organize tarefas, prazos e registros para manter o fluxo da secretaria em dia.";
  if (tokenName.startsWith("body-medium")) return "Confira os dados antes de salvar para evitar inconsistências no cadastro.";
  if (tokenName.startsWith("body-small")) return "Use este campo para observações curtas da equipe administrativa.";
  if (tokenName.startsWith("body-xsmall")) return "Atualizado há 5 min";
  return "Texto de demonstração";
}

export default function DesignSystemPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("introducao");

  useEffect(() => {
    const syncWithHash = () => {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash) setActiveSectionId(currentHash);
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background-secondary)] px-6 py-8">
      {isSidebarOpen ? (
        <button
          aria-label="Fechar menu de seções"
          className="fixed inset-0 z-40 bg-[rgb(0_0_0_/_0.3)] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      ) : null}

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside
          className={`fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] w-[min(82vw,320px)] overflow-y-auto rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4 shadow-lg transition-transform duration-200 lg:sticky lg:top-8 lg:z-auto lg:h-fit lg:w-auto lg:translate-x-0 lg:overflow-visible lg:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
          }`}
        >
          <div className="mb-2 flex items-center justify-between lg:hidden">
            <span className="text-sm font-medium text-[var(--content-secondary)]">Navegação</span>
            <button
              aria-label="Fechar menu"
              className="rounded-md p-1 text-[var(--content-secondary)]"
              onClick={() => setIsSidebarOpen(false)}
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <h2 className="mb-4 text-sm text-[var(--content-secondary)]">Seções</h2>
          <nav aria-label="Seções da documentação">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeSectionId === section.id
                        ? "bg-[var(--background-secondary)] text-[var(--content-primary)]"
                        : "text-[var(--content-primary)] hover:bg-[var(--background-secondary)]"
                    }`}
                    href={`#${section.id}`}
                    onClick={() => {
                      setActiveSectionId(section.id);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {section.label}
                  </a>
                  {section.subSections ? (
                    <ul className="mt-1 space-y-1 pl-3">
                      {section.subSections.map((subSection) => (
                        <li key={subSection.id}>
                          <a
                            className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                              activeSectionId === subSection.id
                                ? "bg-[var(--background-secondary)] text-[var(--content-primary)]"
                                : "text-[var(--content-secondary)] hover:bg-[var(--background-secondary)] hover:text-[var(--content-primary)]"
                            }`}
                            href={`#${subSection.id}`}
                            onClick={() => {
                              setActiveSectionId(subSection.id);
                              setIsSidebarOpen(false);
                            }}
                          >
                            {subSection.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="flex justify-center">
          <section className="w-full max-w-[760px] space-y-6">
            <div className="lg:hidden">
              <IconButton icon={Menu} label="Abrir seções" onClick={() => setIsSidebarOpen(true)} />
            </div>

            <PageHeader
              subtitle="Fonte única da verdade visual do produto. Tokens, tipografia, cores e todos os componentes em uso real, com variantes e estados."
              title="Design System — Escola CLM"
              titleClassName="[font-size:var(--typography-heading-h6-font-size)] [font-weight:var(--typography-heading-h6-font-weight)] [line-height:var(--typography-heading-h6-line-height)] [letter-spacing:var(--typography-heading-h6-letter-spacing)]"
            />

            <section className="flex flex-col gap-16" id="introducao">
              <section className="flex flex-col gap-8" id="tokens-primitivos">
                <header className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--content-primary)]">Tokens Primitivos</h2>
                  <p className="max-w-3xl [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                    Tokens primitivos definem os valores base do sistema visual, como cores e medidas puras, e servem
                    como fundação para todos os tokens semânticos e componentes da interface.
                  </p>
                </header>

                {primitiveColorFamilies.map((family) => (
                  <article className="flex flex-col gap-2" key={family.familyName}>
                    <h3 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)] text-[var(--content-primary)] capitalize">
                      {family.familyName}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {family.values.map((token) => (
                        <article
                          className="rounded-xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4"
                          key={token.name}
                        >
                          <div
                            aria-label={`Cor do token ${token.name}`}
                            className="mb-4 h-14 w-full rounded-lg border border-[var(--border-primary)]"
                            style={{ backgroundColor: token.hex }}
                          />
                          <p className="text-sm font-medium text-[var(--content-primary)]">{token.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-wide text-[var(--content-secondary)]">{token.hex}</p>
                        </article>
                      ))}
                    </div>
                  </article>
                ))}
              </section>

              <section className="flex flex-col gap-4" id="tokens-semanticos">
                <header className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--content-primary)]">Tokens Semânticos (Cores)</h2>
                  <p className="max-w-3xl [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                    Tokens semânticos traduzem intenção de uso na interface, conectando os valores primitivos a
                    contextos reais como marca, conteúdo, bordas, feedback e estados dos componentes.
                  </p>
                </header>

                {semanticColorFamilies.map((family) => (
                  <section className="flex flex-col gap-2" key={family.familyName}>
                    <h3 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)] text-[var(--content-primary)] capitalize">
                      {family.familyName}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {family.values.map((token) => (
                        <article
                          className="rounded-xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4"
                          key={`${family.familyName}.${token.name}`}
                        >
                          {token.light && token.dark ? (
                            <div className="mb-4 flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <p className="w-11 text-[10px] text-[var(--content-secondary)]">Light</p>
                                <div className="flex-1">
                                  <div
                                    aria-label={`Cor light do token ${token.name}`}
                                    className="h-12 w-full rounded-lg border border-[var(--border-primary)]"
                                    style={{ backgroundColor: token.light }}
                                  />
                                  <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--content-secondary)]">
                                    {token.light}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="w-11 text-[10px] text-[var(--content-secondary)]">Dark</p>
                                <div className="flex-1">
                                  <div
                                    aria-label={`Cor dark do token ${token.name}`}
                                    className="h-12 w-full rounded-lg border border-[var(--border-primary)]"
                                    style={{ backgroundColor: token.dark }}
                                  />
                                  <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--content-secondary)]">
                                    {token.dark}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              aria-label={`Cor do token ${token.name}`}
                              className="mb-4 h-14 w-full rounded-lg border border-[var(--border-primary)]"
                              style={{
                                backgroundColor: token.value && token.value.startsWith("#") ? token.value : "transparent",
                              }}
                            />
                          )}

                          <p className="text-sm font-medium text-[var(--content-primary)]">{token.name}</p>
                          {!token.light || !token.dark ? (
                            <p className="mt-1 text-xs uppercase tracking-wide text-[var(--content-secondary)]">
                              {token.value}
                            </p>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </section>

              <section className="flex flex-col gap-4" id="tipografia">
                <header className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--content-primary)]">Tipografia</h2>
                  <p className="max-w-3xl [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                    Escala tipográfica oficial da interface, com demonstração visual de cada token para facilitar
                    consistência em títulos, textos e conteúdos de apoio.
                  </p>
                </header>

                <div className="flex flex-col gap-6 rounded-3xl border p-4" style={{ borderColor: "var(--border-secondary)" }}>
                  {typographyScaleTokens.map(([tokenName, tokenValue]) => (
                    <article
                      className="border-b border-[var(--border-primary)] pb-5 last:border-b-0 last:pb-0"
                      key={tokenName}
                    >
                      <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--content-secondary)]">
                        {tokenName} {tokenValue.fontSize} / {tokenValue.lineHeight}
                      </p>
                      <p
                        className="text-[var(--content-primary)]"
                        style={{
                          fontFamily: tokens.typography.fontFamily.sans,
                          fontSize: tokenValue.fontSize,
                          fontWeight: tokenValue.fontWeight,
                          letterSpacing: tokenValue.letterSpacing,
                          lineHeight: tokenValue.lineHeight,
                        }}
                      >
                        {getTypographyPreview(tokenName)}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4" id="espacamentos">
                <header className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--content-primary)]">Espaçamentos</h2>
                  <p className="max-w-3xl [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-secondary)]">
                    Escala de spacing aplicada no produto para garantir ritmo visual e consistência entre componentes e
                    layouts.
                  </p>
                </header>

                <div className="grid gap-3 rounded-3xl border border-[var(--border-secondary)] p-4">
                  {spacingTokens.map(([name, value]) => (
                    <article
                      className="grid items-center gap-3 border-b border-[var(--border-primary)] pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[120px_minmax(0,1fr)]"
                      key={name}
                    >
                      <code className="text-xs text-[var(--content-secondary)]">{`spacing.${name}`}</code>
                      <div className="flex items-center gap-3">
                        <div className="h-3 rounded-full bg-[var(--brand-primary-main)]" style={{ width: value }} />
                        <span className="text-sm text-[var(--content-primary)]">{value}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-8" id="componentes">
                <header className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--content-primary)]">Componentes</h2>
                </header>

                <section className="flex flex-col gap-3" id="componentes-button">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">
                    Button
                  </h3>
                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variantes
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button icon={Trash2} variant="danger">
                          Danger
                        </Button>
                        <Button icon={Search}>With Icon</Button>
                        <IconButton icon={Plus} label="Icon" />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Estados
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button disabled variant="primary">Primary Disabled</Button>
                        <Button loading loadingLabel="Salvando..." variant="primary">
                          Primary Loading
                        </Button>
                        <Button disabled variant="secondary">Secondary Disabled</Button>
                        <Button loading loadingLabel="Loading Icon..." variant="icon" icon={Plus} />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Tamanhos
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm" variant="primary">Primary Small</Button>
                        <Button size="md" variant="primary">Primary Medium</Button>
                        <IconButton icon={Plus} label="Icon Button" />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-avatar">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Avatar</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variantes
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Avatar initials="AM" name="Ana Martins" size="md" variant="without-image" />
                        <Avatar
                          alt="Avatar de pessoa"
                          name="Mariana Souza"
                          size="md"
                          src="/images/login-image.webp"
                          variant="with-image"
                        />
                        <Avatar initials="RB" name="Rafael Braga" size="md" variant="without-image" />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Tamanhos
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Avatar initials="SM" name="Small Avatar" size="sm" variant="without-image" />
                        <Avatar initials="MD" name="Medium Avatar" size="md" variant="without-image" />
                        <Avatar initials="LG" name="Large Avatar" size="lg" variant="without-image" />
                        <Avatar initials="XL" name="Extra Large Avatar" size="xl" variant="without-image" />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Fallback
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Avatar name="Camila" size="md" variant="without-image" />
                        <Avatar name="João Pedro" size="md" variant="without-image" />
                        <Avatar size="md" variant="without-image" />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-badge">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Badge</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variantes
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
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
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Aparências
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge appearance="default" variant="default">
                          Default
                        </Badge>
                        <Badge appearance="dot" variant="success">
                          Dot
                        </Badge>
                        <Badge appearance="icon" icon={<CheckCircle2 size={14} />} variant="blue">
                          Icon
                        </Badge>
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Combinações
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge appearance="dot" variant="success">
                          Ativo
                        </Badge>
                        <Badge appearance="dot" variant="warning">
                          Pendente
                        </Badge>
                        <Badge appearance="dot" variant="error">
                          Erro
                        </Badge>
                        <Badge appearance="icon" icon={<CheckCircle2 size={14} />} variant="success">
                          Concluído
                        </Badge>
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-checkbox">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Checkbox</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variantes e Estados
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Checkbox aria-label="Default unchecked" />
                        <Checkbox aria-label="Default checked" defaultChecked />
                        <Checkbox aria-label="Default indeterminate" indeterminate />
                        <Checkbox aria-label="Success checked" defaultChecked variant="success" />
                        <Checkbox aria-label="Disabled unchecked" disabled />
                        <Checkbox aria-label="Disabled checked" defaultChecked disabled />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Tamanhos
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Checkbox aria-label="Small checked" defaultChecked size="sm" />
                        <Checkbox aria-label="Medium checked" defaultChecked size="md" />
                        <Checkbox aria-label="Large checked" defaultChecked size="lg" />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Checkbox Field
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid gap-4">
                        <CheckboxField
                          defaultChecked
                          description="Receber notificações por e-mail."
                          label="Notificações"
                        />
                        <CheckboxField
                          description="Sincronizar dados automaticamente."
                          label="Sincronização automática"
                          variant="success"
                        />
                        <CheckboxField
                          defaultChecked
                          description="Esse campo está bloqueado no momento."
                          disabled
                          label="Campo desabilitado"
                        />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-input">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Input</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variações
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <Input label="Nome" placeholder="Digite seu nome" />
                        <Input helperText="Use seu e-mail institucional." label="E-mail" placeholder="nome@escola.com" />
                        <Input helperText="Campo obrigatório." label="CPF" placeholder="000.000.000-00" tone="error" />
                        <Input defaultValue="Cadastro válido" helperText="Dados conferidos." label="Status" tone="success" />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Tipos de Input
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <PasswordInput helperText="Use pelo menos 8 caracteres." label="Senha" placeholder="Digite sua senha" />
                        <SearchInput placeholder="Buscar aluno, turma, matrícula..." />
                        <DatePicker label="Data de nascimento" />
                        <Input label="Desabilitado" placeholder="Campo bloqueado" disabled />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Máscaras e TextArea
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <CpfInput label="CPF" placeholder="000.000.000-00" />
                        <RgInput label="RG" placeholder="00.000.000-0" />
                        <PhoneInput label="Telefone" placeholder="(00) 00000-0000" />
                        <TextArea label="Observações" placeholder="Digite observações adicionais..." />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-link-text">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Link Text</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Estados
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-col gap-4">
                        <LinkText href="#componentes-link-text">Link padrão</LinkText>
                        <LinkText href="#componentes-link-text" aria-disabled>
                          Link desabilitado
                        </LinkText>
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variações de uso
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-col gap-4">
                        <LinkText href="/students">Ver alunos cadastrados</LinkText>
                        <LinkText href="/attendance">Acessar histórico de presenças</LinkText>
                        <LinkText href="/settings/profile">Editar perfil da conta</LinkText>
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-select-field">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Select Field</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variações
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <SelectField
                          helperText="Selecione o módulo principal."
                          label="Módulo"
                          options={selectFieldOptions}
                          placeholder="Selecione um módulo"
                        />
                        <SelectField
                          helperText="Campo obrigatório para concluir o cadastro."
                          label="Módulo (Erro)"
                          options={selectFieldOptions}
                          placeholder="Selecione um módulo"
                          tone="error"
                        />
                        <SelectField
                          helperText="Opção válida selecionada."
                          label="Módulo (Sucesso)"
                          options={selectFieldOptions}
                          placeholder="Selecione um módulo"
                          tone="success"
                        />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variantes de Label
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <SelectField
                          label="Turma"
                          options={[
                            { label: "Classe 1", value: "class-1" },
                            { label: "Classe 2", value: "class-2" },
                            { label: "Violão", value: "violao" },
                          ]}
                          placeholder="Selecione uma turma"
                          variant="with-label"
                        />
                        <SelectField
                          aria-label="Filtrar por turma"
                          options={[
                            { label: "Classe 1", value: "class-1" },
                            { label: "Classe 2", value: "class-2" },
                            { label: "Violão", value: "violao" },
                          ]}
                          placeholder="Filtrar por turma"
                          variant="without-label"
                        />
                      </div>
                    </section>

                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Estados
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid grid-cols-1 gap-4">
                        <SelectField
                          defaultValue="module-ii"
                          label="Com valor padrão"
                          options={selectFieldOptions}
                        />
                        <SelectField
                          disabled
                          label="Desabilitado"
                          options={selectFieldOptions}
                          placeholder="Campo bloqueado"
                        />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-stepper">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Stepper</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Progressão
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="grid gap-7">
                        <Stepper ariaLabel="Progresso no início do fluxo" currentStep={1} steps={stepperDemoSteps} />
                        <Stepper ariaLabel="Progresso no meio do fluxo" currentStep={2} steps={stepperDemoSteps} />
                        <Stepper ariaLabel="Progresso no fim do fluxo" currentStep={4} steps={stepperDemoSteps} />
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex flex-col gap-3" id="componentes-tooltip">
                  <h3 className="text-2xl font-semibold text-[var(--content-primary)]">Tooltip</h3>

                  <div className="grid gap-4">
                    <h4 className="[font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)] text-[var(--content-secondary)]">
                      Variações de uso
                    </h4>
                    <section className="rounded-3xl border border-[var(--border-secondary)] p-7">
                      <div className="flex flex-wrap items-center gap-4">
                        <Tooltip content="Visualizar dados detalhados do aluno.">
                          <span className="text-sm text-[var(--content-primary)]">Passe o mouse aqui</span>
                        </Tooltip>

                        <Tooltip content="Status atualizado em tempo real.">
                          <Badge variant="blue">Status</Badge>
                        </Tooltip>

                        <Tooltip content="Executa ação principal do fluxo.">
                          <Button variant="secondary">Ação</Button>
                        </Tooltip>
                      </div>
                    </section>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}


