# Stage 1: Build
FROM node:20-alpine AS buil

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:alpin

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]