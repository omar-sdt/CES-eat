FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk add --no-cache dos2unix
RUN dos2unix wait-for-it.sh && chmod +x wait-for-it.sh

RUN npx prisma generate
RUN rm -rf dist && npm run build

ENV PORT=3000
ENV MONGO_DB_HOST=127.0.0.1
ENV MONGO_DB_NAME=mydb
ENV MONGO_DB_USER=root
ENV MONGO_DB_PASS=root
ENV MONGO_DB_AUTH_SOURCE=admin
ENV ACCESS_JWT_KEY=secret
ENV DATABASE_URL="postgresql://root:root@postgres:5432/base?schema=public"

CMD ["sh", "-c", "./wait-for-it.sh postgres:5432 -- npx prisma migrate deploy && node dist/app.js"]