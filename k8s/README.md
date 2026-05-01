# Kubernetes deployment notes

Steps to build images, push to registry and deploy to Kubernetes.

1. Set registry and build images

   Replace `<your-registry>` in the Makefile or set `REGISTRY` env var.

   ```bash
   make build-backend REGISTRY=docker.io/youruser
   make build-frontend REGISTRY=docker.io/youruser
   ```

2. Push images (or load into local cluster)

   Push to a registry:

   ```bash
   make push REGISTRY=docker.io/youruser
   ```

   For local `kind` cluster use:

   ```bash
   make build-backend REGISTRY=intermediate-backend
   docker tag docker.io/youruser/intermediate-backend:latest intermediate-backend:latest
   kind load docker-image intermediate-backend:latest
   # do same for frontend
   ```

3. Apply manifests

   ```bash
   # creates namespace "app" and deploys resources
   kubectl apply -f deployments-and-services.yaml
   ```

4. Expose frontend
   - If running in cloud, change `frontend` Service to `LoadBalancer` or apply an Ingress and install an Ingress controller.
   - For `minikube`: `minikube service frontend -n app`
   - For `kind`: use `kubectl port-forward svc/frontend 8080:80 -n app`

Notes

- Edit image references in `deployments-and-services.yaml` to point to your pushed images.
- The frontend nginx config proxies `/api` to service `backend:5000` so the backend Service name must be `backend` in the same namespace.
- If you want I can:
  - build and push images (you'll provide registry creds), or
  - create a Helm chart for this stack, or
  - update manifests for LoadBalancer / Ingress specifics for your environment.
