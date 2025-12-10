import { ethers } from "hardhat";

async function main() {
  const ForecastLedger = await ethers.getContractFactory("ForecastLedger");
  const ledger = await ForecastLedger.deploy();
  await ledger.deployed();
  console.log(`ForecastLedger deployed to ${ledger.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
