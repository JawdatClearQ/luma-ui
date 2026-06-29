"use client";

import React, { createContext, useContext } from 'react';
import { TamaguiProvider, createTamagui } from 'tamagui';
import { tokens } from './tokens';

const config = createTamagui({
  tokens,
  themes: {
    light: {
      background: tokens.color.white,
      color: tokens.color.neutral900,
      primary: tokens.color.primary500,
      secondary: tokens.color.secondary500,
    },
    dark: {
      background: tokens.color.neutral900,
      color: tokens.color.white,
      primary: tokens.color.primary400,
      secondary: tokens.color.secondary400,
    },
  },
});

type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export const LumaProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}> = ({ children, defaultTheme = 'light' }) => {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      {children}
    </TamaguiProvider>
  );
};

const ThemeContext = createContext({ colorMode: 'light' as 'light' | 'dark' });

export function useTheme() {
  return useContext(ThemeContext);
}

export function extendTheme(overrides: Record<string, any>) {
  return createTamagui({
    tokens,
    ...overrides,
  });
}

export { config, tokens };
