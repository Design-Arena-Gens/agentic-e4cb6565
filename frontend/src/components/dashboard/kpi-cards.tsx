import { Activity, Brain, Database, Gauge } from "lucide-react";

type KPI = {
  label: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Props = {
  mae: number | null;
  rmse: number | null;
  dataPoints: number;
  lastPrediction: number | null;
};

export function KpiCards({ mae, rmse, dataPoints, lastPrediction }: Props) {
  const cards: KPI[] = [
    {
      label: "Mean Absolute Error",
      value: mae !== null ? `${mae.toFixed(3)} kWh` : "—",
      icon: Gauge,
    },
    {
      label: "RMSE",
      value: rmse !== null ? `${rmse.toFixed(3)} kWh` : "—",
      icon: Activity,
    },
    {
      label: "Live Forecast",
      value: lastPrediction !== null ? `${lastPrediction.toFixed(2)} kWh` : "—",
      icon: Brain,
    },
    {
      label: "Data Points (1h)",
      value: dataPoints.toString(),
      icon: Database,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary-500/10 p-3">
              <card.icon className="h-5 w-5 text-primary-400" />
            </div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {card.label}
            </p>
          </div>
          <p className="text-2xl font-semibold text-slate-100">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
