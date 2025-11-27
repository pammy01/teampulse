import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: 1546,
  interviews: 246,
  hired: 101,
  inProcess: 50,
  upcomingInterviews: [
    { 
      id: 1,
      name: "Sarah Williams", 
      role: "Senior Developer", 
      time: "10:00 AM", 
      initials: "SW",
      date: "2025-11-28"
    },
    { 
      id: 2,
      name: "Michael Chen", 
      role: "UX Designer", 
      time: "11:30 AM", 
      initials: "MC",
      date: "2025-11-28"
    },
    { 
      id: 3,
      name: "Emily Davis", 
      role: "Product Manager", 
      time: "2:00 PM", 
      initials: "ED",
      date: "2025-11-28"
    },
    { 
      id: 4,
      name: "James Wilson", 
      role: "Data Analyst", 
      time: "3:30 PM", 
      initials: "JW",
      date: "2025-11-28"
    },
  ]
};

const kpiSlice = createSlice({
  name: 'kpi',
  initialState,
  reducers: {
    incrementApplications: (state) => {
      state.applications += 1;
    },
    incrementInterviews: (state) => {
      state.interviews += 1;
    },
    incrementHired: (state) => {
      state.hired += 1;
    },
    updateKPI: (state, action) => {
      const { key, value } = action.payload;
      if (state[key] !== undefined) {
        state[key] = value;
      }
    },
    addUpcomingInterview: (state, action) => {
      state.upcomingInterviews.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeUpcomingInterview: (state, action) => {
      state.upcomingInterviews = state.upcomingInterviews.filter(
        interview => interview.id !== action.payload
      );
    },
    updateUpcomingInterview: (state, action) => {
      const { id, updates } = action.payload;
      const interview = state.upcomingInterviews.find(i => i.id === id);
      if (interview) {
        Object.assign(interview, updates);
      }
    }
  }
});

export const { 
  incrementApplications, 
  incrementInterviews, 
  incrementHired,
  updateKPI,
  addUpcomingInterview,
  removeUpcomingInterview,
  updateUpcomingInterview
} = kpiSlice.actions;

export default kpiSlice.reducer;
