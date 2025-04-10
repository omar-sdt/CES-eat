FROM node:23.3

# Create app directory
WORKDIR /usr/src/app

# Install pnpm & typescript globally
RUN npm install -g pnpm typescript

# Copy package files & install dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

# Copy the rest of the app
COPY . .

# Delete previous build
RUN rm -rf ./dist

# Build the TypeScript app
RUN tsc

# Optional seed step
ARG SHOULD_SEED=false
RUN if [ "$SHOULD_SEED" = "true" ]; then pnpm run seed; fi

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DB_NAME=mydb
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_AUTH_SOURCE=admin
ENV MONGO_DB_HOST=mongo
ENV MONGO_DB_NAME=mydb
ENV MONGO_DB_USER=root
ENV MONGO_DB_PASS=root
ENV MONGO_DB_AUTH_SOURCE=admin
ENV ACCESS_JWT_KEY=secret

# Start the application
CMD [ "node", "dist/app.js" ]