import normalizeSize from '@/utils/normalizeSize';

export const Colors = {
    primary: '#455464',
    secondary: '#F6EDE0',
    background: '#FBF5ED',
    option: '#D4D4D8',
    error: '#B84C4C',

    white: '#FFFFFF',
    black: '#111111',
    gray: '#767676',
    darkGray: '#505050',
    navy: '#3F5466',
    red: '#ED442D',
    blue: '#0038FF',
    brown: '#9F5A00',
};

export const FontSize = {
    title: normalizeSize(30),
    subTitle: normalizeSize(22),
    body: normalizeSize(16),
    caption: normalizeSize(14),
    label: normalizeSize(12),
};

export const Spacing = {
    0: 0,
    4: normalizeSize(4),
    8: normalizeSize(8),
    12: normalizeSize(12),
    16: normalizeSize(16),
};
