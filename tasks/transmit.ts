import { priceFeedScope } from './scope';
import { getDeployedContract } from './utils';

/**
 * Task: Calls the transmit function on the PriceFeed contract.
 * Optional parameter: contract (PriceFeed contract address).
 * If the contract address is not provided, fetches from previous deployments.
 */
priceFeedScope
  .task('transmit', 'Calls the transmit function on the PriceFeed contract')
  .addOptionalParam('contract', 'The PriceFeed contract address')
  .setAction(async ({ contract }, hre) => {
    try {
      // Fetch the address from previous deployments if not provided
      let priceFeedAddress = contract;
      if (!priceFeedAddress) {
        console.log('No contract address specified, fetching from previous deployments...');
        priceFeedAddress = getDeployedContract(hre.network.config, 'PriceFeedModule#PriceFeed');
        console.log('Contract found:', priceFeedAddress);
      }

      // Get the PriceFeed contract instance
      const priceFeed = await hre.ethers.getContractAt('PriceFeed', priceFeedAddress);

      // Call the transmit function
      console.log(`\nCalling transmit() on PriceFeed at ${priceFeedAddress}...`);
      const tx = await priceFeed.transmit(
        hre.ethers.parseEther('0.0001'),
        hre.ethers.parseEther('0.0001'),
        hre.ethers.parseEther('0.0001'),
        { value: hre.ethers.parseEther('0.0003') },
      );

      // Wait for the transaction
      await tx.wait();
      console.log('Transmit executed successfully.');
      // biome-ignore lint/suspicious/noExplicitAny:
    } catch (error: any) {
      console.error('An error occurred during the transmit function:', error.message);
    }
  });
