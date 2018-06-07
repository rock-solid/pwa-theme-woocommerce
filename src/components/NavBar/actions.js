// menu
export const MENU_OPEN = 'MENU_OPEN';
export const MENU_CLOSE = 'MENU_CLOSE';

export const openMenu = () => ({
  type: MENU_OPEN,
});

export const closeMenu = () => ({
  type: MENU_CLOSE,
});

// search input
export const SEARCH_OPEN = 'SEARCH_OPEN';
export const SEARCH_CLOSE = 'SEARCH_CLOSE';

export const openSearch = () => ({
  type: SEARCH_OPEN,
});

export const closeSearch = () => ({
  type: SEARCH_CLOSE,
});
