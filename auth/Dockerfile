FROM node:20-alpine

WORKDIR /usr/src/app

#RUN npm install -g pnpm

#COPY package.json pnpm-lock.yaml ./

#RUN pnpm install

COPY package*.json .

RUN npm install

COPY . .

RUN rm -rf dist && npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_NAME=mydb
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_AUTH_SOURCE=admin
ENV ACCESS_JWT_KEY=secret

CMD ["node", "dist/app.js"]