FROM node:23-alpine

LABEL maintainer="Peter Ndukwe ndukwe.peter@roqqu.com"

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
