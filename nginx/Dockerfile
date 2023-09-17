FROM nginx:latest

      
# Remove the default NGINX configuration
#RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf
# Expose ports if needed (e.g., if you want to specify them in docker-compose.yml)
EXPOSE 80
EXPOSE 443

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
