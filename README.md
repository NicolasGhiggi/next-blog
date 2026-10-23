<p align="left">
  <img alt="header" src="https://shieldcn.dev/header/graph.svg?title=Next+Blog&amp;subtitle=Multi-user+Markdown+blog+platform+built+with+Next.js%2C+Auth0+and+shadcn%2Fui.&amp;logo=nextdotjs&amp;mode=dark&amp;align=left&amp;font=geist&amp;image=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1451187580459-43490279c0fa%3Fw%3D1600%26q%3D70%26fit%3Dcrop%26fm%3Djpg" />
</p>

A multi-user blogging platform: every user can have their own public profile and publish posts written in **Markdown**. Built with **Next.js** and **Auth0**, in a single **monorepo**. The UI is crafted _pixel perfect_ with **shadcn/ui** and **Tailwind CSS**.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
  - [User area](#user-area)
  - [General](#general)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Auth0 Setup](#auth0-setup)
- [Environment Variables](#environment-variables)
  - [Web app (`apps/web/.env.local`)](#web-app-appswebenvlocal)
- [Running in Development](#running-in-development)
- [Authentication Flow](#authentication-flow)
- [How Posts Work](#how-posts-work)
- [Application Areas](#application-areas)
- [Useful Scripts](#useful-scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Features

### User area

- Sign up and log in through Auth0 Universal Login
- First-access onboarding: choose a unique public username
- Profile management: first name, last name and profile picture
- Markdown editor with live preview
- Create, edit, draft and publish posts
- Public profile page and individual post pages

### General

- Responsive, consistent UI faithful to the designs (pixel perfect)
- Light/dark theme
- Safe Markdown rendering (output sanitization)
- Protected routes with server-side session checks

---

## Tech Stack

| Layer          | Technology                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Framework      | [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions), React, TypeScript    |
| UI             | [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)                        |
| Authentication | [Auth0](https://auth0.com/) with [`@auth0/nextjs-auth0`](https://github.com/auth0/nextjs-auth0) (v4) |
| User profile   | Auth0 Management API (via the `auth0` Node SDK)                                                      |
| Database       | PostgreSQL / MySQL, accessed through [Prisma](https://www.prisma.io/)                                |
| Validation     | [Zod](https://zod.dev/)                                                                              |
| Content        | Markdown                                                                                             |
| Tooling        | npm workspaces, [Turborepo](https://turbo.build/repo), ESLint, Prettier                              |

> There is no separate backend: server logic lives in Next.js Server Components, Server Actions and Route Handlers.

---

## Monorepo Structure

```
next-blog/
├── .github/
│   └── ISSUE_TEMPLATE/       # issue templates
├── apps/
│   └── web/                  # Next.js app: public site and user area
│       ├── app/              # routes (App Router)
│       ├── features/         # feature modules (e.g. features/auth)
│       ├── lib/              # shared server utilities (auth0 client, db)
│       └── proxy.ts          # session handling and route protection
├── packages/
│   └── ui/                   # shared shadcn/ui components (@workspace/ui)
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── package.json              # workspace root
├── turbo.json                # Turborepo pipeline
└── README.md
```

---

## Requirements

- **Node.js** >= 20
- **npm** (bundled with Node.js)
- **PostgreSQL** or **MySQL**
- An **Auth0** tenant (the free plan is enough)

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/NicolasGhiggi/next-blog.git
cd next-blog

# 2. Install dependencies
npm install

# 3. Create apps/web/.env.local and fill it in
#    (see "Auth0 Setup" and "Environment Variables" below)

# 4. Set up the database
cd apps/web
npx prisma migrate dev
```

---

## Auth0 Setup

You need **two** applications in your Auth0 tenant:

1. **Next Blog** (type _Regular Web Application_): handles user login.
   - Allowed Callback URLs: `http://localhost:3000/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
2. **Next Blog - Management API** (type _Machine to Machine_): used by the server to update user profiles.
   - Authorize it on the **Auth0 Management API**
   - Grant only the `read:users` and `update:users` permissions

When deploying, add the production URLs to the same Callback / Logout / Web Origins lists.

---

## Environment Variables

### Web app (`apps/web/.env.local`)

```bash
# Auth0 - Regular Web Application
AUTH0_SECRET=             # generate with: openssl rand -hex 32
APP_BASE_URL=http://localhost:3000
AUTH0_DOMAIN=your-tenant.eu.auth0.com
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# Auth0 - Machine to Machine (Management API)
AUTH0_MGMT_CLIENT_ID=
AUTH0_MGMT_CLIENT_SECRET=

# Database
DATABASE_URL=
```

`.env.local` is ignored by git (`.env*` in the root `.gitignore`). Never commit it and never expose these values through `NEXT_PUBLIC_*` variables.

---

## Running in Development

```bash
# from the repository root
npm run dev

# or only the web app (http://localhost:3000)
cd apps/web
npm run dev
```

---

## Authentication Flow

- Login and signup use the Auth0 **Universal Login**: `/auth/login` and `/auth/login?screen_hint=signup`
- The SDK manages the session cookie and the `/auth/*` routes (`login`, `callback`, `logout`)
- Each Auth0 user is linked to a record in the app database through the Auth0 user id (`sub`)
- On first access, users without a username are redirected to `/onboarding`
- Public profiles live at `/profile/[username]`, where the username is unique and stored in the app database
- Protection happens on two levels: `proxy.ts` for fast redirects, and server-side checks in layouts, pages, Server Actions and Route Handlers (the real security boundary)

---

## How Posts Work

Posts are stored as **Markdown** and rendered on the frontend.

- The editor produces Markdown text, which is saved as-is in the database
- When displayed, the Markdown is converted to HTML and **sanitized**
- Each post has: title, slug, Markdown content, status (`draft` / `published`), publication date and author

Example:

```markdown
# My first post

Welcome to my blog! Here I write about **web development** and everything I'm passionate about.

- I write in Markdown
- I publish with one click
```

---

## Application Areas

| Area           | Path                  | Access              |
| -------------- | --------------------- | ------------------- |
| Public site    | `/`                   | Everyone            |
| Public profile | `/profile/[username]` | Everyone            |
| Onboarding     | `/onboarding`         | Authenticated users |
| Settings       | `/settings`           | Authenticated users |
| User area      | `/dashboard`          | Authenticated users |

---

## Useful Scripts

From the repository root:

```bash
npm run dev       # start the development server
npm run build     # production build
npm run lint      # linting
```

From `apps/web`:

```bash
npx prisma migrate dev   # run migrations
npx prisma studio        # browse the database
```

---

## Roadmap

- [ ] Comments on posts
- [ ] Tags and categories
- [ ] Image uploads (profile picture and posts)
- [ ] Full-text search
- [ ] RSS feed for each user

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and guidelines, and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

Quick start:

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## Security

Please do **not** report security vulnerabilities through public issues. See [SECURITY.md](SECURITY.md) for how to report them privately.

---

## License

Distributed under the **MIT** license. See the [LICENSE](LICENSE) file for more details.