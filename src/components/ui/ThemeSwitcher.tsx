'use client';

import { useThemeStore } from '@/stores/useThemeStore';
import { Button } from './Button';
import { Typography } from './Typography';

const themes = [
  {
    value: 'light' as const,
    name: 'Light',
    icon: '☀️',
    description: 'Tema claro',
  },
  {
    value: 'dark' as const,
    name: 'Dark',
    icon: '🌙',
    description: 'Tema oscuro',
  },
  {
    value: 'system' as const,
    name: 'System',
    icon: '💻',
    description: 'Seguir sistema',
  },
];

export function ThemeSwitcher() {
  const theme = useThemeStore(state => state.theme);
  const resolvedTheme = useThemeStore(state => state.resolvedTheme);
  const systemTheme = useThemeStore(state => state.systemTheme);
  const setTheme = useThemeStore(state => state.setTheme);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Typography variant="h6" fontFamily="cairo" className="text-center">
        Selector de Tema
      </Typography>

      <div className="flex space-x-3">
        {themes.map(themeOption => (
          <Button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            variant={theme === themeOption.value ? 'default' : 'outline'}
            className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
              theme === themeOption.value
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : 'hover:scale-105'
            }`}
          >
            <span className="text-lg">{themeOption.icon}</span>
            <Typography variant="small" weight="medium">
              {themeOption.name}
            </Typography>
          </Button>
        ))}
      </div>

      <div className="text-center space-y-1">
        <Typography variant="small" textColor="muted">
          Tema actual: <strong>{theme}</strong>
        </Typography>
        <Typography variant="small" textColor="muted">
          Aplicado: <strong>{resolvedTheme}</strong>
        </Typography>
        <Typography variant="small" textColor="muted">
          Sistema: <strong>{systemTheme}</strong>
        </Typography>
      </div>

      {/* Demostración de colores */}
      <div className="mt-6 p-4 border rounded-lg space-y-2">
        <Typography variant="small" weight="semibold" className="mb-3">
          Vista previa de colores:
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="small">Fondo:</Typography>
          <div className="w-6 h-6 rounded border-2 bg-background"></div>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="small">Texto:</Typography>
          <div className="w-6 h-6 rounded border-2 bg-foreground"></div>
        </div>
      </div>
    </div>
  );
}
