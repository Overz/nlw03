FROM node:14-alpine

ENV PORT 3000
ENV JWT_KEY "eeXBrHVemSLhuar1mrvT85STqkESHY"

ENV DB_URL 'postgresql://postgres:postgres@localhost:5555/postgres'

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .npmrc .
RUN yarn install --prod

COPY . .
RUN yarn build && rm -rf src/ yarn cache clean

EXPOSE 3000

CMD [ "yarn", "start" ]