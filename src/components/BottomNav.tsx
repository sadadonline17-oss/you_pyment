import { Link, useLocation } from "react-router-dom";
import { Home, Package, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Home,
      label: "الرئيسية",
      path: "/",
    },
    {
      icon: Package,
      label: "الخدمات",
      path: "/services",
    },
    {
      icon: FileText,
      label: "الفواتير",
      path: "/invoices/list/sa",
    },
    {
      icon: Settings,
      label: "المزيد",
      path: "/services",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 safe-bottom shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 px-3 rounded-xl transition-all duration-200",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    active
                      ? "bg-primary/10"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
