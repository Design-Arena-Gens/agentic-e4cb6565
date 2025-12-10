export default function Home() {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:flex-row md:items-center md:gap-16 md:pt-24">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs uppercase tracking-wide text-primary-300">
              Web3 + AI + Energy
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-100 md:text-6xl">
              Real-time decentralized energy forecasting for resilient grids.
            </h1>
            <p className="max-w-xl text-lg text-slate-400">
              Fuse LSTM-powered intelligence, low-latency streaming, and blockchain-backed trust to forecast energy flows at city scale. Designed for utilities, microgrids, and energy traders.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-primary-500/30 transition hover:bg-primary-400"
              >
                Launch Analytics Studio
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-primary-500"
              >
                Explore Features
              </a>
            </div>
            <div className="grid gap-6 pt-8 sm:grid-cols-3">
              {[
                { label: "Forecast Horizon", value: "60 min" },
                { label: "Latency", value: "< 2 sec" },
                { label: "Blockchain Proofs", value: "On-chain" },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-slate-100">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel relative flex-1 overflow-hidden border-slate-800 bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-slate-900 p-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide text-primary-300">
                Streaming Telemetry
              </p>
              <pre className="max-h-80 overflow-hidden rounded-2xl bg-slate-950/80 p-4 text-xs text-primary-200">
{`{\n  "timestamp": "2024-05-14T08:12:00Z",\n  "energy_consumption": 1245.21,\n  "temperature": 26.4,\n  "humidity": 58.1,\n  "wind_speed": 4.8,\n  "solar_irradiance": 445.9\n}`}
              </pre>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase text-slate-500">LSTM Inference</p>
              <p className="text-3xl font-semibold text-primary-300">
                1279.42 kWh
              </p>
              <p className="text-xs text-slate-500">Forecast in 60 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-900 bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold text-slate-100 md:text-4xl">
            End-to-end intelligence stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Modular architecture layering Spark streaming, FastAPI microservices, PyTorch LSTM, and Ethereum notarization — orchestrated via Kubernetes and CI/CD pipelines.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Streaming Feature Fabric",
                description:
                  "Spark Structured Streaming transforms raw telemetry into feature-rich windows optimized for LSTM inference.",
              },
              {
                title: "Intelligent API Mesh",
                description:
                  "FastAPI cluster serves REST + WebSocket endpoints, orchestrates inference, and pushes forecasts to real-time consumers.",
              },
              {
                title: "On-chain Assurance",
                description:
                  "Solidity smart contract immutably stores prediction proofs so grid stakeholders can audit every decision.",
              },
              {
                title: "Observability Backbone",
                description:
                  "MongoDB, PostgreSQL, and Redis power long-term analytics, metadata management, and sub-second streaming fan-out.",
              },
              {
                title: "AI/ML Lifecycle",
                description:
                  "PyTorch LSTM with versioned checkpoints, MLOps hooks, and reproducible pipelines for continuous improvement.",
              },
              {
                title: "Enterprise DevOps",
                description:
                  "Dockerized microservices, Kubernetes manifests, and GitHub Actions CI/CD ensure reliable deployments.",
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wide text-primary-300">
              Platform highlights
            </span>
            <h2 className="text-3xl font-semibold text-slate-100">
              Built for mission-critical energy orchestration
            </h2>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400" />
                Sovereign data plane with on-prem + edge options.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400" />
                Seamless wallet integration for market participants.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400" />
                Observability hooks for Prometheus, OpenTelemetry, and Grafana.
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8">
            <h3 className="text-lg font-semibold text-slate-100">
              Deployment Topology
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <li>• Kubernetes (EKS/GKE/AKS) with multi-AZ node pools.</li>
              <li>• GitHub Actions CI/CD with policy-as-code checks.</li>
              <li>• ArgoCD for GitOps synchronization.</li>
              <li>• Vercel hosting for the Next.js experience layer.</li>
            </ul>
            <a
              href="/docs"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-primary-500 px-5 py-2 text-sm font-semibold text-primary-300 transition hover:bg-primary-500/10"
            >
              Read the architecture docs →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
