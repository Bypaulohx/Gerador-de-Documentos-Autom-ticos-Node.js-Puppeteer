FROM node:18-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates fonts-liberation libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libnss3 libx11-xcb1 libx11-6 wget gnupg unzip \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/server.js"]
