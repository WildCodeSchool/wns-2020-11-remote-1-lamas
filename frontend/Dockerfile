FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY tsconfig.json tsconfig.json
COPY .eslintrc .eslintrc
COPY .prettierrc .prettierrc
COPY ./src ./src
COPY ./public ./public
CMD npm run fix:lint && npm run start