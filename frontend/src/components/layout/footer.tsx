export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 md:flex-row md:text-sm">
        <p>&copy; {new Date().getFullYear()} Decentralized Energy Forecasting.</p>
        <p className="text-center">
          Powered by AI-driven forecasting, on-chain notarization, and decentralized analytics.
        </p>
      </div>
    </footer>
  );
}
