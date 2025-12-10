from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, struct, to_json
from pyspark.sql.types import (
    DoubleType,
    StringType,
    StructField,
    StructType,
)

KAFKA_BOOTSTRAP_SERVERS = "kafka:9092"
KAFKA_INPUT_TOPIC = "energy_ingest"
KAFKA_OUTPUT_TOPIC = "energy_predictions"
CHECKPOINT_LOCATION = "/app/checkpoints"


schema = StructType(
    [
        StructField("timestamp", StringType(), False),
        StructField("energy_consumption", DoubleType(), False),
        StructField("temperature", DoubleType(), False),
        StructField("humidity", DoubleType(), False),
        StructField("wind_speed", DoubleType(), False),
        StructField("solar_irradiance", DoubleType(), False),
    ]
)


def create_session() -> SparkSession:
    return (
        SparkSession.builder.appName("DecentralizedEnergyForecasting")
        .config("spark.sql.shuffle.partitions", "4")
        .getOrCreate()
    )


def main() -> None:
    spark = create_session()
    spark.sparkContext.setLogLevel("WARN")

    raw_stream = (
        spark.readStream.format("kafka")
        .option("kafka.bootstrap.servers", KAFKA_BOOTSTRAP_SERVERS)
        .option("subscribe", KAFKA_INPUT_TOPIC)
        .option("startingOffsets", "latest")
        .load()
    )

    parsed = raw_stream.selectExpr("CAST(value AS STRING) as json").select(
        from_json(col("json"), schema).alias("data")
    )

    aggregated = parsed.select(
        col("data.timestamp").alias("timestamp"),
        col("data.energy_consumption").alias("prediction"),
        struct(
            col("data.temperature"),
            col("data.humidity"),
            col("data.wind_speed"),
            col("data.solar_irradiance"),
        ).alias("metadata"),
    )

    sink = (
        aggregated.selectExpr("to_json(struct(*)) AS value")
        .writeStream.format("kafka")
        .option("kafka.bootstrap.servers", KAFKA_BOOTSTRAP_SERVERS)
        .option("topic", KAFKA_OUTPUT_TOPIC)
        .option("checkpointLocation", CHECKPOINT_LOCATION)
        .outputMode("append")
        .start()
    )

    sink.awaitTermination()


if __name__ == "__main__":
    main()
