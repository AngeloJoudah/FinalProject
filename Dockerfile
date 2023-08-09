FROM maven:3.8.3-openjdk-17 AS build
RUN mkdir /app
WORKDIR /app

# Copy the Maven project files to the container
COPY . .
RUN pwd
# Build the Maven project
RUN mvn clean package -DskipTests 
RUN ls ./target
# Use a lightweight Java runtime as the base image
FROM openjdk:17

ARG URL
ARG USERNAME
ARG PSWD

# Set the working directory in the container

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar .
EXPOSE 8080

ENV DB_URL=$URL
ENV DB_USERNAME=$USERNAME
ENV DB_PSWD=$PSWD
# Specify the command to run the Spring Boot application
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
