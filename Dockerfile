FROM node:lts-alpine3.9
EXPOSE 8282

ENV SERVICE_HOME /service
RUN mkdir -p $SERVICE_HOME
RUN apk add --no-cache bash
WORKDIR $SERVICE_HOME
COPY . .
RUN npm ci --production
