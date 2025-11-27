import { useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';
import { Button } from './ui/button';

const statuses = [
  { label: 'Working', color: 'bg-status-working' },
  { label: 'Break', color: 'bg-status-break' },
  { label: 'Meeting', color: 'bg-status-meeting' },
  { label: 'Offline', color: 'bg-status-offline' },
];

export const StatusSelector = ({ memberId, currentStatus }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    dispatch(updateMemberStatus({ memberId, status }));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => (
        <Button
          key={status.label}
          size="sm"
          variant={currentStatus === status.label ? "default" : "outline"}
          className={`text-xs ${currentStatus === status.label ? status.color + ' text-white border-transparent' : ''}`}
          onClick={() => handleStatusChange(status.label)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};
