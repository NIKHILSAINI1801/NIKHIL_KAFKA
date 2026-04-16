import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Shield, LayoutDashboard, Zap, MessageSquare, LogOut, User as UserIcon, Phone } from "lucide-react";
import { cn } from "../lib/utils";

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogin: () => void;
}

export default function Navbar({ user, activeTab, setActiveTab, onLogin }: NavbarProps) {
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
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-border-dim" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-bg-surface border border-border-dim flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-text-dim" />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold truncate">{user.displayName || user.email}</span>
              <button 
                onClick={() => signOut(auth)}
                className="text-[9px] text-text-dim hover:text-risk-high text-left uppercase tracking-tighter"
              >
                Terminate Session
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin} 
            className="w-full py-2 bg-accent-neon text-bg-deep text-[10px] font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity"
          >
            Initialize Auth
          </button>
        )}
      </div>
    </nav>
  );
}

