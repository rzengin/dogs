# Build Stage
FROM node:20-alpine AS build

# Recibir la variable de entorno como argumento
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Verificar que la variable esté presente
RUN echo "Building with VITE_API_URL: $VITE_API_URL"

RUN npm run build

# Verificar que config.js esté en el build
RUN ls -la dist/
RUN cat dist/config.js || echo "config.js not found!"

# Production Stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
