from datetime import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.realtime import realtime_service

router = APIRouter(tags=["realtime"])


@router.websocket("/stream")
async def stream_predictions(websocket: WebSocket) -> None:
    await websocket.accept()
    async with realtime_service.subscribe() as subscription:
        try:
            async for message in subscription:
                message.setdefault("server_timestamp", datetime.utcnow().isoformat())
                await websocket.send_json(message)
        except WebSocketDisconnect:
            return
