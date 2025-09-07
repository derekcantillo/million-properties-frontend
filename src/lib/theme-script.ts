// This script runs before React hydration to prevent FOUC (Flash of Unstyled Content)
export const themeScript = `
(function() {
  try {
    const stored = localStorage.getItem('theme-storage');
    const theme = stored ? JSON.parse(stored).state.theme : 'system';
    
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    const isDark = resolvedTheme === 'dark';
    
    const root = document.documentElement;
    
    // Apply theme classes
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    
    // Apply CSS variables
    if (isDark) {
      root.style.setProperty('--background', '#0f171f');
      root.style.setProperty('--foreground', '#ffffff');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#0f171f');
    }
  } catch (e) {
    // Fallback to light theme if anything goes wrong
    const root = document.documentElement;
    root.classList.add('light');
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--foreground', '#0f171f');
  }
})();
`
