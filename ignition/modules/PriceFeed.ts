import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers, network } from 'hardhat';
import { getOracleProgramId, getSedaConfig } from '../sedaUtils';

const PriceFeedModule = buildModule('PriceFeedModule', (m) => {
  // biome-ignore lint/suspicious/noExplicitAny:
  let coreAddress: any;
  // biome-ignore lint/suspicious/noExplicitAny:
  let oracleProgramId: any;

  // Fetch network-specific parameters if not on the local hardhat network
  if (network.name !== 'hardhat') {
    // Ensure required parameters are available
    const sedaConfig = getSedaConfig(network.name);
    coreAddress = m.getParameter('sedaCoreContract', sedaConfig.coreAddress);
    oracleProgramId = m.getParameter('binaryId', getOracleProgramId());
  } else {
    // For local deployments, deploy the SedaPermissioned contract
    const deployer = m.getAccount(0);
    const sedaPermissioned = m.contract('SedaPermissioned', [[deployer], 1]);
    coreAddress = sedaPermissioned;
    oracleProgramId = '0x0000000000000000000000000000000000000000000000000000000000000000';
  }

  // Deploy the PriceFeed contract with the required parameters
  const priceFeed = m.contract('PriceFeed', [coreAddress, oracleProgramId]);

  return { priceFeed };
});

export default PriceFeedModule;
