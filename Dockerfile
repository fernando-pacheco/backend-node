FROM node:20-slim

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm add typescript ts-node @types/node @types/fastify --save-dev

RUN pnpm exec tsc

EXPOSE 3333

CMD ["node", "dist/server.js"]
