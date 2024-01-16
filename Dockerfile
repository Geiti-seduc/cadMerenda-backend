FROM node:18.18.1

WORKDIR /user/app

COPY package.json ./
COPY ./prisma prisma
COPY ./src src

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3001


CMD ["npm","start"]