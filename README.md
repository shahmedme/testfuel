# Testfuel

**Testfuel** is an open source test case management system for software development teams. Organize test suites, track releases, and collaborate with your team in workspaces and projects.

## Features

- **Workspaces** — Team spaces with member access and multiple projects
- **Projects** — Group test suites and releases by product or service
- **Releases** — Define releases and associate test suites for test runs
- **Suites** — Organize test cases into suites; support for archiving
- **Test cases** — Create and manage individual test cases within suites
- **Authentication** — JWT-based auth with email verification
- **Multi-tenant** — Workspace-based isolation and access control

## Project structure

| Package   | Description |
|----------|-------------|
| **client**  | React web app — main application UI |
| **server**  | NestJS API — REST API, PostgreSQL, TypeORM |
| **landing** | Next.js marketing/landing site |

## Tech stack

- **Client:** React 18, TypeScript, Redux Toolkit, TanStack Query, React Router, Ant Design, Tailwind CSS
- **Server:** NestJS 8, TypeScript, TypeORM, PostgreSQL, Passport JWT, Nodemailer
- **Landing:** Next.js, React, SASS, Framer Motion

## Prerequisites

- **Node.js** (v16+)
- **PostgreSQL** (for the API)
- **npm** or **yarn**

## Quick start

### Docker Compose (local)

Start PostgreSQL separately (lives outside this repo at `~/Projects/postgres`), then run the app:

```bash
~/Projects/postgres/start.sh
docker compose --env-file .env up --build
```

Copy `.env.example` to `.env` and set your database credentials.

Services:

| Service | URL |
|---------|-----|
| Client app | http://localhost:3000 |
| Landing site | http://localhost:3001 |
| API server | http://localhost:8000 |

PostgreSQL is managed in a separate project (`~/Projects/postgres`). Each app connects with its own database/user on that shared instance.

### Production

PostgreSQL must already be running on the server (see `~/Projects/postgres`).

#### GitHub Actions (recommended)

Manual deploy from the `revamp` branch (no merge to `main` required yet):

1. **One-time server setup**
   ```bash
   git clone -b revamp https://github.com/<org>/testfuel.git ~/testfuel
   cd ~/testfuel
   cp .env.production.example .env.production
   # Edit .env.production with production secrets (DB, SECRET_KEY, etc.)
   ```

2. **GitHub repository secrets** (Settings → Secrets and variables → Actions)

   | Secret | Example |
   |--------|---------|
   | `PRODUCTION_HOST` | `155.133.27.10` |
   | `PRODUCTION_USER` | `root` |
   | `PRODUCTION_SSH_PRIVATE_KEY` | Contents of your SSH private key |
   | `PRODUCTION_APP_DIR` | `~/testfuel` (optional) |

3. **Run deploy** — Actions → **Deploy to Production** → **Run workflow**
   - **Use workflow from:** branch that contains this workflow (e.g. `revamp`)
   - **Git branch to deploy to production:** any branch you want on the server (e.g. `revamp`, `main`, or a feature branch)

The workflow SSHs into the production server, runs `git fetch` + `git reset` to the branch you chose, then builds and starts Docker containers on the server.

#### Local deploy (optional)

```bash
SSH_PASSWORD=your-password ./scripts/deploy.sh
```

Create `.env.production` from `.env.production.example` before first deploy.

### 1. Clone and install

```bash
git clone https://github.com/your-org/testfuel.git
cd testfuel
```

### 2. Server (API)

```bash
cd server
cp .env.example .env
# Edit .env: set SECRET_KEY, DB_STRING (or DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME), CLIENT_URL, SMTP if needed
npm install
npm run start:dev
```

API runs at `http://localhost:3000` (or the port in your config).

### 3. Client (web app)

```bash
cd client
npm install
# Create .env with REACT_APP_API_URL pointing to your server (e.g. http://localhost:3000)
npm run dev
```

App runs at `http://localhost:3000` (or the port React assigns).

### 4. Landing (optional)

```bash
cd landing
npm install
npm run dev
```

Landing runs at `http://localhost:3001` by default.

## Environment variables

### Server (`server/.env`)

| Variable     | Description |
|-------------|-------------|
| `SECRET_KEY` | JWT signing secret |
| `DB_STRING`  | Full PostgreSQL connection string (alternative to below) |
| `DB_HOST`    | PostgreSQL host (default: localhost) |
| `DB_PORT`    | PostgreSQL port (default: 5432) |
| `DB_USERNAME` | DB user |
| `DB_PASSWORD` | DB password |
| `DB_NAME`    | Database name (e.g. testfuel) |
| `CLIENT_URL` | Frontend origin for CORS (e.g. https://app.testfuel.io) |
| `SERVER_ENV` | Set when running server (e.g. true) |
| `SMTP_USER` / `SMTP_PASSWORD` | For email (e.g. verification emails) |

### Client (`client/.env`)

| Variable            | Description |
|--------------------|-------------|
| `REACT_APP_SERVICE_URL` | Base URL of the Testfuel API |

## Contributing

Contributions are welcome. Please open an issue or pull request on the repository.

## License

See [LICENSE](LICENSE) in the repository.
