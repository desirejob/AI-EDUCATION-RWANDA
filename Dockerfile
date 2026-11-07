FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends poppler-utils && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json ./
COPY server.mjs ./
COPY auth.mjs ./
COPY scripts ./scripts
COPY web ./web
COPY data ./data
COPY eval ./eval
COPY docs ./docs
RUN mkdir -p /var/lib/umuseke/uploads && chown -R node:node /var/lib/umuseke
ENV PORT=8080 APP_DATA_DIR=/var/lib/umuseke AUTH_DATA_DIR=/var/lib/umuseke NODE_ENV=production
VOLUME ["/var/lib/umuseke"]
EXPOSE 8080
USER node
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:8080/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
