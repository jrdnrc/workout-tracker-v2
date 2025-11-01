# Setup Instructions

This guide will help you get the Workout Tracker app running locally.

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- A modern browser with WebAuthn support (Chrome, Firefox, Safari, Edge)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install GraphQL server dependencies
cd graphql
npm install
cd ..

# Install client dependencies
cd clients/workout-tracker
npm install
cd ../..
```

### 2. Configure Environment Variables

#### GraphQL Server

```bash
cd graphql
cp env.example .env
```

Edit `.env` and update values if needed (defaults should work for local development):
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `PORT`: Server port (default: 5000)
- `RP_NAME`: WebAuthn relying party name
- `RP_ID`: WebAuthn relying party ID (should match your domain, use "localhost" for local dev)
- `ORIGIN`: Frontend URL (default: http://localhost:5173)

#### Client

```bash
cd clients/workout-tracker
cp env.example .env
```

Edit `.env` if needed:
- `VITE_GRAPHQL_URL`: GraphQL server URL (default: http://localhost:5000/graphql)

### 3. Start PostgreSQL

```bash
# From the root directory
npm run db:up
```

Wait for PostgreSQL to be ready (about 10 seconds).

### 4. Run Database Migrations

```bash
npm run db:migrate
```

This will:
- Create all necessary tables (users, exercises, workouts, sets, etc.)
- Set up Row Level Security (RLS) policies
- Configure WebAuthn credential storage

### 5. Start the GraphQL Server

In a new terminal:

```bash
npm run dev:graphql
```

The server will start on http://localhost:5000
- GraphQL endpoint: http://localhost:5000/graphql
- GraphiQL interface: http://localhost:5000/graphiql

### 6. Start the Frontend

In another terminal:

```bash
npm run dev:client
```

The app will start on http://localhost:5173

### 7. Register and Login

1. Open http://localhost:5173 in your browser
2. Click "Register" to create a new account
3. Enter your email and username
4. Your browser will prompt you to use biometric authentication (Face ID, Touch ID, fingerprint, etc.)
5. Complete the biometric setup
6. You'll be automatically logged in!

## Using the App

### Dashboard
- View workout statistics
- Quick access to recent workouts
- Quick action buttons

### Exercises
- Create and manage your exercise library
- Add descriptions, categories, and muscle groups
- Delete exercises you no longer need

### Workouts
- Create new workouts
- View workout history
- Track completion status

### Workout Logging
- Add exercises to your workout
- Log sets with weight, reps, and RPE (Rate of Perceived Exertion)
- Mark sets and workouts as complete
- View all workout details

## WebAuthn / Biometric Authentication

This app uses WebAuthn for passwordless authentication. Benefits:
- **Secure**: No passwords to steal or forget
- **Convenient**: Use Face ID, Touch ID, Windows Hello, or other biometric methods
- **Fast**: Login with a single touch or glance
- **Multi-device**: Register multiple devices for the same account

## Development Tips

### GraphiQL Interface
Access the GraphiQL interface at http://localhost:5000/graphiql to:
- Explore the GraphQL schema
- Test queries and mutations
- View documentation

### GraphQL Codegen
After making changes to the GraphQL schema, regenerate TypeScript types:

```bash
cd clients/workout-tracker
npm run codegen
```

### Database Management

Stop the database:
```bash
npm run db:down
```

Start the database:
```bash
npm run db:up
```

### Resetting the Database

If you need to start fresh:

```bash
# Stop and remove the database
npm run db:down
docker volume rm wotrack2_postgres-data

# Start fresh
npm run db:up
npm run db:migrate
```

## Troubleshooting

### WebAuthn Not Working
- Ensure you're using HTTPS or localhost (WebAuthn requires secure context)
- Check that your browser supports WebAuthn
- Verify your device has biometric authentication enabled

### Database Connection Errors
- Ensure PostgreSQL is running: `docker ps`
- Check the `DATABASE_URL` in `graphql/.env`
- Wait a few seconds after starting PostgreSQL before running migrations

### GraphQL Errors
- Check the GraphQL server logs
- Verify your JWT token is valid (check browser localStorage)
- Ensure RLS policies are properly configured

### Port Conflicts
If ports 5000 or 5173 are already in use:
- Change `PORT` in `graphql/.env`
- Update `VITE_GRAPHQL_URL` in `clients/workout-tracker/.env`
- Update `vite.config.ts` to use a different port

## Next Steps

- Add more exercises to your library
- Start logging your workouts
- Track your progress over time
- Customize the app to fit your training style

Enjoy tracking your workouts! 💪

