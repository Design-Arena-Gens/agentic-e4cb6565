from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    project_name: str = "Decentralized Energy Forecasting"
    api_v1_prefix: str = "/api/v1"
    mongodb_uri: str = "mongodb://mongo:27017/def"
    postgres_uri: str = "postgresql+asyncpg://def:def@postgres:5432/def"
    redis_url: str = "redis://redis:6379/0"
    kafka_bootstrap_servers: str = "kafka:9092"
    kafka_prediction_topic: str = "energy_predictions"
    kafka_ingest_topic: str = "energy_ingest"
    model_checkpoint_path: str = "/models/lstm_checkpoint.pt"
    web3_rpc_url: str = "http://ganache:8545"
    ledger_contract_address: str | None = None
    ledger_private_key: str | None = None
    ledger_account_address: str | None = None
    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
