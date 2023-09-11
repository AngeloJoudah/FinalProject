FROM node:alpine AS build

ARG MG_URL
ENV MG_URL=$MG_URL


WORKDIR /app
COPY ./ ./
RUN npm i --omit=dev
RUN npx tsc
FROM node:alpine
WORKDIR /app
COPY --from=build /app/build /app/dist
CMD ["node","app.js"]
