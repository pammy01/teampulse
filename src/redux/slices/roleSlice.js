import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserRole: 'team_lead', // 'team_lead' or 'team_member'
  currentUser: {
    id: 1,
    name: "Dylan Hunter",
    role: "Admin Profile",
    avatar: "DH"
  },
  teamMembers: [
    { name: "Alice Johnson", avatar: "AJ" },
    { name: "Bob Smith", avatar: "BS" },
    { name: "Carol White", avatar: "CW" },
    { name: "Dave Brown", avatar: "DB" },
  ]
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    toggleRole: (state) => {
      state.currentUserRole = state.currentUserRole === 'team_lead' ? 'team_member' : 'team_lead';
    },
    setRole: (state, action) => {
      state.currentUserRole = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
    removeTeamMember: (state, action) => {
      state.teamMembers = state.teamMembers.filter(
        member => member.name !== action.payload
      );
    }
  }
});

export const { toggleRole, setRole, setCurrentUser, addTeamMember, removeTeamMember } = roleSlice.actions;
export default roleSlice.reducer;
