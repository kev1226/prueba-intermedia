# Imagen base de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto (cámbialo según el microservicio)
EXPOSE 3001

# Comando para iniciar el servicio
CMD ["node", "index.js"]
