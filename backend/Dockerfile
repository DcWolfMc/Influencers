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

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "run", "start:prod"]
