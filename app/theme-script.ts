/**
 * Runs before first paint (inlined in <head>) so a stored theme choice never flashes.
 * Without a stored choice nothing is set and the CSS follows prefers-color-scheme.
 */
export const THEME_STORAGE_KEY = 'theme';

export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`;
