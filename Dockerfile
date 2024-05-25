FROM node:10-alpine

RUN mkdir -p /home/sagar/Documents/chatApp/node_modules/ && chown -R node:node /home/sagar/Documents/chatApp/src/app.ts


WORKDIR /home/sagar/Documents/chatApp/src/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "app.ts" ]