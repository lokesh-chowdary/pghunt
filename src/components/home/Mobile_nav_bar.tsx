import React from "react";
import { NavLink } from "react-router-dom";
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
};

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Filters", to: "/filters", icon: SlidersHorizontal },
  { label: "Post", to: "/post", icon: PlusSquare },
  { label: "Saved", to: "/saved", icon: Heart },
  { label: "Account", to: "/account", icon: User2 },
];

const Mobile_nav_bar: React.FC = () => {
  return (
    // Hidden on desktop, visible on mobile + tablet
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-md mx-auto flex items-stretch justify-between px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
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

export default Mobile_nav_bar;
