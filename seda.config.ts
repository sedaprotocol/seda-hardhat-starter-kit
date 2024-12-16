export interface SedaConfig {
  coreAddress: string;
}

export const networkConfigs: { [network: string]: SedaConfig } = {
  arbitrumSepolia: {
    coreAddress: "0xb5b83ca54daeb0c5eec63dac7c92981996083b4a",
  },
  baseSepolia: {
    coreAddress: "0x42ee3e29ebae162d43a9efd93224a9bd32d1ebc4",
  },
  berachainBartio: {
    coreAddress: "0x511eac94EF52b2bb358a5162db632F38987591bF",
  },
  flowTestnet: {
    coreAddress: "0xaa88065032A8ee4C364Cb3C69744A9f976402388",
  },
  holesky: {
    coreAddress: "0x83D2660c4aE8F5685B022c3e6bc9F6D3Ef60eF45",
  },
  inkSepolia: {
    coreAddress: "0x93EAE6368b56383485645d2EebdCE4fF9f77d72C",
  },
  seiTestnet: {
    coreAddress: "0x83D2660c4aE8F5685B022c3e6bc9F6D3Ef60eF45",
  },
  unichainSepolia: {
    coreAddress: "0xFFCd728685029dA7c72875C1c03b6960E3d94334",
  },
};
