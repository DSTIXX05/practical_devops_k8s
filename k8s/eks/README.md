# EKS bootstrap for the app

This folder is the starting point for deploying the stack to Amazon EKS.

## 1. Create the cluster

Use the eksctl cluster config in this folder:

```bash
eksctl create cluster -f k8s/eks/cluster-config.yaml
```

That creates:

- a cluster named `ecommerce-observability`
- a managed node group for the app workloads
- OIDC enabled for add-ons and future IAM integrations

## 2. Verify access

```bash
aws eks update-kubeconfig --region eu-west-1 --name ecommerce-observability
kubectl get nodes
kubectl get ns
```

## 3. Build and publish images

This repo is set up to use Docker Hub images. The GitHub Actions workflow in [`.github/workflows/main.yml`](../../.github/workflows/main.yml) builds and pushes the backend and frontend images for you when you push to `test_pipeline`.

If you want to do it manually, tag and push to Docker Hub instead of ECR:

```bash
docker login

docker build -t dstixx05/ecommerce-backend:latest -f ../backend/Dockerfile ../backend
docker build -t dstixx05/ecommerce-frontend:latest -f ../frontend/Dockerfile ../frontend

docker push dstixx05/ecommerce-backend:latest
docker push dstixx05/ecommerce-frontend:latest
```

## 4. Deploy to EKS

For the first deployment, the Helm chart is the cleanest path:

```bash
helm upgrade --install ecommerce-app ./k8s/helm/ecommerce-app \
  --namespace app --create-namespace \
  -f k8s/eks/values-eks.yaml \
  --set secret.dbPass='<your-db-password>'
```

If you want to override the image names explicitly, set them to your Docker Hub repositories:

```bash
--set backend.image.repository=dstixx05/ecommerce-backend \
--set frontend.image.repository=dstixx05/ecommerce-frontend
```

## 5. Check the rollout

```bash
kubectl get pods -n app
kubectl get svc -n app
kubectl get hpa -n app
```

## 6. Install metrics-server for HPA

The HPA objects in this repo rely on CPU metrics from metrics-server. Install it before you expect autoscaling to work:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

If your cluster uses strict API server validation or has certificate issues, you may need to add the usual `--kubelet-insecure-tls` or preferred kubelet address arguments to the metrics-server manifest before applying it.

## Notes

- The frontend service is `LoadBalancer`, so EKS will create a public AWS load balancer automatically.
- Keep the backend and database services internal as `ClusterIP`.
- If your GitHub Actions workflow is still limited to a specific branch, make sure your push targets that branch or update the trigger in `.github/workflows/main.yml`.
- If you want ingress-based routing later, I can add the AWS Load Balancer Controller path next.
