import express from 'express';
import { postgraphile } from 'postgraphile';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthPlugin } from './auth-plugin.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// PostgreSQL connection string
const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://wotrack:wotrack@localhost:5432/wotrack';

// Postgraphile middleware
app.use(
  postgraphile(DATABASE_URL, 'public', {
    watchPg: process.env.NODE_ENV === 'development',
    graphiql: process.env.NODE_ENV === 'development',
    enhanceGraphiql: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: process.env.NODE_ENV === 'development',
    extendedErrors: ['hint', 'detail', 'errcode'],
    appendPlugins: [AuthPlugin],
    enableQueryBatching: true,
    exportGqlSchemaPath:
      process.env.NODE_ENV === 'development'
        ? 'schema.graphql'
        : undefined,
    pgSettings: async (req) => {
      const settings: Record<string, string> = {};

      // Extract JWT token from Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const decoded = jwt.verify(token, JWT_SECRET) as {
            user_id: string;
            email: string;
          };
          // Set user_id in postgres session for RLS
          settings['jwt.claims.user_id'] = decoded.user_id;
        } catch (error) {
          // Invalid token, continue without setting user_id
          console.error('Invalid JWT token:', error);
        }
      }

      return settings;
    },
  })
);

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 GraphiQL available at http://localhost:${PORT}/graphiql`);
  }
});

