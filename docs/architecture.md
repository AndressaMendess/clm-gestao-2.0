# Arquitetura do Projeto

## Visão Geral

Este projeto é uma plataforma de gestão escolar com características de CRM, com foco em autenticação, gestão de usuários e evolução incremental dos módulos acadêmicos e administrativos.

## Stack Atual

| Camada | Tecnologia |
|---|---|
| Front-end | Next.js 16 (App Router) |
| Linguagem front-end | TypeScript |
| Estilo | Tailwind CSS 4 + tokens CSS |
| Lint | ESLint |
| Build/Runtime | Turbopack (Next.js) |
| Gerenciador de pacotes | npm |
| Design | Figma |

## Direção de Arquitetura

- O front-end está estruturado em `Next.js` com `App Router`, usando separação entre rotas públicas e privadas.
- O código é escrito em `TypeScript` para segurança de tipos e manutenção.
- A base visual usa `Tailwind CSS` e tokens em `src/styles` para consistência.
- A arquitetura atual está preparada para expansão por domínio (`features`) e por camadas reutilizáveis (`components`, `services`, `lib`, `hooks`).
- Integrações de back-end (ex.: autenticação, banco e storage) devem ser encapsuladas em `services`/`features/*/services` para evitar acoplamento nas telas.

## Estrutura Atual do Projeto (`src`)

- `app/`
- `app/(public)/`
- `app/(private)/`
- `app/(private)/dashboard/`
- `app/api/`
- `app/api/health/`
- `components/shared/`
- `components/ui/`
- `features/auth/components/`
- `features/auth/services/`
- `features/users/components/`
- `features/users/services/`
- `hooks/`
- `lib/`
- `services/`
- `store/`
- `styles/`
- `types/`

## Estrutura Funcional em Andamento

- Base de autenticação (feature `auth`)
- Base de usuários (feature `users`)
- Separação de área pública e privada
- Endpoint de health check

## Blocos Funcionais Sugeridos

- Gestão de alunos
- Gestão de turmas
- Gestão de módulos
- Controle de presença
- Upload de documentos e anexos
- Perfis e permissões por tipo de usuário

