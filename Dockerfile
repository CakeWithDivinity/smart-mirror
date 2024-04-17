FROM node:lts AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm@^8.0.0

RUN pnpm install

RUN pnpm build
FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

