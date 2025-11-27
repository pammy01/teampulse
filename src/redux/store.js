import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';
import analyticsReducer from './slices/analyticsSlice';
import kpiReducer from './slices/kpiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    analytics: analyticsReducer,
    kpi: kpiReducer,
    ui: uiReducer,
  },
});
