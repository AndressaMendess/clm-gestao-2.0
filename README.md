# Next.js + React + Tailwind Template

## Rodar o projeto

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Estrutura

- `src/app`: rotas (App Router), layouts e endpoints
- `src/app/(public)`: paginas publicas/estaticas (sem login), como home, sobre e login
- `src/app/(private)`: paginas privadas (com login), como dashboard e area do usuario
- `src/components`: UI reutilizavel e componentes compartilhados
- `src/features`: organizacao por modulos de negocio
- `src/lib`: utilitarios e helpers
- `src/hooks`: hooks customizados
- `src/services`: integracao com APIs
- `src/store`: estado global (quando necessario)
- `src/styles`: tokens e estilos globais complementares
- `src/types`: tipos globais

## Grupos de Rotas (`(public)` e `(private)`)

- Os grupos com parenteses organizam o codigo por tipo de acesso e nao entram na URL final.
- `src/app/(public)` concentra paginas abertas.
- `src/app/(private)` concentra paginas protegidas por autenticacao.
- Exemplo: `src/app/(private)/dashboard/page.tsx` gera a rota `/dashboard`.
