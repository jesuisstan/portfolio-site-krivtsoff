# Use the official Node.js v18.16.0 image as the base image
FROM node:18.16.0

# Set the working directory to /app
WORKDIR /app

# Copy the package.json to the container
COPY package.json ./

# Install serve locally in the project folder
RUN npm install serve

# Install npm packages
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose the port that serve will use (must match the port specified in your npm run build command)
EXPOSE 7777

# Start the React app
CMD ["npm", "run", "build"]