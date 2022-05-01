FROM node:17-alpine

WORKDIR /home/app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY public ./public/
COPY src ./src/

ARG REACT_APP_URL
ARG REACT_APP_NODE_ENV

RUN npm run build

RUN apk add ca-certificates
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "/home/app/frontend", "-l", "3000"]
