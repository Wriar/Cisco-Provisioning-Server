FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production \
    DATA_FILE=/app/src/data/data.json \
    IS_DEBUG=false \
    PORT=6970

COPY package*.json ./
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*
RUN npm ci --omit=dev && npm cache clean --force

COPY . .
RUN cp -a src/data /app/src/data-seed \
    && chmod +x docker/entrypoint.sh

EXPOSE 6970
VOLUME ["/app/src/data"]

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["node", "src/server.js"]
