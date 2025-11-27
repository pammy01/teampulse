import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus, incrementTaskProgress, decrementTaskProgress } from '../redux/slices/membersSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Plus, Minus, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TeamMemberView = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const currentUserId = useSelector((state) => state.role.currentUser.id);
  const currentMember = useSelector((state) => 
    state.members.members.find(m => m.id === currentUserId)
  );

  if (!currentMember) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          Member not found
        </CardContent>
      </Card>
    );
  }

  const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

  const handleStatusChange = (status) => {
    dispatch(updateMemberStatus({ memberId: currentUserId, status }));
    toast({
      title: "Status Updated",
      description: `Your status has been set to ${status}`,
    });
  };

  const handleIncrement = (taskId) => {
    dispatch(incrementTaskProgress({ memberId: currentUserId, taskId }));
  };

  const handleDecrement = (taskId) => {
    dispatch(decrementTaskProgress({ memberId: currentUserId, taskId }));
  };

  const activeTasks = currentMember.tasks.filter(t => t.progress < 100);
  const completedTasks = currentMember.tasks.filter(t => t.progress === 100);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Working': return 'bg-status-working';
      case 'Break': return 'bg-status-break';
      case 'Meeting': return 'bg-status-meeting';
      case 'Offline': return 'bg-status-offline';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Current Status Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Your Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium">Status:</span>
            <Badge className={`${getStatusColor(currentMember.status)} text-white border-0 px-4 py-1.5`}>
              {currentMember.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={currentMember.status === status ? "default" : "outline"}
                className={currentMember.status === status ? getStatusColor(status) + ' text-white border-0' : ''}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Your Active Tasks ({activeTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No active tasks. Great job! 🎉
            </p>
          ) : (
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg border bg-card space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                    {task.progress === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-status-working" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-3" />
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDecrement(task.id)}
                        disabled={task.progress === 0}
                        className="flex-1"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        -10%
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleIncrement(task.id)}
                        disabled={task.progress === 100}
                        className="flex-1"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        +10%
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-status-working" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium line-through text-muted-foreground">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <Badge variant="outline" className="bg-status-working/10 text-status-working border-status-working">
                    100%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
