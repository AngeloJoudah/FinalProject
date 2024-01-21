This project is an example of a full stack web application using the following tools
  1. Kubernetes
  2. MERN (MongoDB,Express JS, React JS, Node JS)
  3. PostgreSQL
  4. Spring Boot
  5. Java
  6. Azure
  7. Docker-Compose (switched to Kubernetes mid-way)

It is meant to simulate how a real web application is meant to be deployed and at the time of the deployment, included HTTPS and Gateways via Azure Application Gateways.
The website used token authentication. The token would have been administered by logging in to the spring boot controller in the FPBE by querying the endpoint https://ofcourse.website/api/v1/auth/authenticate with the username + password being the login credentials
The Express Server in the courseapi folder serves the user data to the React frontend folder and checks the token administered by the FPBE folder. Both of these projects share a private key and thus, the express server can check the validity of the token via SHA-256.
