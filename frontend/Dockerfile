FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm i
RUN npm i typescript
COPY ./src ./src
RUN tsc
CMD npm run start