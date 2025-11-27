import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setSortBy } from '../redux/slices/membersSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MemberCard } from './MemberCard';
import { TaskForm } from './TaskForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

export const TeamLeadView = () => {
  const dispatch = useDispatch();
  const { members, statusFilter, sortBy } = useSelector((state) => state.members);

  // Calculate status summary
  const statusSummary = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  // Filter members
  let filteredMembers = statusFilter === 'all' 
    ? members 
    : members.filter(m => m.status === statusFilter);

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'tasks') {
      const aActiveTasks = a.tasks.filter(t => t.progress < 100).length;
      const bActiveTasks = b.tasks.filter(t => t.progress < 100).length;
      return bActiveTasks - aActiveTasks;
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Team Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="text-status-working border-status-working px-4 py-2">
              {statusSummary.Working || 0} Working
            </Badge>
            <Badge variant="outline" className="text-status-meeting border-status-meeting px-4 py-2">
              {statusSummary.Meeting || 0} Meeting
            </Badge>
            <Badge variant="outline" className="text-status-break border-status-break px-4 py-2">
              {statusSummary.Break || 0} Break
            </Badge>
            <Badge variant="outline" className="text-status-offline border-status-offline px-4 py-2">
              {statusSummary.Offline || 0} Offline
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Filter by Status</label>
          <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="Working">Working</SelectItem>
              <SelectItem value="Break">Break</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="tasks">Active Tasks</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Team Members</h2>
          {sortedMembers.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                No members found with the selected filter
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sortedMembers.map((member) => (
                <MemberCard key={member.id} member={member} isLeadView={true} />
              ))}
            </div>
          )}
        </div>

        {/* Task Assignment Form */}
        <div>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};
