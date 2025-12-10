from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from eth_account import Account  # type: ignore[import-untyped]
from eth_account.messages import encode_defunct  # type: ignore[import-untyped]
from web3 import Web3

from app.core.config import get_settings


class BlockchainService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.web3 = Web3(Web3.HTTPProvider(self.settings.web3_rpc_url))
        self.contract = self._load_contract()

    def _load_contract(self):
        address = self.settings.ledger_contract_address
        if not address:
            return None
        abi_path = Path(__file__).resolve().parents[2] / "artifacts" / "ForecastLedger.json"
        if not abi_path.exists():
            return None
        abi = json.loads(abi_path.read_text())["abi"]
        return self.web3.eth.contract(address=self.web3.to_checksum_address(address), abi=abi)

    def record_forecast(self, payload: dict[str, Any]) -> str | None:
        if not self.contract or not self.settings.ledger_private_key:
            return None
        account = Account.from_key(self.settings.ledger_private_key)
        transaction = self.contract.functions.storeForecast(
            payload["timestamp"], payload["prediction"]
        ).build_transaction(
            {
                "from": account.address,
                "nonce": self.web3.eth.get_transaction_count(account.address),
                "gas": 500000,
                "gasPrice": self.web3.eth.gas_price,
            }
        )
        signed_tx = self.web3.eth.account.sign_transaction(transaction, self.settings.ledger_private_key)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        return tx_hash.hex()

    def sign_payload(self, payload: dict[str, Any]) -> str:
        if not self.settings.ledger_private_key:
            raise RuntimeError("ledger_private_key not configured")
        message = encode_defunct(text=json.dumps(payload, sort_keys=True))
        signed_message = Account.sign_message(message, self.settings.ledger_private_key)
        return signed_message.signature.hex()


blockchain_service = BlockchainService()
