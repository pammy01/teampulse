import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { StatusSelector } from './StatusSelector';
import { TaskList } from './TaskList';

export const MemberCard = ({ member, isLeadView = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Working':
        return 'text-status-working';
      case 'Break':
        return 'text-status-break';
      case 'Meeting':
        return 'text-status-meeting';
      case 'Offline':
        return 'text-status-offline';
      default:
        return 'text-muted-foreground';
    }
  };

  const activeTasks = member.tasks.filter(t => t.progress < 100);

  return (
    <Card className="shadow-card hover-lift">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {member.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${getStatusColor(member.status)} text-white border-0`}>
                {member.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {activeTasks.length} active {activeTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      {isLeadView && (
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Update Status</p>
            <StatusSelector memberId={member.id} currentStatus={member.status} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Tasks Overview</p>
            <TaskList memberId={member.id} tasks={member.tasks} isLeadView={true} />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
