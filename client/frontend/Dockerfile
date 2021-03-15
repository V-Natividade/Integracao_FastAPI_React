FROM mhart/alpine-node:14

WORKDIR /frontend

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

COPY package.json yarn.lock ./

RUN yarn

COPY . /frontend