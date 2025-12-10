"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import { fetchPredictions } from "@/lib/api";

const fetcher = () => fetchPredictions();

export default function AnalyticsPage() {
  const { data } = useSWR("predictions:analytics", fetcher, {
    refreshInterval: 120_000,
  });

  return (
    <div className="bg-slate-950 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold text-slate-100">Analytics Insights</h1>
          <p className="text-sm text-slate-400">
            Dive deeper into forecast distributions, stability windows, and blockchain settlement proofs.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-slate-100">Prediction Distribution</h2>
            <p className="mt-2 text-sm text-slate-400">
              Mean, median, and standard deviation across the latest batch of forecasts.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p>
                Mean:{" "}
                {data?.length
                  ? (data.reduce((acc, d) => acc + d.prediction, 0) / data.length).toFixed(2)
                  : "—"}{" "}
                kWh
              </p>
              <p>
                Max:{" "}
                {data?.length
                  ? Math.max(...data.map((d) => d.prediction)).toFixed(2)
                  : "—"}{" "}
                kWh
              </p>
              <p>
                Min:{" "}
                {data?.length
                  ? Math.min(...data.map((d) => d.prediction)).toFixed(2)
                  : "—"}{" "}
                kWh
              </p>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-slate-100">Blockchain Settlement</h2>
            <p className="mt-2 text-sm text-slate-400">
              Proof-of-record ensures auditors can validate forecasting trails.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {data
                ?.filter((item) => item.tx_hash)
                .slice(-5)
                .reverse()
                .map((item) => (
                  <li key={item.tx_hash} className="flex flex-col">
                    <span className="font-medium text-primary-300">
                      {item.tx_hash?.slice(0, 10)}…
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </li>
                )) ?? <p>No notarized transactions yet.</p>}
            </ul>
          </motion.div>
        </div>
        <section className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Governance & Compliance Readiness
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            SOC2-aligned controls, audit trails through Solidity events, and append-only analytics storage enable regulators to replay every decision. Export signed payloads to downstream GRC systems via the FastAPI governance endpoint.
          </p>
        </section>
      </div>
    </div>
  );
}
