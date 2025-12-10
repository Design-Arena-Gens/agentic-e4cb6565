# Decentralized Energy Forecasting (DEF)

End-to-end platform delivering real-time, blockchain-verifiable energy forecasts powered by Spark Streaming, FastAPI, and an LSTM inference engine. The React + Tailwind dashboard streams live predictions, KPIs, and on-chain proofs to operators in sub-second latency.

## 🔭 Capabilities
- **Streaming ingestion** via Kafka + Spark Structured Streaming (`spark_pipeline/`).
- **AI inference** pipeline with PyTorch LSTM served through FastAPI (`backend/`).
- **Blockchain notarization** leveraging the ForecastLedger smart contract (`blockchain/`).
- **Analytics experience** built with Next.js + Tailwind CSS (`frontend/`).
- **DevOps ready** with Docker, Kubernetes manifests (`k8s/`), and GitHub Actions CI/CD.

## 🧱 Repository Layout
```
frontend/          # Next.js dashboard (React, Tailwind, ethers, recharts)
backend/           # FastAPI service, PyTorch model, Redis/Kafka integrations
spark_pipeline/    # PySpark structured streaming job
blockchain/        # Hardhat project & Solidity contract
k8s/               # Production manifests (Deployments, Services, Jobs)
docs/              # Architecture, deployment, and ML pipeline guides
docker-compose.yml # Local orchestration of the entire platform
.github/workflows/ # CI pipeline (lint, test, docker builds)
```

## 🚀 Local Development
Clone the repository and bootstrap the stack:
```bash
cp .env.example .env
docker compose up --build
```
- Frontend: http://localhost:3000  
- FastAPI: http://localhost:8000/api/v1/health  
- MongoDB: mongodb://localhost:27017  
- PostgreSQL: postgres://def:def@localhost:5432/def  

## 🧪 Testing
- Frontend lint/build: `cd frontend && npm run lint && npm run build`
- Backend unit tests: `cd backend && pip install -r requirements.txt && pytest`

## 📦 Deployment
- **Containers**: `frontend/Dockerfile`, `backend/Dockerfile`
- **Kubernetes**: apply manifests in `k8s/`
- **CI/CD**: `.github/workflows/ci.yml` builds, tests, and publishes docker images to GHCR
- **Vercel**: deploy the Next.js frontend with `vercel deploy --prod`

## 📚 Documentation
Rendered directly in-app under `/docs` from Markdown sources:
- `docs/architecture.md` — diagrams, component matrix, and data flow
- `docs/deployment.md` — infra, CI/CD, observability blueprint
- `docs/ml-pipeline.md` — data science, model lifecycle, monitoring

## 🔐 Environment
Configure required secrets via `.env`:
```bash
MONGODB_URI=mongodb://mongo:27017/def
POSTGRES_URI=postgresql+asyncpg://def:def@postgres:5432/def
REDIS_URL=redis://redis:6379/0
KAFKA_BOOTSTRAP_SERVERS=kafka:9092
WEB3_RPC_URL=http://ganache:8545
LEDGER_CONTRACT_ADDRESS=0x...
LEDGER_PRIVATE_KEY=0x...
```

## 📄 License
MIT — feel free to adapt and extend for your decentralised energy initiatives.
