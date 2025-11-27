import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [
    {
      id: 1,
      name: "Dylan Hunter",
      role: "Team Lead",
      status: "Working",
      avatar: "DH",
      tasks: [
        { id: 1, title: "Review team performance", progress: 60, dueDate: "2025-12-01" },
        { id: 2, title: "Plan sprint activities", progress: 80, dueDate: "2025-11-29" },
      ]
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Senior Developer",
      status: "Working",
      avatar: "SW",
      tasks: [
        { id: 3, title: "Update Dashboard UI", progress: 75, dueDate: "2025-12-01" },
        { id: 4, title: "Review PR #234", progress: 100, dueDate: "2025-11-28" },
      ]
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "UX Designer",
      status: "Break",
      avatar: "MC",
      tasks: [
        { id: 5, title: "Design new landing page", progress: 45, dueDate: "2025-12-05" },
      ]
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Product Manager",
      status: "Meeting",
      avatar: "ED",
      tasks: [
        { id: 6, title: "Quarterly planning", progress: 30, dueDate: "2025-12-10" },
        { id: 7, title: "Stakeholder presentation", progress: 60, dueDate: "2025-12-02" },
      ]
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Data Analyst",
      status: "Offline",
      avatar: "JW",
      tasks: []
    },
  ],
  statusFilter: 'all', // 'all', 'Working', 'Break', 'Meeting', 'Offline'
  sortBy: 'name' // 'name', 'tasks', 'status'
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        member.status = status;
      }
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const newTask = {
          id: Date.now(),
          ...task,
          progress: 0
        };
        member.tasks.push(newTask);
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
        }
      }
    },
    incrementTaskProgress: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task && task.progress < 100) {
          task.progress = Math.min(100, task.progress + 10);
        }
      }
    },
    decrementTaskProgress: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task && task.progress > 0) {
          task.progress = Math.max(0, task.progress - 10);
        }
      }
    },
    deleteTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        member.tasks = member.tasks.filter(t => t.id !== taskId);
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const { 
  updateMemberStatus, 
  assignTask, 
  updateTaskProgress,
  incrementTaskProgress,
  decrementTaskProgress,
  deleteTask,
  setStatusFilter,
  setSortBy
} = membersSlice.actions;
export default membersSlice.reducer;
