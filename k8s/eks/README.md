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

## 3. Create ECR repositories

Create two repositories for the app images:

```bash
aws ecr create-repository --repository-name ecommerce-backend --region eu-west-1
aws ecr create-repository --repository-name ecommerce-frontend --region eu-west-1
```

## 4. Build and push images

Replace `<account-id>` with your AWS account number and then tag and push:

```bash
aws_account_id=$(aws sts get-caller-identity --query Account --output text)
backend_repo="$aws_account_id.dkr.ecr.eu-west-1.amazonaws.com/ecommerce-backend"
frontend_repo="$aws_account_id.dkr.ecr.eu-west-1.amazonaws.com/ecommerce-frontend"

aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin "$aws_account_id.dkr.ecr.eu-west-1.amazonaws.com"

docker build -t "$backend_repo:latest" -f ../backend/Dockerfile ../backend
docker build -t "$frontend_repo:latest" -f ../frontend/Dockerfile ../frontend

docker push "$backend_repo:latest"
docker push "$frontend_repo:latest"
```

## 5. Deploy to EKS

For the first deployment, the Helm chart is the cleanest path:

```bash
helm upgrade --install ecommerce-app ./k8s/helm/ecommerce-app \
  --namespace app --create-namespace \
  -f k8s/eks/values-eks.yaml \
  --set backend.image.repository="$backend_repo" \
  --set frontend.image.repository="$frontend_repo" \
  --set secret.dbPass='<your-db-password>'
```

## 6. Check the rollout

```bash
kubectl get pods -n app
kubectl get svc -n app
kubectl get hpa -n app
```

## 7. Install metrics-server for HPA

The HPA objects in this repo rely on CPU metrics from metrics-server. Install it before you expect autoscaling to work:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

If your cluster uses strict API server validation or has certificate issues, you may need to add the usual `--kubelet-insecure-tls` or preferred kubelet address arguments to the metrics-server manifest before applying it.

## Notes

- The frontend service is `LoadBalancer`, so EKS will create a public AWS load balancer automatically.
- Keep the backend and database services internal as `ClusterIP`.
- If you want ingress-based routing later, I can add the AWS Load Balancer Controller path next.
