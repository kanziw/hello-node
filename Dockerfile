FROM node:14.4.0-stretch-slim as builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src src
RUN npm run build


FROM node:14.4.0-stretch-slim

LABEL maintainer="kanziwoong@gmail.com"

ENV NODE_ENV production
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist dist

ENTRYPOINT ["node"]
CMD ["dist", "index.js"]
