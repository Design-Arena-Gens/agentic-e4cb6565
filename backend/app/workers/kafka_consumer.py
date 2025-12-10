import asyncio
import json

from kafka import KafkaConsumer

from app.core.config import get_settings
from app.services.realtime import realtime_service


async def forward_predictions() -> None:
    settings = get_settings()
    consumer = KafkaConsumer(
        settings.kafka_prediction_topic,
        bootstrap_servers=settings.kafka_bootstrap_servers,
        auto_offset_reset="latest",
        enable_auto_commit=True,
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
    )
    loop = asyncio.get_event_loop()
    while True:
        records = consumer.poll(timeout_ms=1000)
        for _, messages in records.items():
            for message in messages:
                await realtime_service.publish(message.value)
        await asyncio.sleep(0)


if __name__ == "__main__":
    asyncio.run(forward_predictions())
