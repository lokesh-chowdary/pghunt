import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  SlidersHorizontal,
  PlusSquare,
  Heart,
  User2,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isFilter?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Filters", to: "/search?filters=open", icon: SlidersHorizontal, isFilter: true },
  { label: "Post", to: "/post", icon: PlusSquare },
  { label: "Saved", to: "/wishlist", icon: Heart },
  { label: "Account", to: "/profile", icon: User2 },
];

const MobileNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Always navigate to search with filters=open, even if already on search page
    navigate("/search?filters=open", { replace: false });
  };

  return (
    // Hidden on desktop and tablet, visible only on mobile (< 768px)
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-md mx-auto flex items-stretch justify-between px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isFilter 
            ? location.pathname === "/search" && location.search.includes("filters=open")
            : location.pathname === item.to || (item.to === "/" && location.pathname === "/");

          if (item.isFilter) {
            return (
              <button
                key={item.to}
                onClick={handleFilterClick}
                className={[
                  "flex-1 flex items-center justify-center",
                  "text-[11px] font-medium transition-colors duration-200",
                  isActive ? "text-emerald-600" : "text-gray-500",
                ].join(" ")}
              >
                <div className="relative flex flex-col items-center gap-1 py-2 w-full">
                  {/* Top active indicator bar */}
                  {isActive && (
                    <span className="absolute -top-1 w-8 h-0.5 rounded-full bg-emerald-500" />
                  )}

                  <Icon className="w-5 h-5" />
                  <span className="leading-none">{item.label}</span>
                </div>
              </button>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "flex-1 flex items-center justify-center",
                  "text-[11px] font-medium transition-colors duration-200",
                  isActive ? "text-emerald-600" : "text-gray-500",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <div className="relative flex flex-col items-center gap-1 py-2 w-full">
                  {/* Top active indicator bar */}
                  {isActive && (
                    <span className="absolute -top-1 w-8 h-0.5 rounded-full bg-emerald-500" />
                  )}

                  <Icon className="w-5 h-5" />
                  <span className="leading-none">{item.label}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar;
