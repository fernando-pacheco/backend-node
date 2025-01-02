FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g pnpm

WORKDIR /usr/src/backend-node

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma migrate deploy
RUN pnpm generate
RUN pnpm build

EXPOSE 3333

CMD ["node", "dist/server.js"]
