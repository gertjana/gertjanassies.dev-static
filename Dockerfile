FROM debian:bookworm-slim AS builder

RUN apt-get update && apt-get install -y curl tar && \
    curl -sL https://github.com/getzola/zola/releases/download/v0.22.1/zola-v0.22.1-x86_64-unknown-linux-gnu.tar.gz \
    | tar xz -C /usr/local/bin

WORKDIR /site
COPY . .
RUN zola build

FROM nginx:alpine
COPY --from=builder /site/public /usr/share/nginx/html
EXPOSE 80
