export interface SedaConfig {
  coreAddress: string;
}

export const networkConfigs: { [network: string]: SedaConfig } = {
  arbitrumSepolia: {
    coreAddress: "0x23f48aF75FAf636C04404559f147b1f869468Bf0",
  },
  baseSepolia: {
    coreAddress: "0x947ACD63051123AEb408C30F99629a33ad45A332",
  },
  berachainBartio: {
    coreAddress: "0x1196A95DC50C41745D8aDb6d81e1D3e7c0C10886",
  },
  flowTestnet: {
    coreAddress: "0xfEa3d44F35885F27E6B8afa254F48BC3B9344710",
  },
  holesky: {
    coreAddress: "0x6b7edf46c6788767fed40361E015d4195802719E",
  },
  inkSepolia: {
    coreAddress: "0x8A3293f9779Bb66c3D59D9e7131089B684E9C07f",
  },
  seiTestnet: {
    coreAddress: "0xFC56540ff9f914Ea66d9783890B50385132548DB",
  },
  unichainSepolia: {
    coreAddress: "0x132813598863b764039ac08869385e45E2D8D34b",
  },
};
