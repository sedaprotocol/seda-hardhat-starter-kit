import dotenv from "dotenv";
import { SedaConfig, networkConfigs } from "../seda.config"

dotenv.config();

export function getSedaConfig(network: string): SedaConfig {
  const config = networkConfigs[network];
  if (!config) {
    throw new Error(`SEDA network configuration for ${network} not found`);
  }
  return config;
}

export function getOracleProgramId(): string {
  const oracleProgramId = process.env.ORACLE_PROGRAM_ID || "";
  if (!oracleProgramId) {
    throw new Error(`SEDA Data Request Binary ID is unknown. Please set the \`ORACLE_PROGRAM_ID\` env var.`);
  }

  if (oracleProgramId.startsWith("0x")) {
    return oracleProgramId;
  }

  return `0x${oracleProgramId}`;
}
