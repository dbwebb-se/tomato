FROM alpine:3.12
RUN apk add --update \
            --no-cache  --repository http://dl-cdn.alpinelinux.org/alpine/edge/community php \
            bash \
            nodejs npm

WORKDIR /tomato

RUN npm install -g eslint
