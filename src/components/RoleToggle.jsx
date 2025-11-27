import { useDispatch, useSelector } from 'react-redux';
import { toggleRole } from '../redux/slices/roleSlice';
import { Button } from './ui/button';
import { Users, User } from 'lucide-react';

export const RoleToggle = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentUserRole);
  const isTeamLead = currentRole === 'team_lead';

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
      <span className="text-sm text-muted-foreground">Current Role:</span>
      <Button
        variant={isTeamLead ? "default" : "outline"}
        size="sm"
        onClick={() => dispatch(toggleRole())}
        className="gap-2"
      >
        {isTeamLead ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
        {isTeamLead ? 'Team Lead' : 'Team Member'}
      </Button>
    </div>
  );
};
