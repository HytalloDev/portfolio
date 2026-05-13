# Portfolio — Atelodoros

Portfolio pessoal construído com Next.js 15, Tailwind CSS e shadcn/ui. Exibe automaticamente os repositórios públicos do GitHub.

## Stack

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **GitHub API** (pública, com suporte a token)

## Rodando localmente

```bash
# Instalar dependências
npm install

# (Opcional) Criar arquivo de ambiente para aumentar o rate limit do GitHub
cp .env.example .env.local
# Edite .env.local e adicione seu GITHUB_TOKEN

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

### Opção 1 — Via Vercel CLI (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy (seguir instruções interativas)
vercel

# Deploy para produção
vercel --prod
```

### Opção 2 — Via GitHub + Vercel Dashboard

1. Faça push deste projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**
3. Importe o repositório
4. (Opcional) Adicione a variável de ambiente `GITHUB_TOKEN`
5. Clique em **Deploy**

## Variáveis de Ambiente

| Variável | Obrigatório | Descrição |
|---|---|---|
| `GITHUB_TOKEN` | Não | Personal Access Token do GitHub para aumentar o rate limit (5000 req/h vs 60 req/h) |

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx       # Layout raiz com Navbar e Footer
│   ├── page.tsx         # Página principal (Server Component)
│   ├── globals.css      # Estilos globais + variáveis CSS shadcn
│   ├── error.tsx        # Error boundary
│   ├── loading.tsx      # Loading state
│   └── not-found.tsx    # 404
├── components/
│   ├── ui/              # Componentes shadcn (Badge, Button, Card, Separator)
│   └── sections/        # Seções da página (Navbar, Hero, Projects, Contact, Footer)
├── lib/
│   ├── github.ts        # Funções de fetch da GitHub API
│   └── utils.ts         # Utilitários (cn, formatDate)
└── types/
    └── github.ts        # Tipos TypeScript para GitHub API
```
