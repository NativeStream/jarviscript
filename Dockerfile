FROM node:15.9.0-buster-slim

WORKDIR /usr/src/app/

RUN apt-get update
RUN apt-get install -y software-properties-common curl python wget
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash
RUN apt-get install -y nodejs

RUN apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0  libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# RUN add-apt-repository ppa:mc3man/mpv-tests
# RUN apt-get update
# RUN apt-get install -y mpv 
# RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
# RUN chmod a+rx /usr/local/bin/youtube-dl

COPY . /usr/src/app

RUN npm install 
RUN npm run build

RUN mkdir /session
ENV SESSION_PATH=/session/session.data.json

CMD [ "npm", "run", "start" ]
