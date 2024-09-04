# Usar uma imagem oficial do Node.js como base
FROM node:20-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Construir o projeto
RUN npm run build

# Instalar o servidor estático para servir a aplicação
RUN npm install -g serve

# Expor a porta que o servidor estático usará
EXPOSE 5000

# Comando para iniciar o servidor estático e servir a aplicação
CMD ["serve", "-s", "dist"]
