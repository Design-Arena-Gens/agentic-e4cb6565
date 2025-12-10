"use client";

import { useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

export function WalletButton() {
  const { connect, disconnect, account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error(error);
      alert("Unable to connect wallet. Please ensure MetaMask is installed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (account) {
    return (
      <button
        onClick={disconnect}
        className="flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-2 text-xs font-semibold text-primary-200 transition hover:bg-primary-500/20"
      >
        <Wallet className="h-4 w-4" />
        {account.slice(0, 6)}...{account.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary-500"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary-400" />
      ) : (
        <Wallet className="h-4 w-4 text-primary-400" />
      )}
      Connect Wallet
    </button>
  );
}
