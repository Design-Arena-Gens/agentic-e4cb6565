import Link from "next/link";
import { WalletButton } from "@/components/web3/wallet-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-primary-400">DEF</span>
          <span className="text-slate-200">orecast</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-primary-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-primary-500/20 transition hover:bg-primary-400 md:inline-flex"
          >
            Launch App
          </Link>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
