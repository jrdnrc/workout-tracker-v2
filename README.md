# Workout Tracker

A modern workout tracking and logging application geared towards strength training, with multi-user support and WebAuthn/biometric authentication.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Postgraphile
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: WebAuthn (biometric/passkey support)
- **API**: GraphQL with Apollo Client and code generation

## Project Structure

```
wotrack2/
├── clients/
│   └── workout-tracker/     # React frontend app
├── graphql/                 # GraphQL server with Postgraphile
└── docker-compose.yml       # PostgreSQL database
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- A WebAuthn-compatible browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment files and configure:
```bash
cp graphql/env.example graphql/.env
cp clients/workout-tracker/env.example clients/workout-tracker/.env
```

3. Start PostgreSQL:
```bash
npm run db:up
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start the GraphQL server (in one terminal):
```bash
npm run dev:graphql
```

6. Start the frontend (in another terminal):
```bash
npm run dev:client
```

7. Open your browser to `http://localhost:5173`

## Development

- **Frontend**: `npm run dev:client` (http://localhost:5173)
- **GraphQL**: `npm run dev:graphql` (http://localhost:5000/graphql)
- **Database**: `npm run db:up` / `npm run db:down`
- **Migrations**: `npm run db:migrate`
- **Codegen**: `cd clients/workout-tracker && npm run codegen`

## Features

- WebAuthn/biometric authentication (passwordless login)
- Exercise library management
- Workout planning and logging
- Set tracking (weight, reps, RPE)
- Workout history
- Multi-user support with RLS for data security

