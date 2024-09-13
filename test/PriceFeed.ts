import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PriceFeed Contract", function () {
    // Setup the fixture to deploy contracts
    async function deployPriceFeedFixture() {
        // A Data Request WASM binary ID (mock value)
        const drBinaryId = ethers.ZeroHash;

        // Deploy a mock of the SedaProver contract
        const SedaProver = await ethers.getContractFactory("SedaProverMock");
        const sedaProver = await SedaProver.deploy();

        // Deploy the PriceFeed contract
        const PriceFeed = await ethers.getContractFactory("PriceFeed");
        const priceFeed = await PriceFeed.deploy(sedaProver.getAddress(), drBinaryId);

        return { priceFeed, sedaProver };
    }

    /**
     * Test Case 1: No transmission before `latestAnswer`
     * Ensure that calling latestAnswer without transmitting a data request first reverts.
     */
    it("Should revert if data request is not transmitted", async function () {
        const { priceFeed } = await loadFixture(deployPriceFeedFixture);

        // Attempting to call latestAnswer without a transmission should revert
        await expect(priceFeed.latestAnswer()).to.be.revertedWith("No data request transmitted");
    });

    /**
     * Test Case 2: No data result found
     * Ensure that calling latestAnswer after transmission but without setting a data result reverts.
     */
    it("Should revert if data result is not found", async function () {
        const { priceFeed } = await loadFixture(deployPriceFeedFixture);

        // Transmit the data request (but no result set)
        await priceFeed.transmit();

        // latestAnswer should revert due to no data result being set
        await expect(priceFeed.latestAnswer()).to.be.revertedWith("Data result not found");
    });

    /**
     * Test Case 3: Return correct `latestAnswer` with consensus (true)
     * Verify that latestAnswer returns the correct value when consensus is reached.
     */
    it("Should return the correct latest answer if consensus is reached", async function () {
        const { priceFeed, sedaProver } = await loadFixture(deployPriceFeedFixture);

        // Transmit a data request
        await priceFeed.transmit();
        const dataRequestId = await priceFeed.dataRequestId();

        // Set a data result with consensus in the mock contract
        const resultValue = "0x0000000000000000000000000e9de9b0"; // Mock value (245230000)
        await sedaProver.setDataResult(dataRequestId, true, resultValue);

        // latestAnswer should return the expected result when consensus is reached
        const latestAnswer = await priceFeed.latestAnswer();
        expect(latestAnswer).to.equal(245230000);
    });

    /**
      * Test Case 4: Return zero if no consensus reached
      * Ensure that latestAnswer returns 0 when no consensus is reached.
      */
    it("Should return latest answer (zero) if consensus is not reached", async function () {
        const { priceFeed, sedaProver } = await loadFixture(deployPriceFeedFixture);

        // Transmit a data request
        await priceFeed.transmit();
        const dataRequestId = await priceFeed.dataRequestId();

        // Set a data result without consensus (false)
        const resultValue = new ethers.AbiCoder().encode(["uint128"], [BigInt(100)]); // Mock value of 100
        await sedaProver.setDataResult(dataRequestId, false, resultValue);

        // latestAnswer should return 0 since no consensus was reached
        const latestAnswer = await priceFeed.latestAnswer();
        expect(latestAnswer).to.equal(0);
    });

    /**
     * Test Case 5: Successful transmission
     * Ensure that a data request is correctly transmitted and the request ID is valid.
     */
    it("Should successfully transmit a data request and return a valid request ID", async function () {
        const { priceFeed } = await loadFixture(deployPriceFeedFixture);

        // Assert data request id is zero
        let dataRequestId = await priceFeed.dataRequestId();
        expect(dataRequestId).to.be.equal(ethers.ZeroHash);

        // Call the transmit function
        await priceFeed.transmit();

        // Check that the data request ID is valid and stored correctly
        dataRequestId = await priceFeed.dataRequestId();
        expect(dataRequestId).to.not.be.equal(ethers.ZeroHash);
    });
});
