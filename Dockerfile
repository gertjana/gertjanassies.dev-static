FROM ghcr.io/getzola/zola:v0.22.1 AS builder
WORKDIR /site
COPY . .
RUN zola build

FROM nginx:alpine
COPY --from=builder /site/public /usr/share/nginx/html
EXPOSE 80
