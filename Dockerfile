FROM node:14-alpine AS builder
ENV NODE_ENV production
WORKDIR /web
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD . .
RUN npm run build