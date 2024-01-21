FROM node:alpine AS build

ARG MG_URL
ENV MG_URL=$MG_URL


WORKDIR /app
COPY ./ ./
RUN npm i
RUN npx tsc
FROM node:alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8081
CMD ["node","build/app.js"]
