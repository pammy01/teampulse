import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeData: [
    { date: "0 Jan", value: 180 },
    { date: "31 Jan", value: 250 },
    { date: "22 Feb", value: 220 },
    { date: "31 Mar", value: 300 },
    { date: "21 Apr", value: 280 },
    { date: "31 May", value: 350 },
    { date: "20 Jun", value: 320 },
    { date: "20 Jul", value: 400 },
  ],
  availability: {
    attendance: 400,
    lateComing: 17,
    absent: 6,
    leaveApply: 14,
  },
  employeeStats: {
    total: 423,
    male: 171,
    female: 252,
  }
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    updateEmployeeData: (state, action) => {
      state.employeeData = action.payload;
    },
    updateAvailability: (state, action) => {
      state.availability = { ...state.availability, ...action.payload };
    },
    updateEmployeeStats: (state, action) => {
      state.employeeStats = { ...state.employeeStats, ...action.payload };
    },
    incrementAvailability: (state, action) => {
      const { type } = action.payload;
      if (state.availability[type] !== undefined) {
        state.availability[type] += 1;
      }
    },
    decrementAvailability: (state, action) => {
      const { type } = action.payload;
      if (state.availability[type] !== undefined && state.availability[type] > 0) {
        state.availability[type] -= 1;
      }
    }
  }
});

export const { 
  updateEmployeeData, 
  updateAvailability, 
  updateEmployeeStats,
  incrementAvailability,
  decrementAvailability 
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
