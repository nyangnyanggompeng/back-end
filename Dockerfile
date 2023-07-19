FROM node:latest

LABEL author="nyangnyanggompeng"

ENV NODE_ENV production
ENV PORT 8080
ENV ACCESS_TOKEN_SECRET_KEY 'secret key'
ENV REFRESH_TOKEN_SECRET_KEY 'secret key'
ENV GMAIL_ID nyangnyanggompeng@gmail.com
ENV GMAIL_PW mjixnkkjbakegynw

COPY . /var/www
WORKDIR /var/www

VOLUME ["/var/www"]

RUN npm install
RUN npm audit fix
RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]