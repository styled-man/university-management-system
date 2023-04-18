FROM node:18 as base

WORKDIR /app
COPY package*.json .

FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD npm run dev -- -p ${NEXT_APP_PORT}

FROM base as production
ENV NODE_ENV=production
RUN npm clean-install
COPY . .
CMD npm start -- -p ${NEXT_APP_PORT}