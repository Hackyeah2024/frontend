# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only for building
# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the production node_modules and built app from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
# Expose the necessary port
EXPOSE 3000

# Set the command to start the app
CMD ["npm", "start"]
