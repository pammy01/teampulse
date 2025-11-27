import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export const EmployeeDonutChart = () => {
  const employeeStats = useSelector((state) => state.analytics.employeeStats);
  
  const data = [
    { name: "Male", value: employeeStats.male, color: "hsl(var(--chart-1))" },
    { name: "Female", value: employeeStats.female, color: "hsl(var(--chart-2))" },
  ];
  
  const total = employeeStats.total;

  return (
    <Card className="shadow-card hover-lift">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Total Employees</CardTitle>
        <span className="text-3xl font-bold text-primary">{total}</span>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">
                {item.name}: <span className="font-semibold">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
