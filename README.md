# Customer Management System

Portfolio React project for a small fitness studio customer management system.

<div align="center">
  <img src="./public/user center.png" width="400px" alt="Customer Management System screenshot" />
</div>

## Demo

Live site: [Customer Management System](https://yahappylemon.github.io/user-center/auth?mode=login)

The original Spring Boot backend is no longer available, so the public site now runs in demo mode with local browser data.

Demo account:

- Username: `demo`
- Password: `Demo1234`

Demo mode supports login, customer search, pagination, create/edit/delete, statistics, theme switching, and resetting demo data from the User Center page.

## Features

- User login, registration, username update, and logout flow.
- Customer CRUD with search and pagination.
- Dashboard charts for gender, acquisition channel, and monthly first-lesson trends.
- Three theme palettes stored in localStorage.
- Responsive layout for desktop, tablet, and mobile screens.
- Demo data layer backed by localStorage, so the app remains usable without the original backend.

## Tech Stack

- React
- React Router
- Redux Toolkit
- Axios
- MUI and MUI X Charts
- Vite

The original full-stack version used Spring Boot, MySQL, and MyBatis on the backend. This repository now focuses on the frontend portfolio experience.

## Local Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Tests:

```bash
npm run test:unit
npm run test:e2e
```

Run all checks:

```bash
npm run check
```

Security audit:

```bash
npm audit
```

## API Mode

The app defaults to demo mode:

```bash
VITE_API_MODE=demo
```

To connect a real backend, provide both values:

```bash
VITE_API_MODE=real
VITE_API_BASE_URL=https://your-api.example.com
```
