# Etapa de construcción
FROM node:20.18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./

#RUN npm cache clean --force
RUN npm install --verbose
COPY . .
RUN npm run build --verbose

# Etapa de ejecución
FROM node:20.18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

EXPOSE 3000
CMD ["node", "dist/main"]