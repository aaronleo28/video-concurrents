FROM node:10

WORKDIR /src

COPY package.json package.json

RUN npm i --quiet

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]