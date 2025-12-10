type Props = {
  status: "connecting" | "open" | "closed";
};

const labels: Record<Props["status"], string> = {
  connecting: "Connecting…",
  open: "Live",
  closed: "Disconnected",
};

const colors: Record<Props["status"], string> = {
  connecting: "bg-amber-400",
  open: "bg-emerald-400",
  closed: "bg-rose-500",
};

export function NetworkStatus({ status }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-400">
      <span className={`h-2 w-2 rounded-full ${colors[status]}`} />
      {labels[status]}
    </span>
  );
}
