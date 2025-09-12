// This script runs before React hydration to prevent FOUC (Flash of Unstyled Content)
export const themeScript = `
(function() {
  try {
    // Prevent multiple executions
    if (document.documentElement.dataset.themeInitialized) return;
    
    const stored = localStorage.getItem('theme-storage');
    const theme = stored ? JSON.parse(stored).state.theme : 'light';
    
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    const isDark = resolvedTheme === 'dark';
    
    const root = document.documentElement;
    
    // Remove any existing theme classes first
    root.classList.remove('dark', 'light');
    
    // Apply theme classes
    root.classList.add(isDark ? 'dark' : 'light');
    
    // Apply CSS variables
    if (isDark) {
      root.style.setProperty('--background', '#0f171f');
      root.style.setProperty('--foreground', '#ffffff');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#0f171f');
    }
    
    // Mark as initialized
    root.dataset.themeInitialized = 'true';
  } catch (e) {
    // Fallback to light theme if anything goes wrong
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add('light');
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--foreground', '#0f171f');
    root.dataset.themeInitialized = 'true';
  }
})();
`
