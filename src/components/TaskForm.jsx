import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const members = useSelector((state) => state.members.members);
  
  const [formData, setFormData] = useState({
    memberId: '',
    title: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.memberId || !formData.title || !formData.dueDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    dispatch(assignTask({
      memberId: parseInt(formData.memberId),
      task: {
        title: formData.title,
        dueDate: formData.dueDate
      }
    }));

    toast({
      title: "🎉 Task assigned — your team's on it!",
      description: `Task assigned successfully to ${members.find(m => m.id === parseInt(formData.memberId))?.name}`,
    });

    setFormData({ memberId: '', title: '', dueDate: '' });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Assign Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Team Member</Label>
            <Select 
              value={formData.memberId} 
              onValueChange={(value) => setFormData({ ...formData, memberId: value })}
            >
              <SelectTrigger id="member">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name} - {member.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            Assign Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
