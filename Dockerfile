# FROM ubuntu:bionic

# RUN apt-get update
# RUN apt-get install -y software-properties-common curl python wget chromium-browser

# # RUN add-apt-repository ppa:mc3man/mpv-tests
# # RUN apt-get update
# # RUN apt-get install -y mpv 
# # RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
# # RUN chmod a+rx /usr/local/bin/youtube-dl

# RUN curl -sL https://deb.nodesource.com/setup_15.5.1 | bash
# RUN apt-get install -y nodejs

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# ENV CHROMIUM_PATH /usr/bin/chromium-browser

# WORKDIR /build

# COPY . .

# RUN npm install
# RUN npm run build

# CMD ["npm", "run", "start"]

FROM node:14.15.5-alpine

WORKDIR /usr/src/app/

COPY . /usr/src/app

# RUN apt-get update && apt-get install chromium
RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

RUN npm install 

CMD [ "npm", "run", "start" ]
