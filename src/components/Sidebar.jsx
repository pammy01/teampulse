import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Ticket, 
  Users, 
  UserCheck, 
  DollarSign, 
  Wallet,
  Package,
  FileText,
  Settings,
  ChevronRight,
  Moon,
  Languages
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleDarkMode, toggleRTLMode } from '../redux/slices/uiSlice';

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Ticket, label: "Tickets", path: "/tickets" },
  { icon: Users, label: "Our Clients", path: "/clients" },
  { icon: UserCheck, label: "Employees", path: "/employees" },
  { icon: Wallet, label: "Accounts", path: "/accounts" },
  { icon: DollarSign, label: "Payroll", path: "/payroll" },
  { icon: Package, label: "App", path: "/app" },
  { icon: FileText, label: "Other Pages", path: "/pages" },
  { icon: Settings, label: "UI Components", path: "/components" },
];

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { darkMode, rtlMode } = useSelector((state) => state.ui);

  return (
    <aside className="w-[280px] bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
          <Ticket className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <h1 className="text-xl font-semibold">My-Task</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-smooth hover:bg-sidebar-accent group"
            activeClassName="bg-sidebar-accent"
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-6 space-y-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="text-sm cursor-pointer flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Enable Dark Mode!
          </Label>
          <Switch 
            id="dark-mode" 
            checked={darkMode}
            onCheckedChange={() => dispatch(toggleDarkMode())}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="rtl-mode" className="text-sm cursor-pointer flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Enable RTL Mode!
          </Label>
          <Switch 
            id="rtl-mode"
            checked={rtlMode}
            onCheckedChange={() => dispatch(toggleRTLMode())}
          />
        </div>
      </div>
    </aside>
  );
};
