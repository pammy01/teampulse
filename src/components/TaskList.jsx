import { useDispatch } from 'react-redux';
import { updateTaskProgress, deleteTask } from '../redux/slices/membersSlice';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trash2, CheckCircle2 } from 'lucide-react';

export const TaskList = ({ memberId, tasks, isLeadView = false }) => {
  const dispatch = useDispatch();

  const handleMarkComplete = (taskId) => {
    dispatch(updateTaskProgress({ memberId, taskId, progress: 100 }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ memberId, taskId }));
  };

  const activeTasks = tasks.filter(t => t.progress < 100);
  const completedTasks = tasks.filter(t => t.progress === 100);

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic py-4">
        No tasks assigned yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          {activeTasks.map((task) => (
            <div key={task.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
                {isLeadView && (
                  <div className="flex gap-1">
                    {task.progress < 100 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => handleMarkComplete(task.id)}
                        title="Mark as complete"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="pt-2 border-t space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Completed</p>
          {completedTasks.map((task) => (
            <div key={task.id} className="p-2 rounded-lg bg-status-working/5 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate line-through text-muted-foreground">{task.title}</p>
              </div>
              <Badge variant="outline" className="bg-status-working/10 text-status-working border-status-working text-xs">
                ✓ 100%
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
