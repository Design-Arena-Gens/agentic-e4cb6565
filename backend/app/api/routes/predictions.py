from datetime import datetime

from fastapi import APIRouter, BackgroundTasks

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services import blockchain_service, prediction_service, realtime_service

router = APIRouter(tags=["predictions"])


async def _dispatch_realtime(prediction_payload: dict) -> None:
    await realtime_service.publish(prediction_payload)


@router.post("/predictions", response_model=PredictionResponse)
async def create_prediction(
    payload: PredictionRequest,
    background_tasks: BackgroundTasks,
) -> PredictionResponse:
    result = prediction_service.predict(payload.features)
    tx_hash = blockchain_service.record_forecast(
        {
            "timestamp": int(datetime.utcnow().timestamp()),
            "prediction": result["predictions"][0],
        }
    )
    message = {
        "timestamp": datetime.utcnow().isoformat(),
        "prediction": result["predictions"][0],
        "model_version": result["model_version"],
        "tx_hash": tx_hash,
    }
    background_tasks.add_task(_dispatch_realtime, message)
    return PredictionResponse(**result, blockchain_tx_hash=tx_hash)
