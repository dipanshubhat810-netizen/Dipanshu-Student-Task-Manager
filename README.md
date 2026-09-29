# Dipanshu's Student Task Manager

A simple web application developed by **Dipanshu Bhat** to help students manage their academic tasks.

## Features

- Add new student tasks
- Assign a priority (Low / Medium / High) to each task
- Mark tasks as completed
- Undo completed tasks
- Delete tasks
- View total, completed and pending tasks

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js (HTTP server, no external dependencies)
- Docker
- Kubernetes (Minikube)
- Jenkins
- Git / GitHub

## Project Structure

```
Dipanshu-Student-Task-Manager
├── public/
│   ├── index.html        Application user interface
│   ├── style.css         Application stylesheet
│   └── script.js         Application logic
├── app.js                HTTP server listening on 0.0.0.0:3000
├── build.js              Build validation step (npm run build)
├── test.js               Automated test script (npm test)
├── package.json          npm start / build / test scripts
├── Dockerfile            Container build definition
├── .dockerignore         Files excluded from the Docker build context
├── deployment.yaml       Kubernetes Deployment (task-manager-deployment)
├── service.yaml          Kubernetes NodePort Service (task-manager-service)
└── Jenkinsfile           Declarative Jenkins Pipeline
```

## How to Run

1. Clone the repository.
2. Install Node.js dependencies: `npm install`
3. Start the application: `npm start`
4. Open `http://localhost:3000` in a web browser.

## npm Scripts

| Command          | Action                                            |
| ---------------- | ------------------------------------------------- |
| `npm start`      | Runs `node app.js` (HTTP server on port 3000)      |
| `npm run build`  | Runs `node build.js` (validates application files) |
| `npm test`       | Runs `node test.js` (automated test cases)         |

---

# DOSSL Lab Assignments

## Assignment 4 - Dockerization

Build and run the application as a Docker container.

```bash
docker build -t task-manager:1.0 .
docker run -d -p 3000:3000 --name task-manager-container task-manager:1.0
docker ps
docker logs task-manager-container
```

Expected container log:

```
Student Task Manager running on port 3000
```

## Assignment 5 - Kubernetes Deployment and Scaling

Deploy the Dockerized application on a local Kubernetes cluster using Minikube,
scale it with replicas, expose it with a NodePort Service and demonstrate
self-healing.

```bash
# 1. Verify the Docker image
docker images

# 2. Start the local cluster
minikube start
minikube status
kubectl cluster-info
kubectl get nodes

# 3. Load the image into the Minikube node (imagePullPolicy: Never)
minikube image load task-manager:1.0
minikube image ls

# 4. Create the Deployment (2 replicas)
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods

# 5. Create the NodePort Service
kubectl apply -f service.yaml
kubectl get svc

# 6. Access the application
minikube service task-manager-service
minikube service task-manager-service --url

# 7. Scale to 4 replicas
kubectl scale deployment task-manager-deployment --replicas=4
kubectl get pods

# 8. Verify self-healing
kubectl delete pod <pod-name>
kubectl get pods

# 9. View application logs
kubectl logs <pod-name>

# 10. Stop the cluster
minikube stop
```

## Assignment 6 - Jenkins Pipeline with Automated Testing

The `Jenkinsfile` defines a four stage pipeline (Checkout -> Install
Dependencies -> Build -> Automated Testing). `npm test` returns a non-zero
exit code when a test case fails, so Jenkins fails the Pipeline automatically.

```bash
npm install
npm test          # All tests pass -> exit code 0 -> Pipeline SUCCESS
```

To demonstrate the failure path, temporarily rename `public/index.html`:

```bash
git mv public/index.html public/index-old.html
git commit -am "Test pipeline failure"
git push origin main
```

The pipeline then reports:

```
TEST FAILED: public/index.html not found
script returned exit code 1
Finished: FAILURE
```

## Jenkins Pipeline Job

| Setting        | Value                                              |
| -------------- | -------------------------------------------------- |
| Job name       | `task-manager-pipeline`                            |
| Type           | Pipeline                                           |
| Definition     | Pipeline script from SCM                           |
| SCM            | Git                                                |
| Repository     | `https://github.com/dipanshubhat810-netizen/Dipanshu-Student-Task-Manager.git` |
| Branch         | `*/main`                                           |
| Script Path    | `Jenkinsfile`                                      |

## Author

Dipanshu Bhat

## Git Workflow Demonstrated

This project demonstrates:

- Repository creation
- Repository cloning
- Staging and committing
- Pushing to GitHub
- Branch creation
- Branch modifications
- Branch commits
- Merging
- Pulling remote changes
