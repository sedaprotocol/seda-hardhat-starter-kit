import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// PriceFeed Tasks
import "./tasks/transmit";
import "./tasks/latestAnswer";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.25',
  networks: {
    arbitrumSepolia: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
    },
    baseSepolia: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://sepolia.base.org',
      chainId: 84532,
    },
    flowTestnet: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://testnet.evm.nodes.onflow.org',
      chainId: 545,
      minGasPrice: 100000000,
    },
    holesky: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://ethereum-holesky-rpc.publicnode.com',
      chainId: 421614,
    },
    inkSepolia: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://rpc-gel-sepolia.inkonchain.com/',
      chainId: 763373,
    },
    seiTestnet: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://evm-rpc-testnet.sei-apis.com',
      chainId: 118,
    },
    unichainSepolia: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://sepolia.unichain.org',
      chainId: 1301,
    },
  },
  etherscan: {
    apiKey: process.env.BASE_SEPOLIA_ETHERSCAN_API_KEY || "",
    customChains: [
      {
        chainId: 84532,
        network: 'baseSepolia',
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        }
      },
      {
        chainId: 1301,
        network: 'unichainSepolia',
        urls: {
          apiURL: 'https://api-sepolia.uniscan.xyz/api',
          browserURL: 'https://sepolia.uniscan.xyz',
        }
      },
      {
        chainId: 421614,
        network: 'arbitrumSepolia',
        urls: {
          apiURL: 'https://api-sepolia.arbiscan.io/api',
          browserURL: 'https://sepolia.arbiscan.io',
        }
      }
    ]
  }
}

export default config;
