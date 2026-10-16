# Contributing to next-blog

Thanks for your interest in contributing! Every contribution is welcome: bug reports, feature ideas, documentation improvements and code.

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of Contents

- [Ways to contribute](#ways-to-contribute)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)
- [Reporting security issues](#reporting-security-issues)
- [Development setup](#development-setup)
- [Project structure](#project-structure)
- [Workflow](#workflow)
- [Code guidelines](#code-guidelines)
- [Commit messages](#commit-messages)
- [Pull request checklist](#pull-request-checklist)
- [License](#license)

## Ways to contribute

- Report bugs or suggest improvements
- Pick an item from the [Roadmap](README.md#roadmap) (comments, tags and categories, image uploads, full-text search, RSS feed)
- Improve documentation
- Review open pull requests

For anything non-trivial, please **open an issue first** so we can agree on the approach before you invest time in the code.

## Reporting bugs and requesting features

Use the [issue templates](https://github.com/NicolasGhiggi/next-blog/issues/new/choose). Search existing issues first to avoid duplicates.

A good bug report includes steps to reproduce, expected vs. actual behavior, and your environment (OS, Node.js version, browser, database).

## Reporting security issues

**Do not open a public issue for security vulnerabilities.** Follow the instructions in [SECURITY.md](SECURITY.md).

## Development setup

### Requirements

- Node.js >= 20
- PostgreSQL or MySQL
- An Auth0 tenant (the free plan is enough)

### Steps

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/next-blog.git
cd next-blog

# 2. Install dependencies
npm install

# 3. Configure environment variables
#    Create apps/web/.env.local (see "Environment Variables" in the README)

# 4. Set up the database
cd apps/web
npx prisma migrate dev

# 5. Start the dev server (http://localhost:3000)
cd ../..
npm run dev
```

See the [README](README.md) for the full Auth0 setup (two applications: Regular Web Application and Machine to Machine).

> Never commit `.env*` files or secrets.

## Project structure

```
apps/web/        Next.js app (App Router, Server Actions, Route Handlers)
  app/           routes
  features/      feature modules (e.g. features/auth)
  lib/           shared server utilities (Auth0 client, db)
  proxy.ts       session handling and route protection
packages/ui/     shared shadcn/ui components (@workspace/ui)
```

## Workflow

1. Fork the repository
2. Create a branch from `main`:
   ```bash
   git checkout -b feature/short-description   # new features
   git checkout -b fix/short-description       # bug fixes
   git checkout -b docs/short-description      # documentation
   ```
3. Make your changes, keeping each pull request focused on a single concern
4. Run the checks locally (see the checklist below)
5. Commit and push your branch
6. Open a Pull Request against `main`, describing **what** changed and **why**, and linking the related issue (e.g. `Closes #12`)

## Code guidelines

- **TypeScript**: avoid `any`; type props, return values and server action inputs.
- **Formatting and linting**: the project uses ESLint and Prettier. Run `npm run lint` and format your code before committing.
- **Validation**: validate all external input (forms, Server Actions, Route Handlers) with [Zod](https://zod.dev/).
- **Security**:
  - Enforce authentication and authorization **server-side**; `proxy.ts` is not a security boundary.
  - Always sanitize rendered Markdown.
  - Never expose secrets via `NEXT_PUBLIC_*` variables.
- **UI**: use shadcn/ui components and Tailwind CSS. Shared components belong in `packages/ui`. Respect the existing designs (pixel perfect), responsive behavior and light/dark theme.
- **Database**: schema changes must come with a Prisma migration and should work on both PostgreSQL and MySQL.
- **Dependencies**: avoid adding new ones unless clearly needed, and explain why in the PR.

## Commit messages

Write clear, concise messages in the imperative mood:

```
Add draft/publish toggle to the post editor
Fix username uniqueness check on onboarding
Docs: clarify Auth0 callback URLs
```

Keep the first line under ~72 characters and add a body if the reason for the change isn't obvious.

## Pull request checklist

Before requesting a review, make sure that:

- [ ] The PR addresses a single issue or feature
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] The app works locally, including the affected flows (logged in and logged out)
- [ ] New or changed behavior is covered by tests, if the area has tests
- [ ] Documentation (README, comments) is updated where needed
- [ ] No secrets, `.env` files or unrelated changes are included
- [ ] UI changes include screenshots (light and dark theme, mobile and desktop)

A maintainer will review your PR as soon as possible. You may be asked to make changes; please be patient, it is all part of keeping the project healthy.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
