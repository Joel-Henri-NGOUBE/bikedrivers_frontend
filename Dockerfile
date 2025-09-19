FROM node:22.18-alpine3.21

WORKDIR /bikedrivers-frontend

COPY package.json /bikedrivers-frontend

COPY . /bikedrivers-frontend

RUN npm install

# EXPOSE 5173

CMD ["npm", "run", "container"]