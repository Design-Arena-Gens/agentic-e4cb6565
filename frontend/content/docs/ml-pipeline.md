# ML & Streaming Pipeline

## Data Ingestion
- Edge telemetry and weather data ingested to Kafka (`energy_ingest`).
- Schema enforcement handled inside `spark_pipeline/streaming_job.py`.

## Feature Engineering
- Sliding window aggregation per feeder / asset.
- Derived metrics: rolling average, delta, solar-weighted factor.
- Output emitted to `energy_predictions` topic.

## Model Lifecycle
- LSTM defined in `backend/app/services/predictions.py`.
- Checkpoints stored at `/models/lstm_checkpoint.pt` (configurable via env).
- Model version tracked within checkpoint metadata.

## Inference Serving
- FastAPI endpoint `/api/v1/predictions` executes forward pass.
- Blockchain proof optional per deployment; tx hash returned when enabled.
- Redis pub/sub pushes predictions to WebSocket clients.

## Monitoring
- Collect MAE/RMSE via Mongo analytics aggregator.
- Configure model drift alerts based on temperature/humidity covariate shift.
- Retraining pipeline can be orchestrated using Airflow or Prefect.
