# force rebuild
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy backend package files
COPY backend/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY backend/. .

EXPOSE 3000
CMD ["node", "server.js"]
