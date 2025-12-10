import { create } from "zustand";
import { BrowserProvider, Eip1193Provider } from "ethers";

type WalletState = {
  provider: BrowserProvider | null;
  account: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

export const useWallet = create<WalletState>((set) => ({
  provider: null,
  account: null,
  chainId: null,
  connect: async () => {
    if (typeof window === "undefined") return;
    const { ethereum } = window as typeof window & {
      ethereum?: Eip1193Provider;
    };
    if (!ethereum) {
      throw new Error("MetaMask not detected");
    }
    const accounts = (await ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    const provider = new BrowserProvider(ethereum);
    const network = await provider.getNetwork();

    set({
      provider,
      account: accounts[0],
      chainId: Number(network.chainId),
    });
  },
  disconnect: () => {
    set({
      provider: null,
      account: null,
      chainId: null,
    });
  },
}));
