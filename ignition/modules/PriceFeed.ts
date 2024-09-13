import { network, ethers } from "hardhat";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getOracleProgramId, getSedaConfig } from "../sedaUtils";

const PriceFeedModule = buildModule("PriceFeedModule", (m) => {
    // required parameters to deploy Price Feed
    let proverAddress;
    let oracleProgramId;
    // get parameters from seda.config.ts
    if (network.name != "hardhat") {
        proverAddress = m.getParameter("sedaProverContract", getSedaConfig(network.name).proverAddress);
        oracleProgramId = m.getParameter("binaryId", getOracleProgramId());
    } else { // local deployment
        const sedaProverMock = m.contract("SedaProverMock", []);
        proverAddress = sedaProverMock;
        oracleProgramId = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }

    // deploy contract
    const priceFeed = m.contract("PriceFeed", [proverAddress, oracleProgramId]);

    return { priceFeed: priceFeed };
});

export default PriceFeedModule;
