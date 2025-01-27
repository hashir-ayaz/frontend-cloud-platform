# Use Node.js 18 for the build and serve step
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the frontend for production
RUN npm run build

# Expose the Vite preview server port
EXPOSE 4173

# Use Vite's preview command to serve the built app
CMD ["npm", "run", "preview"]
