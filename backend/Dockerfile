FROM node:lts-alpine as base

FROM base AS deps
RUN corepack enable
WORKDIR /app
COPY package.json package-lock.json ./


FROM base AS build
ENV NODE_ENV=production
RUN corepack enable && npm install -g @nestjs/cli
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm run build

FROM base
ENV NODE_ENV=production
WORKDIR /app
# Copying the package.json is necessary to set the type to module
COPY package.json ./
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 8080
CMD ["node", "./dist/src/main.js"]
