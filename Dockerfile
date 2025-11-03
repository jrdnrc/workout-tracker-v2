FROM node:24-alpine AS base
WORKDIR /app

FROM base AS node-builder
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS graphql
CMD ["node", "dist/index.js"]
COPY --from=node-builder /app/dist dist

FROM nginx:alpine AS app
COPY --from=node-builder /app/dist /usr/share/nginx/html