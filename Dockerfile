# force rebuild
FROM node:18-alpine

WORKDIR /usr/src/app
<<<<<<< Updated upstream

# Copy backend package files
COPY backend/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY backend/. .

<<<<<<< HEAD
=======
# 4) Expose and start
=======
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
>>>>>>> Stashed changes
>>>>>>> b291858 (Resolve Dockerfile conflict and update build configuration)
EXPOSE 3000
CMD ["node", "server.js"]
