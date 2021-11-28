FROM node:8.12-alpine AS builder
ENV NODE_ENV production
WORKDIR /web
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN apk add --no-cache --virtual .gyp \
        py3-pip \
        make \
        g++ \
    && npm install \
    && apk del .gyp
ADD . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /web/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]