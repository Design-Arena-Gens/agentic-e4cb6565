import asyncio
import json
from contextlib import asynccontextmanager
from typing import AsyncIterator

from redis.asyncio import Redis

from app.core.config import get_settings


class RealtimeService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._redis = Redis.from_url(self.settings.redis_url)
        self.channel = "forecast_stream"

    async def publish(self, message: dict) -> None:
        await self._redis.publish(self.channel, json.dumps(message))

    @asynccontextmanager
    async def subscribe(self) -> AsyncIterator[AsyncIterator[dict]]:
        pubsub = self._redis.pubsub()
        await pubsub.subscribe(self.channel)

        async def iterator() -> AsyncIterator[dict]:
            while True:
                message = await pubsub.get_message(ignore_subscribe_messages=True, timeout=1.0)
                if message and message["type"] == "message":
                    yield json.loads(message["data"])
                await asyncio.sleep(0)

        try:
            yield iterator()
        finally:
            await pubsub.unsubscribe(self.channel)
            await pubsub.close()


realtime_service = RealtimeService()
