import { network, ethers } from "hardhat";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getOracleProgramId, getSedaConfig } from "../sedaUtils";

const PriceFeedModule = buildModule("PriceFeedModule", (m) => {
    // PriceFeed contract parameters
    let proverAddress;
    let oracleProgramId;

    // Fetch network-specific parameters if not on the local hardhat network
    if (network.name !== "hardhat") {
        // Ensure required parameters are available
        const sedaConfig = getSedaConfig(network.name);
        proverAddress = m.getParameter("sedaProverContract", sedaConfig.proverAddress);
        oracleProgramId = m.getParameter("binaryId", getOracleProgramId());
    } else {
        // For local deployments, deploy the SedaProverMock contract
        const sedaProverMock = m.contract("SedaProverMock", []);
        proverAddress = sedaProverMock;
        oracleProgramId = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }

    // Deploy the PriceFeed contract with the required parameters
    const priceFeed = m.contract("PriceFeed", [proverAddress, oracleProgramId]);

    return { priceFeed: priceFeed };
});

export default PriceFeedModule;
