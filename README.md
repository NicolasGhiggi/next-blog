# next-blog

A multi-user blogging platform: every user can have their own blog and publish posts written in **Markdown**. Frontend built with **Next.js**, backend with **Laravel**, all in a single **monorepo**. The UI is crafted *pixel perfect* with **shadcn/ui** and **Tailwind CSS**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running in Development](#running-in-development)
- [How Posts Work](#how-posts-work)
- [Application Areas](#application-areas)
- [Useful Scripts](#useful-scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User area

- Sign up, log in and profile management
- Create and customize your own blog
- Markdown editor with live preview
- Create, edit, draft and publish posts
- Public blog page and individual post pages

### Admin area

- Dashboard with overall statistics
- User management (view, suspend, roles)
- Blog and post management and moderation
- Handling of reported content

### General

- Responsive, consistent UI faithful to the designs (pixel perfect)
- Light/dark theme
- Safe Markdown rendering (output sanitization)
- Documented REST API

---

## Tech Stack

| Layer          | Technology                                                                       |
| -------------- | -------------------------------------------------------------------------------- |
| Frontend       | [Next.js](https://nextjs.org/) (App Router), React, TypeScript                   |
| UI             | [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)    |
| Backend        | [Laravel](https://laravel.com/) (PHP)                                            |
| Database       | MySQL / PostgreSQL                                                               |
| Authentication | Laravel Sanctum                                                                  |
| Content        | Markdown                                                                         |

---

## Monorepo Structure

```text
next-blog/
├── apps/
│   ├── web/          # Next.js: public site, user area and admin area
│   └── api/          # Laravel: REST API, authentication, business logic
├── packages/         # (optional) shared types, configs, utilities
├── .gitignore
├── package.json      # workspace root
└── README.md
```

---

## Requirements

- **Node.js** >= 20
- **npm**, **pnpm** or **yarn**
- **PHP** >= 8.2
- **Composer** >= 2
- **MySQL** or **PostgreSQL**

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/NicolasGhiggi/next-blog.git
cd next-blog

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd apps/api
composer install
cp .env.example .env
php artisan key:generate

# 4. Configure the database in apps/api/.env, then:
php artisan migrate --seed
```

---

## Environment Variables

### Backend (`apps/api/.env`)

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=next_blog
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Running in Development

In two separate terminals:

```bash
# Backend (http://localhost:8000)
cd apps/api
php artisan serve

# Frontend (http://localhost:3000)
cd apps/web
npm run dev
```

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

| Area        | Path          | Access                 |
| ----------- | ------------- | ---------------------- |
| Public site | `/`           | Everyone               |
| Public blog | `/[blog]`     | Everyone               |
| User area   | `/dashboard`  | Authenticated users    |
| Admin area  | `/admin`      | Administrators only    |

---

## Useful Scripts

```bash
# Frontend
npm run dev        # start the development server
npm run build      # production build
npm run lint       # linting

# Backend
php artisan serve          # start the server
php artisan migrate        # run migrations
php artisan db:seed        # seed the database
php artisan test           # run tests
```

---

## Roadmap

- [ ] Comments on posts
- [ ] Tags and categories
- [ ] Image uploads in posts
- [ ] Full-text search
- [ ] RSS feed for each blog
- [ ] Custom domains for blogs

---

## Contributing

Contributions are welcome!

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

Distributed under the **MIT** license. See the `LICENSE` file for more details.
