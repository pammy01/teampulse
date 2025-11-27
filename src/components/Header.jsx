import { Search, Info, Bell, Plus } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/slices/uiSlice';
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { RoleToggle } from "./RoleToggle";

export const Header = () => {
  const dispatch = useDispatch();
  const { currentUser, teamMembers } = useSelector((state) => state.role);
  const searchQuery = useSelector((state) => state.ui.searchQuery);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 justify-between">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search" 
          className="pl-10 bg-background"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-4">
        <RoleToggle />

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Info className="w-5 h-5" />
          </Button>

          <div className="flex items-center -space-x-2">
            {teamMembers.map((member, i) => (
              <Avatar key={i} className="w-8 h-8 border-2 border-card">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            <Button 
              size="icon" 
              variant="outline" 
              className="w-8 h-8 rounded-full border-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-chart-1 rounded-full"></span>
          </Button>

          <div className="flex items-center gap-3 ml-2 pl-3 border-l">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
