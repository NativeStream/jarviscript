FROM ubuntu:20.04

WORKDIR /build

COPY package*.json ./
COPY tsconfig.json ./
COPY src /build/src


# RUN apk add --no-cache --virtual .gyp \
#     python make g++
# RUN apk add --update --no-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ vips-dev

# RUN npm install
# RUN apk del .gyp

# RUN npm build
ARG DEBIAN_FRONTEND=noninteractive
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN apt update
RUN apt install -y curl libvips-dev
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs
RUN node -v && npm -v

RUN apt -y install gcc g++ make
RUN apt install -y chromium-browser

RUN apt install libc6-dev
RUN apt install -y libglib2.0-dev
RUN npm install --build-from-source --unsafe-perm
RUN npm run build


EXPOSE 8000
EXPOSE 3000

CMD ["node", "./dist/main.js"]
