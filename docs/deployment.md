# Deployment Guide

## Containerization
- Backend service packaged via `backend/Dockerfile`.
- Frontend packaged via `frontend/Dockerfile` for Vercel-compatible builds.
- Spark job executed using Bitnami Spark image with mounted pipeline.

## Docker Compose (Local)
```bash
docker compose up --build
```
This spins up the full stack including Kafka, Redis, MongoDB, PostgreSQL, Ganache, and Spark.

## Kubernetes
1. Push images to your container registry.
2. Apply manifests:
   ```bash
   kubectl apply -f k8s/data-services.yaml
   kubectl apply -f k8s/realtime-stack.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/spark-job.yaml
   ```
3. Configure ingress (NGINX/ALB) and external DNS.

## CI/CD
- GitHub Actions workflow builds and pushes images.
- Deployment job triggers ArgoCD or directly applies manifests using environment-specific kubeconfigs.
- Secrets managed via GitHub OIDC + cloud secret managers.

## Observability
- Instrument FastAPI with OpenTelemetry exporters.
- Stream logs to ELK / Loki.
- Scrape metrics with Prometheus and visualize via Grafana dashboards.
