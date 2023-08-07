FROM maven:3.8.1-openjdk-17-slim AS build
RUN mkdir /app
WORKDIR /app

# Copy the Maven project files to the container
COPY ../../pom.xml .
COPY src ./src

# Build the Maven project
RUN mvn clean package -DskipTests

# Use a lightweight Java runtime as the base image
FROM openjdk:17-jre-slim

ARG username=$DB_URL
ARG url=$DB_USERNAME
ARG password=$DB_PSWD

# Set the working directory in the container

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/your-project.jar ./app.jar

# Specify the command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
