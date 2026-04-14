export interface PaletteDefinition {
  name: string;
  colors: string[]; // hex strings
}

export const BUILT_IN_PALETTES: Record<string, PaletteDefinition> = {
  db16: {
    name: 'DawnBringer 16',
    colors: [
      '#140c1c', '#442434', '#30346d', '#4e4a4e',
      '#854c30', '#346524', '#d04648', '#757161',
      '#597dce', '#d27d2c', '#8595a1', '#6daa2c',
      '#d2aa99', '#6dc2ca', '#dad45e', '#deeed6',
    ],
  },
  db32: {
    name: 'DawnBringer 32',
    colors: [
      '#000000', '#222034', '#45283c', '#663931',
      '#8f563b', '#df7126', '#d9a066', '#eec39a',
      '#fbf236', '#99e550', '#6abe30', '#37946e',
      '#4b692f', '#524b24', '#323c39', '#3f3f74',
      '#306082', '#5b6ee1', '#639bff', '#5fcde4',
      '#cbdbfc', '#ffffff', '#9badb7', '#847e87',
      '#696a6a', '#595652', '#76428a', '#ac3232',
      '#d95763', '#d77bba', '#8f974a', '#8a6f30',
    ],
  },
  pico8: {
    name: 'PICO-8',
    colors: [
      '#000000', '#1d2b53', '#7e2553', '#008751',
      '#ab5236', '#5f574f', '#c2c3c7', '#fff1e8',
      '#ff004d', '#ffa300', '#ffec27', '#00e436',
      '#29adff', '#83769c', '#ff77a8', '#ffccaa',
    ],
  },
  nes: {
    name: 'NES',
    colors: [
      '#7c7c7c', '#0000fc', '#0000bc', '#4428bc',
      '#940084', '#a80020', '#a81000', '#881400',
      '#503000', '#007800', '#006800', '#005800',
      '#004058', '#000000', '#000000', '#000000',
      '#bcbcbc', '#0078f8', '#0058f8', '#6844fc',
      '#d800cc', '#e40058', '#f83800', '#e45c10',
      '#ac7c00', '#00b800', '#00a800', '#00a844',
      '#008888', '#000000', '#000000', '#000000',
      '#f8f8f8', '#3cbcfc', '#6888fc', '#9878f8',
      '#f878f8', '#f85898', '#f87858', '#fca044',
      '#f8b800', '#b8f818', '#58d854', '#58f898',
      '#00e8d8', '#787878', '#000000', '#000000',
      '#fcfcfc', '#a4e4fc', '#b8b8f8', '#d8b8f8',
      '#f8b8f8', '#f8a4c0', '#f0d0b0', '#fce0a8',
      '#f8d878', '#d8f878', '#b8f8b8', '#b8f8d8',
      '#00fcfc', '#f8d8f8', '#000000', '#000000',
    ],
  },
  gameboy: {
    name: 'GameBoy',
    colors: [
      '#0f380f', '#306230', '#8bac0f', '#9bbc0f',
    ],
  },
  endesga32: {
    name: 'Endesga 32',
    colors: [
      '#be4a2f', '#d77643', '#ead4aa', '#e4a672',
      '#b86f50', '#733e39', '#3e2731', '#a22633',
      '#e43b44', '#f77622', '#feae34', '#fee761',
      '#63c74d', '#3e8948', '#265c42', '#193c3e',
      '#124e89', '#0099db', '#2ce8f5', '#ffffff',
      '#c0cbdc', '#8b9bb4', '#5a6988', '#3a4466',
      '#262b44', '#181425', '#ff0044', '#68386c',
      '#b55088', '#f6757a', '#e8b796', '#c28569',
    ],
  },
  resurrect64: {
    name: 'Resurrect 64',
    colors: [
      '#2e222f', '#3e3546', '#625565', '#966c6c',
      '#ab947a', '#694f62', '#7f708a', '#9babb2',
      '#c7dcd0', '#ffffff', '#6e2727', '#b33831',
      '#ea4f36', '#f57d4a', '#ae2334', '#e83b3b',
      '#fb6b1d', '#f79617', '#f9c22b', '#7a3045',
      '#9e4539', '#cd683d', '#e6904e', '#fbb954',
      '#4c3e24', '#676633', '#a2a947', '#d5e04b',
      '#fbff86', '#165a4c', '#239063', '#1ebc73',
      '#91db69', '#cddf6c', '#313638', '#374e4a',
      '#547e64', '#92a984', '#b2ba90', '#0b5e65',
      '#0b8a8f', '#0eaf9b', '#30e1b9', '#8ff8e2',
      '#323353', '#484a77', '#4d65b4', '#4d9be6',
      '#8fd3ff', '#45293f', '#6b3e75', '#905ea9',
      '#a884f3', '#eaaded', '#753c54', '#a24b6f',
      '#cf657f', '#ed8099', '#831c5d', '#c32454',
      '#f04f78', '#f68181', '#fca790', '#fdcbb0',
    ],
  },
};

export function getPaletteNames(): string[] {
  return Object.keys(BUILT_IN_PALETTES);
}

export function getPalette(name: string): PaletteDefinition | undefined {
  return BUILT_IN_PALETTES[name.toLowerCase()];
}
