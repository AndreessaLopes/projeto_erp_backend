FROM node:20-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 4000

# O comando vai depender do ambiente
CMD ["npm", "run", "start:dev"]
