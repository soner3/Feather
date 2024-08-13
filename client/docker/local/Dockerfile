FROM node:20.14-alpine

ARG USERNAME=nodeuser
ARG USER_UID=1001
ARG USER_GID=1001

RUN addgroup -g ${USER_GID} ${USERNAME} \
    && adduser -u ${USER_UID} -G ${USERNAME} -s /bin/sh -D ${USERNAME}

WORKDIR /app

RUN chown -R ${USERNAME}:${USERNAME} /app

USER ${USERNAME}

COPY package.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]