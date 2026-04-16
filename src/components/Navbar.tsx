import { Shield, LayoutDashboard, Zap, MessageSquare, Phone } from "lucide-react";
import { cn } from "../lib/utils";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Dashboard", icon: Shield },
    { id: "scanner", label: "Web Scanner", icon: LayoutDashboard },
    { id: "simulator", label: "Simulations", icon: Zap },
    { id: "chatbot", label: "Assistant", icon: MessageSquare },
    { id: "whatsapp", label: "WhatsApp", icon: Phone },
  ];

  return (
    <nav className="w-[220px] bg-bg-panel border-r border-border-dim flex flex-col shrink-0 h-full">
      <div className="p-6 mb-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setActiveTab("home")}
        >
          <Shield className="w-6 h-6 text-accent-neon group-hover:scale-110 transition-transform" />
          <span className="text-xl font-serif italic font-black tracking-widest text-accent-neon">KAFKA</span>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3 text-[11px] uppercase tracking-wider font-bold transition-all border-l-4",
              activeTab === item.id 
                ? "bg-accent-neon/5 text-text-main border-accent-neon" 
                : "text-text-dim border-transparent hover:bg-white/5 hover:text-text-main"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-6 mt-auto border-t border-border-dim">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-risk-low rounded-full animate-pulse" />
            <span className="text-[10px] text-text-dim font-mono uppercase">System Active</span>
          </div>
          <div className="text-[9px] text-text-dim/50 font-mono">
            v2.4.0-STABLE
          </div>
        </div>
      </div>
    </nav>
  );
}

