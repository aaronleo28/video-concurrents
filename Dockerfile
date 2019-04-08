FROM node:10

WORKDIR /src

COPY package* ./

RUN npm i --quiet

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]