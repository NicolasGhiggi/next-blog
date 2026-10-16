# Security Policy

Thank you for helping keep **next-blog** and its users safe.

## Supported Versions

next-blog is under active development and has no versioned releases yet.
Security fixes are applied to the latest code on the `main` branch only.

| Version         | Supported |
| --------------- | --------- |
| `main` (latest) | ✅        |
| Older commits   | ❌        |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public issues, pull requests or discussions.**

Use GitHub's private vulnerability reporting instead:

1. Go to the [Security tab](https://github.com/NicolasGhiggi/next-blog/security) of the repository.
2. Click **Report a vulnerability**.
3. Fill in the form with as much detail as you can.

Direct link: <https://github.com/NicolasGhiggi/next-blog/security/advisories/new>

### What to include

- A clear description of the issue and its potential impact
- Steps to reproduce (a proof of concept is very helpful)
- The affected route, component or file (e.g. `apps/web/proxy.ts`)
- Your environment (browser, Node.js version, database) if relevant
- Any suggested fix or mitigation

### What to expect

- **Acknowledgement** within 5 business days
- **Initial assessment** and severity evaluation within 10 business days
- Regular updates on progress until the issue is resolved
- Credit in the release notes or advisory, if you wish

This is a personal open-source project, so response times are best-effort.

## Scope

Areas of particular interest:

- Authentication and session handling (Auth0 integration, `proxy.ts`, session cookies)
- Authorization flaws, e.g. editing or deleting another user's posts or profile
- Cross-site scripting (XSS) via Markdown rendering or user-supplied profile data
- Injection flaws (SQL, via Prisma or raw queries)
- Server Actions and Route Handlers lacking server-side checks
- Exposure of secrets or server-only environment variables

Out of scope:

- Vulnerabilities in third-party services (Auth0, hosting providers, databases): please report them to the respective vendor
- Issues requiring physical access to a user's device
- Social engineering, spam or denial-of-service through sheer traffic volume
- Reports from automated scanners without a demonstrated impact
- Missing best-practice headers or settings with no practical exploit

## Disclosure Policy

Please give us a reasonable amount of time to investigate and fix the issue before any public disclosure. We follow coordinated disclosure: once a fix is available, we will publish a security advisory describing the issue.

## Safe Harbor

If you act in good faith, avoid privacy violations, data destruction and service disruption, and only test against your own local instance or accounts, we will not pursue legal action against you for your research.

## Security Notes for Contributors and Deployers

- Never commit `.env*` files, Auth0 client secrets or database credentials.
- Never expose secrets through `NEXT_PUBLIC_*` variables.
- Grant the Auth0 Machine to Machine application only the permissions it needs (`read:users`, `update:users`).
- Authorization must always be enforced server-side (layouts, pages, Server Actions, Route Handlers); `proxy.ts` is only a first line of defence.
- Markdown output must always be sanitized before rendering.
- If you suspect a secret has leaked, rotate it immediately.
