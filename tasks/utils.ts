import * as fs from "fs";
import * as path from "path";
import { NetworkConfig } from "hardhat/types";

// helper function to get deployed contract address from ignition state
export function getDeployedContract(network: NetworkConfig, contractName: string): string {
  // hard-coded deployment path
  const deploymentPath = path.join(__dirname, `../ignition/deployments/chain-${network.chainId}/deployed_addresses.json`);
  if (!fs.existsSync(deploymentPath)) {
    throw new Error(`Deployment file not found for ${contractName} on network ${network.chainId}`);
  }

  // json parse the address
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));
  // access the address using the full contract name (as a key in the JSON)
  const address = deployment[contractName];

  if (!address) {
    throw new Error(`Contract ${contractName} not found in deployment file for network ${network.chainId}`);
  }

  return address;
}
