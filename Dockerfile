FROM node:latest

LABEL author="nyangnyanggompeng"

ENV NODE_ENV=production
ENV PORT=3000
ENV OPENAI_ORGANIZATION = org-wPcXFlLfnk0Aatp6prxZQO15
ENV OPENAI_API_KEY = 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
ENV ACCESS_TOKEN_SECRET_KEY = 'secret key'
ENV REFRESH_TOKEN_SECRET_KEY = 'secret key'
ENV GMAIL_ID=nyangnyanggompeng@gmail.com
ENV GMAIL_PW=mjixnkkjbakegynw

COPY . /var/www
WORKDIR /var/www

VOLUME ["/var/www"]

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]