# Kubernetes Node.js + MongoDB Assignment

## 1. Project Overview
This project was created to demonstrate practical skills in containerization, Kubernetes orchestration, and cloud-native application deployment.

**Goal:** Deploy a Node.js web application with a MongoDB backend on Kubernetes, ensuring best practices for scalability, resilience, and maintainability.

## 2. Architecture Diagram
```
[User] 
   |
[Ingress Controller] 
   |
[webapp-service] 
   |
[webapp Pod] <----> [mongo-service] <----> [MongoDB Pod]
```

## 3. Technology Stack
- Node.js (Express) web application
- MongoDB database
- Docker
- Kubernetes (AKS compatible)
- NGINX Ingress Controller

## 4. Setup & Deployment Instructions

### Prerequisites
- Docker
- kubectl
- Access to a Kubernetes cluster (local or AKS)
- Node.js (for local testing)

### Steps
1. **Build and Push Docker Image**
   ```sh
   cd webapp
   docker build -t abhishekchandelnag/k8s-assignment-app:latest .
   docker push abhishekchandelnag/k8s-assignment-app:latest
   ```

2. **Apply Kubernetes Resources**
   ```sh
   kubectl apply -f db/volume.yml
   kubectl apply -f db/persistent-volume-claim.yml
   kubectl apply -f db/mongo-secret.yml
   kubectl apply -f db/mongo-config.yml
   kubectl apply -f db/mongo-init-script.yml
   kubectl apply -f db/mongo.yml
   kubectl apply -f webapp.yml
   kubectl apply -f webapp-ingress.yml
   kubectl apply -f nginx-ingress-controller.yml
   kubectl apply -f nginx-ingress-rbac.yml
   ```

3. **Verify Deployment**
   ```sh
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

## 5. Kubernetes Resources
- **db/mongo.yml**: MongoDB StatefulSet and Service
- **db/mongo-config.yml**: ConfigMap for MongoDB connection details
- **db/mongo-secret.yml**: Secret for MongoDB credentials
- **webapp.yml**: Deployment and Service for Node.js app
- **webapp-ingress.yml**: Ingress resource for external access
- **nginx-ingress-controller.yml**: NGINX Ingress controller deployment
- **nginx-ingress-rbac.yml**: RBAC for Ingress controller

## 6. Testing & Validation
- Access the webapp via the external IP or DNS of the Ingress controller.
- Validate Read and write operations via the web UI.

## 7. Troubleshooting
- **503/500 errors**: Check pod logs, service endpoints, and Ingress logs.
- **MongoDB connection issues**: Ensure secrets/configs are correct, and pods can resolve service DNS.
- **Ingress not routing**: Verify Ingress controller is running and has correct RBAC.

## 8. References
- Docker Hub repo url https://hub.docker.com/repository/docker/abhishekchandelnag/k8s-assignment-app

