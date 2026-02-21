import {
  GiDesertSkull,
  GiSpadeSkull,
  GiSkullSlices,
  GiCaptainHatProfile,
} from 'react-icons/gi';

export const PRESET_AVATARS = [
  {
    id: 'war',
    icon: GiDesertSkull,
    label: 'W',
    color: '#c5c5c5',
    bg: '#2d0a0a',
  },
  {
    id: 'conquest',
    icon: GiSpadeSkull,
    label: 'C',
    color: '#6e6e6e',
    bg: '#eaeaea',
  },
  {
    id: 'famine',
    icon: GiSkullSlices,
    label: 'F',
    color: '#580b0b',
    bg: '#111113',
  },
  {
    id: 'death',
    icon: GiCaptainHatProfile,
    label: 'D',
    color: '#090909',
    bg: '#909090',
    ring: '#86efac80',
  },
];
