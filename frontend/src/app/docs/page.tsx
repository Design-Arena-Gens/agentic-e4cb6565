"use client";

import Link from "next/link";
import { FileText, Workflow, Zap } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="bg-slate-950 py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1 text-xs uppercase tracking-wide text-primary-300">
            Documentation
          </span>
          <h1 className="text-3xl font-semibold text-slate-100">Developer Handbook</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            All assets are bundled within the monorepo. Architecture diagrams and ops runbooks are available in <code>docs/</code>.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FileText,
              title: "System Architecture",
              description: "Understand services, data flow, and integration boundaries.",
              href: "/docs/architecture",
            },
            {
              icon: Workflow,
              title: "Deployment",
              description: "Docker, Kubernetes, and CI/CD automation blueprints.",
              href: "/docs/deployment",
            },
            {
              icon: Zap,
              title: "Realtime + ML",
              description: "Streaming pipeline, LSTM lifecycle, and inference tuning.",
              href: "/docs/ml-pipeline",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="glass-panel flex flex-col gap-3 p-6"
            >
              <item.icon className="h-6 w-6 text-primary-400" />
              <h2 className="text-lg font-semibold text-slate-100">
                {item.title}
              </h2>
              <p className="text-sm text-slate-400">{item.description}</p>
            </Link>
          ))}
        </div>
        <section className="glass-panel space-y-4 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Repository Map</h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <code>frontend/</code> — Next.js + Tailwind analytics experience layer.
            </li>
            <li>
              <code>backend/</code> — FastAPI, PyTorch inference, Redis/Kafka integration.
            </li>
            <li>
              <code>spark_pipeline/</code> — PySpark structured streaming job.
            </li>
            <li>
              <code>blockchain/</code> — Hardhat project for ForecastLedger smart contract and deployment scripts.
            </li>
            <li>
              <code>k8s/</code> — Production-ready manifests for cloud orchestration.
            </li>
          </ul>
        </section>
        <section className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Need more?
          </h2>
          <p className="text-sm text-slate-400">
            Extend the documentation site by statically rendering Markdown from the <code>docs</code> folder or integrate with a headless CMS for collaborative updates.
          </p>
        </section>
      </div>
    </div>
  );
}
