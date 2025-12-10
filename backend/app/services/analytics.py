from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import get_settings


class AnalyticsService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.client = AsyncIOMotorClient(self.settings.mongodb_uri)
        self.db = self.client.get_default_database()
        self.collection = self.db.get_collection("predictions")

    async def get_recent_predictions(self, hours: int = 24) -> list[dict[str, Any]]:
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        cursor = self.collection.find({"timestamp": {"$gte": cutoff}}).sort("timestamp", 1)
        results: list[dict[str, Any]] = []
        async for doc in cursor:
            doc["_id"] = str(doc.get("_id"))
            results.append(doc)
        return results

    async def get_kpis(self) -> dict[str, Any]:
        recent = await self.get_recent_predictions(hours=1)
        if not recent:
            return {
                "mae": None,
                "rmse": None,
                "last_prediction": None,
                "data_points": 0,
            }
        actuals = [item["actual"] for item in recent if item.get("actual") is not None]
        forecasts = [item["prediction"] for item in recent if item.get("prediction") is not None]
        mae = None
        rmse = None
        if actuals and forecasts and len(actuals) == len(forecasts):
            errors = [abs(a - f) for a, f in zip(actuals, forecasts)]
            mae = sum(errors) / len(errors)
            rmse = (sum((a - f) ** 2 for a, f in zip(actuals, forecasts)) / len(actuals)) ** 0.5

        return {
            "mae": mae,
            "rmse": rmse,
            "last_prediction": recent[-1],
            "data_points": len(recent),
        }


analytics_service = AnalyticsService()
