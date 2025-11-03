FROM node:24-alpine AS node-runtime

WORKDIR /app

CMD ["npm", "run", "start"]

COPY package.json .
RUN npm install

COPY . .

RUN npm run build