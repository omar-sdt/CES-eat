FROM node:23.3

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Install typescript
RUN npm install -g typescript

# Install app dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

# Bundle app source
COPY . .

# Delete the existing build directory
RUN rm -rf ./dist

# Build the application
RUN tsc

# Run in production mode
ENV NODE_ENV=production
ENV PORT=4000
ENV DB_NAME=mydb
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_AUTH_SOURCE=admin
ENV ACCESS_JWT_KEY=secret

# Start the application
CMD [ "node", "dist/app.js" ]
