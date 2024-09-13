import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PriceFeed Contract", function () {
    async function deployPriceFeedFixture() {
        // A Data Request WASM binary ID
        const drBinaryId = "0x0000000000000000000000000000000000000000000000000000000000000000";

        // Deploy a mock of the SedaProver contract
        const SedaProver = await ethers.getContractFactory("SedaProverMock");
        const sedaProver = await SedaProver.deploy();

        // Deploy the PriceFeed contract
        const PriceFeed = await ethers.getContractFactory("PriceFeed");
        const priceFeed = await PriceFeed.deploy(sedaProver.getAddress(), drBinaryId);

        return { priceFeed, sedaProver };
    }

    it("Should not have any latest answer (zero)", async function () {
        const { priceFeed, sedaProver } = await loadFixture(deployPriceFeedFixture);

        await priceFeed.transmit();

        const result = await priceFeed.latestAnswer();
        expect(result).to.be.equal(0);
    });

    it("Should return the correct latest answer if consensus is reached", async function () {
        const { priceFeed, sedaProver } = await loadFixture(deployPriceFeedFixture);

        await priceFeed.transmit();
        const dr_id = await priceFeed.data_request_id();
        const tx = await sedaProver.setDataResult(dr_id, true, "0x0000000000000000000000000e9de9b0");

        const latestAnswer = await priceFeed.latestAnswer();
        expect(latestAnswer).to.equal(245230000);
    });

    it("Should return latest answer (zero) if consensus is not reached", async function () {
        const { priceFeed, sedaProver } = await loadFixture(deployPriceFeedFixture);

        await priceFeed.transmit();
        const dr_id = await priceFeed.data_request_id();

        const resultValue = new ethers.AbiCoder().encode(["uint128"], [BigInt(100)]);
        const tx = await sedaProver.setDataResult(dr_id, false, resultValue);

        const latestAnswer = await priceFeed.latestAnswer();
        expect(latestAnswer).to.equal(0);
    });
});
