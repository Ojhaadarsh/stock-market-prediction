import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Home, LineChart, TrendingUp, Briefcase, Info,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navItems: NavItem[] = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: '/live', 
      label: 'Live Tracker', 
      icon: <LineChart className="h-5 w-5" /> 
    },
    { 
      path: '/predict', 
      label: 'Predictor', 
      icon: <TrendingUp className="h-5 w-5" /> 
    },
    { 
      path: '/portfolio', 
      label: 'Portfolio', 
      icon: <Briefcase className="h-5 w-5" /> 
    },
    { 
      path: '/about', 
      label: 'About', 
      icon: <Info className="h-5 w-5" /> 
    },
  ];

  // Desktop sidebar (always visible on md+)
  const desktopSidebar = (
    <div className="hidden md:flex md:flex-col md:w-64 md:min-h-screen bg-card border-r border-border">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-center flex-shrink-0 px-4 py-2">
          <span className="text-xl font-bold text-foreground">StockSense</span>
        </div>
        <nav className="mt-8 flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`
              }
              end={item.path === '/'}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile sidebar (overlay when open)
  const mobileSidebar = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />
          
          {/* Sidebar panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <span className="text-xl font-bold text-foreground">StockSense</span>
                <button
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`
                    }
                    onClick={onClose}
                    end={item.path === '/'}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;