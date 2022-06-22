FROM node:14
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY . .
EXPOSE 3100
CMD yarn start