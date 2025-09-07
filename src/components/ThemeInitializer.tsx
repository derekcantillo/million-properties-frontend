'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

/**
 * Component that initializes the theme system
 * Should be rendered early in the app lifecycle
 */
export function ThemeInitializer() {
  const initializeTheme = useThemeStore(state => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return null;
}
