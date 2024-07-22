interface Color {
  name: string;
  color: string;
}

export const colorPalette: Color[] = [
  { name: 'AntiqueWhite', color: '#FAEBD7' },
  { name: 'AquamarineDull', color: '#9ae0c9' },
  { name: 'AliceBlueDarker', color: '#d2e0ec' },
  { name: 'AzureDarker', color: '#d8ebeb' },
  { name: 'CadetBlue', color: '#5F9EA0' },
  { name: 'CornflowerBlue', color: '#6495ED' },
  { name: 'DarkSeaGreen', color: '#8FBC8F' },
  { name: 'GreenManual', color: '#7CBC62' },
  { name: 'LavenderDarker', color: '#d5d5ef' },
  { name: 'LavenderBlushDarker', color: '#eed8df' },
  { name: 'LemonChiffonDarker', color: '#f9f3b9' },
  { name: 'LightBlue', color: '#ADD8E6' },
  { name: 'LightCyanDarker', color: '#beebeb' },
  { name: 'LightGreen', color: '#90EE90' },
  { name: 'LightSkyBlue', color: '#87CEFA' },
  { name: 'LightSteelBlue', color: '#B0C4DE' },
  { name: 'MistyRose', color: '#FFE4E1' },
  { name: 'PapayaWhipDarker', color: '#fee9c9' },
  { name: 'PaleTurquoise', color: '#AFEEEE' },
  { name: 'PeachPuff', color: '#FFDAB9' },
  { name: 'Plum', color: '#DDA0DD' },
  { name: 'RosyBrown', color: '#BC8F8F' },
  { name: 'SkyBlue', color: '#87CEEB' },
];

export const getRandomColor = (): Color => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
};

