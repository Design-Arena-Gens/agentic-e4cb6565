import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ForecastPoint } from "@/lib/api";

type Props = {
  data: ForecastPoint[];
};

export function LiveForecastChart({ data }: Props) {
  const chartData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    prediction: point.prediction,
    actual: point.actual ?? null,
  }));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">Real-time Forecast</h3>
        <span className="text-xs text-slate-500">
          {chartData.length} data points
        </span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0b8cff" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#0b8cff" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
              }}
            />
            <Area type="monotone" dataKey="prediction" stroke="#0b8cff" fill="url(#colorPrediction)" strokeWidth={2} />
            <Area type="monotone" dataKey="actual" stroke="#22c55e" fill="url(#colorActual)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
