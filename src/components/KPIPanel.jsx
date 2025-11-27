import { useSelector } from 'react-redux';
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { TrendingUp, Users, UserCheck, Clock } from "lucide-react";

export const KPIPanel = () => {
  const { applications, interviews: interviewCount, hired, inProcess, upcomingInterviews } = useSelector((state) => state.kpi);
  
  const kpis = [
    { icon: Users, label: "Interviews", value: interviewCount, color: "bg-chart-4/10 text-chart-4" },
    { icon: UserCheck, label: "Hired", value: hired, color: "bg-status-working/10 text-status-working" },
    { icon: TrendingUp, label: "In Process", value: inProcess, color: "bg-status-break/10 text-status-break" },
  ];

  return (
    <div className="space-y-4">
      <Card className="gradient-primary shadow-card text-white overflow-hidden relative">
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-90 mb-2">Applications</p>
              <p className="text-5xl font-bold mb-1">{applications}</p>
              <p className="text-xs opacity-80">Total applications received</p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-20 absolute right-4 top-4" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-card hover-lift cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
          {upcomingInterviews.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No upcoming interviews — take a coffee ☕
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-smooth cursor-pointer">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {interview.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{interview.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{interview.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {interview.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
