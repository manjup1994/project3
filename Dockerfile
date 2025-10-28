# force rebuild
FROM node:18-alpine

# All app files will live here in the image
WORKDIR /usr/src/app

# 1) Copy only backend package files first (better layer caching)
COPY backend/package*.json ./

# 2) Install only production deps
RUN npm install --omit=dev

# 3) Copy the rest of the backend source
COPY backend/. .

# 4) Expose and start
EXPOSE 3000
CMD ["node", "server.js"]
