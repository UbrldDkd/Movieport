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
    color: '#dc2626',
    bg: '#2d0a0a',
    ring: '#dc262680',
  },
  {
    id: 'conquest',
    icon: GiSpadeSkull,
    label: 'C',
    color: '#f1f5f9',
    bg: '#1c1f2e',
    ring: '#f1f5f980',
  },
  {
    id: 'famine',
    icon: GiSkullSlices,
    label: 'F',
    color: '#a1a1aa',
    bg: '#111113',
    ring: '#a1a1aa80',
  },
  {
    id: 'death',
    icon: GiCaptainHatProfile,
    label: 'D',
    color: '#86efac',
    bg: '#0a1a0f',
    ring: '#86efac80',
  },
];
