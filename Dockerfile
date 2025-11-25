# Use the official Nginx image as a base
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy custom content (optional)
COPY . .

# Document that the container will listen on port 80 (default for Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
