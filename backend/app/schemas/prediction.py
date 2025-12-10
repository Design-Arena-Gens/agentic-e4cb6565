from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class FeatureVector(BaseModel):
    timestamp: datetime = Field(..., description="UTC timestamp of the observation")
    energy_consumption: float = Field(..., description="Current energy consumption (kWh)")
    temperature: float = Field(..., description="Ambient temperature (C)")
    humidity: float = Field(..., description="Relative humidity (%)")
    wind_speed: float = Field(..., description="Wind speed (m/s)")
    solar_irradiance: float = Field(..., description="Solar irradiance (W/m2)")


class PredictionRequest(BaseModel):
    features: list[FeatureVector]


class PredictionResponse(BaseModel):
    forecast_horizon_minutes: int
    predictions: list[float]
    model_version: str
    blockchain_tx_hash: str | None = None


class BatchIngestEvent(BaseModel):
    events: list[dict[str, Any]]
