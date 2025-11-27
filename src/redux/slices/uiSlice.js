import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  rtlMode: false,
  sidebarCollapsed: false,
  searchQuery: '',
  activeRoute: '/',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleRTLMode: (state) => {
      state.rtlMode = !state.rtlMode;
    },
    setRTLMode: (state, action) => {
      state.rtlMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    }
  }
});

export const { 
  toggleDarkMode, 
  setDarkMode,
  toggleRTLMode,
  setRTLMode,
  toggleSidebar,
  setSidebarCollapsed,
  setSearchQuery,
  setActiveRoute
} = uiSlice.actions;

export default uiSlice.reducer;
