# Testfuel Server

NestJS REST API for **Testfuel** — the test case management backend. Uses TypeORM with PostgreSQL for workspaces, projects, releases, suites, and test cases.

## Features

- **Account** — Registration, login, JWT auth, email confirmation
- **Workspace** — CRUD, members, access control
- **Project** — CRUD, scoped to workspaces
- **Release** — CRUD, linked to projects and suite IDs
- **Suite** — CRUD, archiving, linked to projects
- **Case** — CRUD, linked to suites
- **Mail** — Transactional email (e.g. verification) via Nodemailer

## Tech stack

- **NestJS 8**
- **TypeScript**
- **TypeORM** + **PostgreSQL**
- **Passport** + **JWT**
- **class-validator** / **class-transformer**
- **Nodemailer** (with Handlebars templates)

## Prerequisites

- Node.js v16+
- PostgreSQL

## Setup

```bash
npm install
```

Copy environment template and configure:

```bash
cp .env.example .env
```

Edit `.env` with at least:

- `SECRET_KEY` — Secret for JWT signing
- Database: either `DB_STRING` or `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- `CLIENT_URL` — Frontend origin (for CORS)
- Optionally `SMTP_USER` and `SMTP_PASSWORD` for email

Create the database (e.g. `createdb testfuel`), then run the app; TypeORM can create/sync tables in non-production when `NODE_ENV !== 'production'`.

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run start`   | Start app                |
| `npm run start:dev` | Start in watch mode   |
| `npm run start:prod` | Run production build  |
| `npm run build`   | Build for production     |
| `npm run test`    | Unit tests               |
| `npm run test:e2e` | E2E tests               |
| `npm run test:cov` | Test coverage           |
| `npm run lint`    | Lint and fix             |
| `npm run format`  | Prettier format          |

## Running the app

**Development (watch):**

```bash
npm run start:dev
```

**Production:**

```bash
npm run build
npm run start:prod
```

By default the API listens on the port set in your Nest/Node config (often 3000).

## Project structure (high level)

- `src/account/` — Auth, user, email confirmation
- `src/workspace/` — Workspaces and members
- `src/project/` — Projects
- `src/release/` — Releases
- `src/suite/` — Suites
- `src/case/` — Test cases
- `src/mail/` — Mail service and templates
- `src/app/` — App module, TypeORM config

## API overview

REST endpoints are grouped by resource (account, workspaces, projects, releases, suites, cases). Auth-protected routes use the `Authorization: Bearer <token>` header. See controller files under each module for exact paths and DTOs.

## License

Part of the Testfuel project. See root [README](../README.md).
