import Link from "next/link";
import type { ForecastPoint } from "@/lib/api";

type Props = {
  predictions: ForecastPoint[];
};

export function PredictionTable({ predictions }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">Forecast Ledger</h3>
        <span className="text-xs text-slate-500">
          On-chain notarized predictions
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/40 text-slate-400">
            <tr>
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Prediction (kWh)</th>
              <th className="px-4 py-2 text-left">Actual (kWh)</th>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-left">Tx Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-slate-300">
            {predictions.slice(-10).reverse().map((prediction) => (
              <tr key={`${prediction.timestamp}-${prediction.prediction}`}>
                <td className="px-4 py-3">
                  {new Date(prediction.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-primary-300">
                  {prediction.prediction.toFixed(3)}
                </td>
                <td className="px-4 py-3">
                  {prediction.actual ? prediction.actual.toFixed(3) : "—"}
                </td>
                <td className="px-4 py-3">{prediction.model_version ?? "1.0.0"}</td>
                <td className="px-4 py-3">
                  {prediction.tx_hash ? (
                    <Link
                      href={`https://etherscan.io/tx/${prediction.tx_hash}`}
                      className="text-xs text-primary-400 underline"
                      target="_blank"
                    >
                      {prediction.tx_hash.slice(0, 10)}…
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
