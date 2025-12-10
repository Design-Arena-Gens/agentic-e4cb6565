from __future__ import annotations

from pathlib import Path
from typing import Any

import torch
from torch import nn

from app.core.config import get_settings
from app.schemas.prediction import FeatureVector


class EnergyLSTM(nn.Module):
    def __init__(self, input_size: int, hidden_size: int = 128, num_layers: int = 2):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
        )
        self.dropout = nn.Dropout(p=0.3)
        self.head = nn.Linear(hidden_size, 1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:  # type: ignore[override]
        output, _ = self.lstm(x)
        output = self.dropout(output[:, -1, :])
        return self.head(output)


class PredictionService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.model = EnergyLSTM(input_size=5)
        self.model.eval()
        self.model_version = "1.0.0"
        self._load_checkpoint()

    def _load_checkpoint(self) -> None:
        checkpoint_path = Path(self.settings.model_checkpoint_path)
        if checkpoint_path.exists():
            try:
                state_dict = torch.load(checkpoint_path, map_location=torch.device("cpu"))
                self.model.load_state_dict(state_dict["model_state"])
                self.model_version = state_dict.get("model_version", self.model_version)
            except Exception as exc:  # noqa: BLE001
                print(f"Failed to load checkpoint: {exc}")

    def _preprocess(self, features: list[FeatureVector]) -> torch.Tensor:
        values = []
        for feature in features:
            values.append(
                [
                    feature.energy_consumption,
                    feature.temperature,
                    feature.humidity,
                    feature.wind_speed,
                    feature.solar_irradiance,
                ]
            )
        tensor = torch.tensor(values, dtype=torch.float32)
        return tensor.unsqueeze(0)

    @torch.no_grad()
    def predict(self, features: list[FeatureVector]) -> dict[str, Any]:
        tensor = self._preprocess(features)
        output = self.model(tensor)
        prediction = output.squeeze().tolist()
        if not isinstance(prediction, list):
            prediction = [float(prediction)]
        return {
            "forecast_horizon_minutes": 60,
            "predictions": prediction,
            "model_version": self.model_version,
        }


prediction_service = PredictionService()
