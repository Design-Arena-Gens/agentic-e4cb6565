# Decentralized Energy Forecasting — System Architecture

## High-level Architecture
```mermaid
graph TD
    subgraph Edge & IoT
        meters[Smart Meters]
        weather[Weather Stations]
    end

    meters --> kafka[Kafka Ingest Topic]
    weather --> kafka

    subgraph Stream Processing
        spark[Spark Structured Streaming]
        featureStore[(Feature Store)]
    end

    kafka --> spark
    spark --> kafkaPred[Kafka Prediction Topic]

    subgraph Core Services
        fastapi[FastAPI API Layer]
        redis[(Redis Pub/Sub)]
        mongo[(MongoDB - Observability)]
        postgres[(PostgreSQL - Metadata)]
        lstm[LSTM Model Service]
    end

    kafkaPred --> fastapi
    fastapi --> lstm
    fastapi --> redis
    fastapi --> mongo
    fastapi --> postgres

    subgraph Blockchain
        contract[(ForecastLedger Contract)]
        web3[Web3 Provider]
    end

    fastapi --> web3 --> contract

    subgraph Frontend
        nextjs[Next.js + Tailwind Dashboard]
        wallet[MetaMask / Wallet]
    end

    redis --> nextjs
    contract --> nextjs
    wallet --> nextjs
    wallet --> web3
```

## Component Overview
- **Data Producers**: Edge devices publish telemetry to Kafka (`energy_ingest`).
- **Spark Streaming**: Cleanses, enriches, and aggregates telemetry, emitting prediction-ready payloads to `energy_predictions`.
- **FastAPI Backend**: Exposes REST & WebSocket APIs, orchestrates model inference, persists analytics, forwards events to Redis, and notarizes forecasts on-chain.
- **Model Service**: PyTorch LSTM loaded in-process for low-latency inference.
- **Datastores**: MongoDB (timeseries analytics), PostgreSQL (metadata/config), Redis (real-time fan-out).
- **Blockchain**: ForecastLedger smart contract (Solidity) immutably stores forecast proofs.
- **Frontend**: Next.js dashboard with live charts, wallet auth, and analytics exploration.
- **CI/CD & Ops**: Docker images, GitHub Actions pipeline, Kubernetes manifests for production rollout.

## Data Flow
1. Telemetry enters Kafka (`energy_ingest`).
2. Spark Structured Streaming parses and aggregates event windows, emitting cleansed payloads to Kafka (`energy_predictions`).
3. FastAPI worker consumes `energy_predictions`, triggers LSTM inference, publishes real-time updates to Redis, persists metrics to Mongo/Postgres, and records results on-chain.
4. Frontend subscribes via WebSocket to Redis bridge, fetches REST analytics for historical insights, and displays blockchain verification state.

## Microservices Structure
- **FastAPI API** (`backend/app`): REST, WebSocket, inference orchestration.
- **Spark Streaming Job** (`spark_pipeline/streaming_job.py`): Continuous ETL & feature engineering.
- **Kafka Consumer Worker** (`backend/app/workers/kafka_consumer.py`): Bridges streaming predictions to Redis/web clients.
- **Blockchain Subsystem** (`blockchain/`): Hardhat project housing ForecastLedger contract and deployment scripts.

## Blockchain Integration Workflow
```mermaid
sequenceDiagram
    participant API as FastAPI
    participant Web3 as Web3 Provider
    participant Ledger as ForecastLedger

    API->>API: Prepare prediction payload
    API->>Web3: Build transaction (storeForecast)
    Web3->>Ledger: Submit signed transaction
    Ledger-->>Web3: Emit ForecastStored event
    Web3-->>API: Return tx hash
    API-->>Client: Include tx hash in API response & WebSocket event
```

## Real-time Spark Streaming Pipeline
```mermaid
flowchart LR
    KafkaIngest[Kafka Topic: energy_ingest]
    Parse[Parse JSON & Cast Schema]
    FeatureEng[Feature Struct + Aggregation]
    KafkaPred[Kafka Topic: energy_predictions]

    KafkaIngest --> Parse --> FeatureEng --> KafkaPred
```

## FastAPI Surface
- `GET /api/v1/health` — heartbeat.
- `POST /api/v1/predictions` — synchronous prediction request + blockchain notarization.
- `GET /api/v1/analytics/kpis` — aggregated KPIs.
- `GET /api/v1/analytics/predictions` — rolling forecast history.
- `WS /api/v1/stream` — live forecast push channel.

## Model Inference Flow
1. API receives feature window (`FeatureVector`).
2. Payload normalized & converted to tensor.
3. PyTorch LSTM executes forward pass.
4. Result packaged with metadata + version.
5. Blockchain transaction optional (if credentials configured).
6. Response returned & broadcast over WebSocket.

## Deployment Architecture
```mermaid
graph TD
    subgraph CI/CD
        gha[GitHub Actions]
    end
    subgraph Registry
        ghcr[Container Registry]
    end
    subgraph Prod Cluster (Kubernetes)
        fe[Frontend Deployment]
        api[Backend Deployment]
        sparkjob[Spark Streaming Job]
        ds[Mongo/Postgres/Redis/Kafka]
    end

    gha -->|Build & Test| gha
    gha -->|Push Images| ghcr
    ghcr --> fe
    ghcr --> api
    gha -->|Apply Manifests| Prod Cluster
    api --> ds
    sparkjob --> ds
    fe --> api
    api -->|On-chain| ledger[(Ethereum/Hyp.)]
```

## CI/CD Overview
- **Lint & Test**: PR pipeline runs `npm test`, `npm run lint`, `pytest`.
- **Build**: Docker images for frontend/backend pushed to registry.
- **Deploy**: GitOps (ArgoCD/Flux) or `kubectl` apply of manifests.

