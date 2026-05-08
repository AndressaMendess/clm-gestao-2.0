# Regras de Implementação

Este documento define as regras operacionais para implementação de telas e funcionalidades no projeto.

Ele complementa o documento de arquitetura em `docs/architecture.md` e deve ser usado como referência prática de implementação no dia a dia.

## Objetivo

Garantir que toda nova implementação:

- siga o design enviado via Figma
- mantenha consistência com Tailwind CSS e componentes reutilizáveis do projeto
- reutilize tokens e estilos definidos na base
- venha preparada para futura integração com banco de dados
- seja responsiva para mobile, tablet e desktop

## Regras Fixas

### 1. Figma sempre vira código

Sempre que um link de frame do Figma for enviado para implementação:

- o design deve ser implementado no código
- a estrutura visual deve seguir o frame solicitado
- a tradução para código deve respeitar o estilo técnico do projeto, evitando cópia literal de markup quando houver solução melhor com componentes

### 2. Seguir o estilo do projeto

Toda implementação nova deve seguir:

- Tailwind CSS para composição visual e responsividade
- componentes reutilizáveis em `src/components/ui` e `src/components/shared`
- personalização usando tokens, variáveis e convenções do projeto

Não devemos:

- introduzir biblioteca visual paralela sem necessidade real
- usar estilos inline como padrão
- criar linguagem visual desconectada do restante da plataforma

### 3. Tokens e guidelines são obrigatórios

Toda tela deve usar variáveis de cor, espaçamento e tipografia já definidas.

Fontes de referência:

- `docs/architecture.md`
- `src/styles/tokens.css`
- estilos globais e componentes já consolidados no projeto

Boas práticas:

- priorizar classes e variáveis semânticas em vez de valores hardcoded
- reaproveitar padrões visuais já existentes antes de criar novos
- manter consistência de tipografia, estados, bordas, sombras e espaçamentos

### 4. Funcionalidade deve funcionar por padrão

Toda tela implementada deve ser funcional por padrão, mesmo antes da integração com backend.

Isso significa:

- interações principais funcionando no front-end
- estados de loading, empty, error e disabled previstos quando fizer sentido
- filtros, busca, tabs, drawers, accordions e formulários com comportamento real
- estrutura pronta para substituir mocks por dados reais no futuro

### 5. Preparar para futura integração com banco

Mesmo quando os dados ainda forem mockados, o código deve ser organizado para futura conexão com base real.

Padrão esperado:

- separar dados de interface de dados mockados sempre que possível
- preferir arquivos de dados, tipos e mapeadores em vez de arrays inline grandes dentro do componente
- modelar types e interfaces pensando em entidades reais da plataforma
- evitar acoplamento entre renderização e mock
- deixar componentes prontos para receber props, hooks de fetch ou dados vindos de serviços

Sempre que possível, pensar nas entidades reais:

- aluno
- turma
- módulo
- presença
- anexo
- justificativa
- usuário

### 6. Mobile-first e responsividade obrigatória

Toda implementação deve nascer mobile-first.

Isso inclui:

- layout pensado primeiro para telas pequenas
- adaptação progressiva para tablet e desktop
- controles fáceis de tocar
- hierarquia visual clara em telas menores
- sem dependência de hover para ação principal
- textos e espaçamentos legíveis em diferentes breakpoints

Antes de considerar uma tela pronta, verificar:

- mobile
- tablet
- desktop

### 7. Acessibilidade e clareza

Como a plataforma pode ser usada por usuários com baixa familiaridade tecnológica:

- priorizar interfaces simples e diretas
- evitar excesso de passos
- deixar a ação principal evidente
- usar labels claros
- manter contraste e tamanho de toque adequados
- usar feedback visual para sucesso, erro e estado atual

### 8. Animação com moderação

Animações podem ser usadas, mas devem ser leves e funcionais.

Padrão:

- transições curtas
- feedback de abertura e fechamento
- nada que atrapalhe velocidade de uso

Evitar:

- efeitos pesados
- animações longas
- movimento decorativo sem função

### 9. Componentes interativos devem ter estados completos

Todo componente interativo deve ser implementado com estados visuais e comportamentais necessários.

Exemplos comuns:

- button
- input
- select
- tabs
- checkbox
- textarea
- radio
- switch
- accordion
- card clicável

Sempre que aplicável, considerar:

- default
- hover
- focus
- focus-visible
- pressed ou active
- selected
- checked
- open
- disabled
- error

Regra de implementação:

- os estados devem seguir variáveis semânticas do projeto
- evitar cores e sombras hardcoded quando houver token equivalente
- o comportamento deve ser consistente entre mobile, tablet e desktop
- o estado principal não pode depender apenas de hover
- componentes de formulário devem comunicar claramente foco, erro e indisponibilidade

## Fluxo Padrão de Implementação

Ao receber um frame do Figma:

1. identificar a estrutura da tela e os componentes principais
2. mapear tokens e estilos necessários com base em `docs/architecture.md` e `src/styles/tokens.css`
3. implementar seguindo Tailwind e os componentes reutilizáveis
4. fazer a funcionalidade principal funcionar no front-end
5. estruturar os dados para futura integração com backend
6. ajustar responsividade para mobile, tablet e desktop
7. validar estados e interações

## Checklist Antes de Finalizar

- o layout segue o frame do Figma solicitado
- o estilo está consistente com o padrão do projeto
- cores e tipografias seguem os tokens definidos
- a funcionalidade principal funciona de verdade
- a estrutura facilita integração futura com banco
- a tela está responsiva em mobile, tablet e desktop
- os componentes interativos possuem estados visuais completos
- os estados de interface relevantes foram considerados
- os componentes estão consistentes com o restante da app

## Decisão Padrão Para Próximas Tarefas

Salvo instrução contrária da pessoa usuária, estas regras devem ser consideradas padrão para toda implementação nova no projeto.
