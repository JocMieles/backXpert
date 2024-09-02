# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json desde la raíz del proyecto
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todo el contenido de la carpeta src al directorio de trabajo en el contenedor
COPY ./src .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

RUN npm install -g nodemon

# Comando para iniciar la aplicación
CMD ["nodemon", "/app/server.ts"]
