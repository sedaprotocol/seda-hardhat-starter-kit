<p align="center">
  <a href="https://seda.xyz/">
    <img width="90%" alt="seda-protocol" src="https://www.seda.xyz/images/footer/footer-image.png">
  </a>
</p>

<h1 align="center">
  SEDA Hardhat Starter Kit
</h1>

This starter kit is built on a minimal Hardhat boilerplate, focusing on simplicity to showcase how to interact with the SEDA network. It features a sample consumer contract (PriceFeed) that interacts with the SEDA protocol through a Prover Contract, demonstrating how to create and retrieve data requests on the network.

## Getting Started

Clone the repository and install the dependencies:

```sh
git clone git@github.com:sedaprotocol/seda-hardhat-starter-kit.git
cd seda-hardhat-starter-kit
npm install
```

### Project Structure

This project follows the structure of a typical Hardhat project:

* **contracts/**: Contains the Solidity contracts including PriceFeed.
* **ignition/**: Ignition deployment modules for deploying contracts.
* **tasks/**: Hardhat tasks for interacting with the PriceFeed contract.
* **test/**: Test files for the contracts.

## Compiling and Testing the Contracts

Compile your contracts and run tests to ensure everything works correctly:

```sh
npx hardhat compile
npx hardhat test
```

## Deploying the Contracts

Deploy the `PriceFeed` contract using Hardhat Ignition with a specific SEDA configuration:

```sh
npx hardhat ignition deploy ./ignition/modules/PriceFeed.ts --network baseSepolia --verify
```

> [!NOTE]
> The project includes a `seda.config.ts` file that includes SEDA-specific configurations. This file allows you to define and modify configurations such as the addresses of Prover Contracts on different networks.

## Interacting with Deployed Contracts

Use Hardhat tasks specifically designed for interacting with the PriceFeed contract.

**Transmit a Data Request**: Calls the transmit function on PriceFeed to trigger a data request post on the SEDA network.

```sh
npx hardhat pricefeed transmit --network <network_name>
```

**Fetch Latest Answer**: Calls the latestAnswer function on PriceFeed to get the result of the data request.

```sh
npx hardhat pricefeed latest-answer --network <network_name>
```

## Environment Variables

Configure the .env file with the necessary variables. Here is an example .env file:

```
ORACLE_PROGRAM_ID=YOUR_ORACLE_PROGRAM_ID
EVM_PRIVATE_KEY=YOUR_EVM_PRIVATE_KEY
BASE_SEPOLIA_ETHERSCAN_API_KEY=YOUR_BASESCAN_API_KEY
```

## Additional Resources

* [**SEDA Protocol Documentation**](https://docs.seda.xyz): Learn more about how to build on the SEDA network and interact with data requests.
* [**Hardhat Documentation**](https://hardhat.org/docs): Understand how to use Hardhat for developing, deploying, and testing your contracts.

## License

Contents of this repository are open source under [MIT License](LICENSE).