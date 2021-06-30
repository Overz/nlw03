FROM node:14-alpine

RUN apk update && apk add python-dev --no-cache

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
EXPOSE 3000

COPY . .

CMD [ "yarn", "dev" ]