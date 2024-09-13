import { getDeployedContract } from "./utils";
import { priceFeedScope } from "./scope";

priceFeedScope.task("latest-answer", "Calls the latestAnswer function on the PriceFeed contract")
  .addOptionalParam("contract", "The PriceFeed contract address")
  .setAction(async ({ contract }, hre) => {
    // fetch the address from deployments if not provided
    let priceFeedAddress = contract;
    if (!priceFeedAddress) {
      console.log("No contract address specified, fetching from previous deployments...");
      priceFeedAddress = getDeployedContract(hre.network.config, 'PriceFeedModule#PriceFeed');
      console.log("Contract found:", priceFeedAddress);
    }

    // get the contract instance
    const priceFeed = await hre.ethers.getContractAt("PriceFeed", priceFeedAddress);

    // call the latest answer function
    console.log(`\nCalling latestAnswer() on PriceFeed at ${priceFeedAddress}`);
    const tx = await priceFeed.latestAnswer();
    console.log("Result:", tx);
  });