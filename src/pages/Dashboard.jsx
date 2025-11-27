import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { TeamLeadView } from '../components/TeamLeadView';
import { TeamMemberView } from '../components/TeamMemberView';
import { EmployeeChart } from '../components/EmployeeChart';
import { AvailabilityTiles } from '../components/AvailabilityTiles';
import { EmployeeDonutChart } from '../components/EmployeeDonutChart';
import { KPIPanel } from '../components/KPIPanel';

export const Dashboard = () => {
  const currentRole = useSelector((state) => state.role.currentUserRole);
  const isTeamLead = currentRole === 'team_lead';

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 lg:p-8">
          {isTeamLead ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Analytics Section */}
              <div className="lg:col-span-8 space-y-6">
                <EmployeeChart />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AvailabilityTiles />
                  <EmployeeDonutChart />
                </div>

                {/* Team Lead View */}
                <TeamLeadView />
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-4">
                <KPIPanel />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Analytics Section for Member */}
              <div className="lg:col-span-8 space-y-6">
                <EmployeeChart />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AvailabilityTiles />
                  <EmployeeDonutChart />
                </div>

                {/* Team Member View */}
                <TeamMemberView />
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-4">
                <KPIPanel />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
