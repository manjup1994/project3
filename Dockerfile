# Use Node.js 18 lightweight image
FROM node:18-alpine
# Set working directory
WORKDIR /usr/src/app
# Copy package files from backend folder
COPY backend/package*.json ./
# Install dependencies (production only)
RUN npm install --omit=dev
# Copy backend source code
COPY backend/ .
# Expose port
EXPOSE 3000
# Start the server
CMD ["node", "server.js"]
