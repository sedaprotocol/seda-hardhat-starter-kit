import dotenv from "dotenv";
import { SedaConfig, networkConfigs } from "../seda.config"

dotenv.config();

/**
 * Fetches the SEDA network configuration based on the provided network name.
 * @param network The name of the network (e.g., 'mainnet', 'goerli', etc.).
 * @returns SedaConfig The configuration object for the given network.
 * @throws Error if the network configuration is not found.
 */
export function getSedaConfig(network: string): SedaConfig {
  const config = networkConfigs[network];
    if (!config) {
      throw new Error(`SEDA network configuration for ${network} not found`);
    }

  return config;
}

/**
 * Retrieves the Oracle Program ID from the environment variables.
 * Ensures the ID is correctly formatted as a hex string.
 * @returns string The Oracle Program ID (hex-encoded).
 * @throws Error if the ORACLE_PROGRAM_ID is not set or invalid.
 */
export function getOracleProgramId(): string {
  // Retrieve Oracle Program ID from environment variables
  const oracleProgramId = process.env.ORACLE_PROGRAM_ID || "";

  // Check if the Oracle Program ID is not empty
  if (!oracleProgramId) {
    throw new Error(`SEDA Data Request Binary ID is unknown. Please set the 'ORACLE_PROGRAM_ID' environment variable.`);
  }

  // Ensure the Oracle Program ID is properly formatted as a hex string
  if (oracleProgramId.startsWith("0x")) {
    return oracleProgramId;
  }

  // Automatically add "0x" if missing
  return `0x${oracleProgramId}`;
}
