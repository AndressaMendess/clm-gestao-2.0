import { CheckCircle2, Plus, Search } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button, IconButton } from "../components/ui/button";

export default function HomePage() {
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
      </div>
    </main>
  );
}
