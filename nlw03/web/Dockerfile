FROM node:14-alpine

WORKDIR /app

# https://github.com/facebook/create-react-app/issues/8688
# CI é uma ENV necessária para o React funcionar sem problemas
# Não sei o real motivo.
ENV CI true

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
