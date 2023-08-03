FROM node:latest

LABEL author="nyangnyanggompeng"

ENV NODE_ENV production
ENV PORT 8080
ENV ACCESS_TOKEN_SECRET_KEY 'secret key'
ENV REFRESH_TOKEN_SECRET_KEY 'secret key'
ENV GMAIL_ID nyangnyanggompeng@gmail.com
ENV GMAIL_PW nngpadmin1928!!
ENV S3_ACCESS_KEY_ID AKIA33P3M5BBC4T3NXFW

COPY . /var/www
WORKDIR /var/www
COPY test.ejs /var/www/html

VOLUME ["/var/www"]

RUN rm -rf node_modules
RUN npm install -g npm@9.8.1
RUN npm install --no-fund

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]