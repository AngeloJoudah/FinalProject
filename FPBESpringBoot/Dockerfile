FROM maven:3.8.1-openjdk-17-slim AS build
RUN mkdir /app
WORKDIR /app

# Copy the Maven project files to the container

COPY ../../pom.xml .
COPY src ./src

# Build the Maven project
RUN mvn clean package -DskipTests 

# Use a lightweight Java runtime as the base image
FROM openjdk:17-jdk-slim

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/app.jar .
EXPOSE 8080

ARG URL
ARG USERNAME
ARG PSWD
ENV URL=$URL
ENV USERNAME=$USERNAME
ENV PSWD=$PSWD
# Specify the command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
