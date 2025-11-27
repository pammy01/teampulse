import { useSelector } from 'react-redux';
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

export const AvailabilityTiles = () => {
  const availability = useSelector((state) => state.analytics.availability);
  
  const tiles = [
    { icon: CheckCircle2, label: "Attendance", value: availability.attendance, color: "text-status-working", key: "attendance" },
    { icon: Clock, label: "Late Coming", value: availability.lateComing, color: "text-status-break", key: "lateComing" },
    { icon: XCircle, label: "Absent", value: availability.absent, color: "text-destructive", key: "absent" },
    { icon: FileText, label: "Leave Apply", value: availability.leaveApply, color: "text-primary", key: "leaveApply" },
  ];

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Employees Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <div 
              key={tile.key}
              className="p-4 rounded-lg bg-muted hover-lift cursor-pointer"
            >
              <tile.icon className={`w-6 h-6 mb-2 ${tile.color}`} />
              <p className="text-2xl font-bold mb-1">{String(tile.value).padStart(2, '0')}</p>
              <p className="text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
