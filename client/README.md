# Testfuel Client

React web application for **Testfuel** — the test case management UI. Built with Create React App, TypeScript, Redux, and TanStack Query.

## Features

- Workspace and project management
- Test suites and test cases
- Releases and test runs
- User authentication (login, signup, email verification)
- Workspace members and access
- Settings: profile, security, billing, integrations, notifications

## Tech stack

- **React 18** + **TypeScript**
- **Redux Toolkit** + **React Query (TanStack Query)**
- **React Router v6**
- **Ant Design** + **Tailwind CSS** + **SASS**
- **Axios** for API calls
- **Formik** for forms

## Prerequisites

- Node.js v16+
- A running Testfuel API (see [server README](../server/README.md))

## Setup

```bash
npm install
```

Create a `.env` (and optionally `.env.development`) with:

```env
REACT_APP_API_URL=http://localhost:3000
```

Replace with your actual API base URL.

## Scripts

| Command       | Description                |
|---------------|----------------------------|
| `npm run dev` | Start dev server           |
| `npm run build` | Production build         |
| `npm run test`  | Run tests               |
| `npm run eject`  | Eject CRA (irreversible) |

## Development

```bash
npm run dev
```

The app will open at `http://localhost:3000` (or the next available port). Ensure the Testfuel server is running and `REACT_APP_API_URL` points to it.

## Project structure (high level)

- `src/pages/` — Route-level pages (home, login, project, settings, etc.)
- `src/components/` — Shared UI (Layout, Navbar, Suite, etc.)
- `src/services/` — API clients (auth, project, release, workspace)
- `src/store/` — Redux slices (auth, misc)
- `src/hooks/` — Custom hooks (e.g. useAuth, useBreadcrumb)
- `src/lib/` — Reusable components (Button, Input, Modal, etc.)
- `src/types/` — TypeScript types

## License

Part of the Testfuel project. See root [README](../README.md).
