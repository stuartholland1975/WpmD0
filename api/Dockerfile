FROM node:16-slim
WORKDIR /app

ENV PG_DATABASE=wpm_dev
ENV PG_USER=postgres
ENV PG_PASSWORD=987jmo00
ENV PG_HOST=68.183.253.82
ENV PG_PORT=9432
ENV PG_SCHEMA=wpm_graphql
ENV PORT=9433

COPY package.json .
COPY yarn.lock .


RUN yarn install

COPY . .

EXPOSE 9433

CMD ["yarn", "start"]