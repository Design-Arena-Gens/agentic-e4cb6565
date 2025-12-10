"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LiveForecastChart } from "@/components/dashboard/live-chart";
import { NetworkStatus } from "@/components/dashboard/network-status";
import { PredictionTable } from "@/components/dashboard/prediction-table";
import { useForecastStream } from "@/hooks/useForecastStream";
import { fetchKpis, fetchPredictions, type ForecastPoint } from "@/lib/api";

type KpiResponse = Awaited<ReturnType<typeof fetchKpis>>;

export default function DashboardPage() {
  const { data: kpiData } = useSWR<KpiResponse>("kpis", fetchKpis, {
    refreshInterval: 30_000,
  });
  const { data: history } = useSWR<ForecastPoint[]>("predictions", fetchPredictions, {
    refreshInterval: 60_000,
  });
  const { messages, status } = useForecastStream();

  const combined = useMemo<ForecastPoint[]>(() => {
    const base = history ?? [];
    const realtime = messages.map((m) => ({
      timestamp: m.timestamp,
      prediction: m.prediction,
      model_version: m.model_version,
      tx_hash: m.tx_hash,
    }));
    return [...base, ...realtime];
  }, [history, messages]);

  const mergedKpis = useMemo(() => {
    if (!kpiData) {
      return {
        mae: null,
        rmse: null,
        data_points: combined.length,
        last_prediction: combined.at(-1) ?? null,
      };
    }
    return {
      ...kpiData,
      data_points: combined.length || kpiData.data_points,
      last_prediction: combined.at(-1) ?? kpiData.last_prediction,
    };
  }, [kpiData, combined]);

  return (
    <div className="bg-slate-950 pb-16 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-100">Analytics Studio</h1>
            <p className="text-sm text-slate-400">
              Monitor live predictions, blockchain receipts, and model performance.
            </p>
          </div>
          <NetworkStatus status={status} />
        </div>
        <KpiCards
          mae={mergedKpis.mae}
          rmse={mergedKpis.rmse}
          dataPoints={mergedKpis.data_points}
          lastPrediction={mergedKpis.last_prediction?.prediction ?? null}
        />
        <LiveForecastChart data={combined.slice(-200)} />
        <PredictionTable predictions={combined} />
      </div>
    </div>
  );
}
