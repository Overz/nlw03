FROM node:14-alpine

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .npmrc .
RUN yarn install --prod

COPY . .
RUN yarn build && rm -rf src/ yarn cache clean

EXPOSE 30000

CMD [ "yarn", "start" ]