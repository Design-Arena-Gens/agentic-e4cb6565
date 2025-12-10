from fastapi import APIRouter

from app.services.analytics import analytics_service

router = APIRouter(tags=["analytics"])


@router.get("/analytics/kpis")
async def kpis() -> dict:
    return await analytics_service.get_kpis()


@router.get("/analytics/predictions")
async def predictions() -> list[dict]:
    return await analytics_service.get_recent_predictions()
