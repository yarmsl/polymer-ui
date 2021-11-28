FROM node:14-alpine AS builder
RUN apk add --no-cache --virtual g++ make py3-pip
ENV NODE_ENV production
WORKDIR /web
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD . .
RUN npm run build
RUN apk del .gyp

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /web/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]