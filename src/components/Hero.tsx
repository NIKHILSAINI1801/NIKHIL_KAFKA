import { motion } from "motion/react";
import { Shield, Lock, Eye, Zap, Activity, AlertTriangle, CheckCircle, Globe } from "lucide-react";
import { cn } from "../lib/utils";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
      {/* Main Welcome Panel */}
      <div className="panel lg:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-neon/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="badge badge-low mb-4">System Online</div>
          <h1 className="text-4xl font-serif italic font-black tracking-tighter mb-4 text-text-main">
            KAFKA <span className="text-accent-neon font-sans not-italic">SECURITY</span> SUITE
          </h1>
          <div className="absolute -top-10 -left-10 kafka-stamp">
            Classified
          </div>
          <p className="text-text-dim text-sm max-w-md mb-8 leading-relaxed font-mono">
            Advanced neural-link vulnerability analysis and real-time threat simulation. 
            Monitoring perimeter integrity across all active nodes.
          </p>
          <div className="flex gap-4">
            <button onClick={onStart} className="cyber-button px-8">
              Initialize Scan
            </button>
            <button className="px-6 py-2 bg-bg-surface border border-border-dim rounded text-xs font-bold uppercase hover:bg-white/5 transition-colors">
              View Logs
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="panel p-6">
        <div className="panel-header mb-4 !p-0 !border-0">
          <span className="panel-title">System Integrity</span>
        </div>
        <div className="space-y-6">
          {[
            { label: "Active Probes", value: "1,204", icon: Activity },
            { label: "Threats Blocked", value: "42,891", icon: Shield },
            { label: "Uptime", value: "99.99%", icon: CheckCircle },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <stat.icon className="w-4 h-4 text-accent-neon" />
                <span className="stat-label !mb-0">{stat.label}</span>
              </div>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-border-dim">
          <div className="stat-label mb-2">Network Load</div>
          <div className="flex gap-1 h-8 items-end">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 100}%` }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, repeatType: "reverse" }}
                className="flex-1 bg-accent-neon/30 rounded-t-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="panel lg:col-span-1">
        <div className="panel-header">
          <span className="panel-title">Recent Alerts</span>
          <AlertTriangle className="w-3 h-3 text-risk-med" />
        </div>
        <div className="divide-y divide-border-dim">
          {[
            { type: "SQLi", target: "api.node_04", time: "2m ago", severity: "high" },
            { type: "XSS", target: "cdn.assets", time: "14m ago", severity: "med" },
            { type: "Auth", target: "login.v1", time: "1h ago", severity: "low" },
          ].map((alert, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-main font-bold uppercase">{alert.type} ATTEMPT</span>
                <span className="text-[9px] text-text-dim font-mono">{alert.target}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border mb-1",
                  alert.severity === "high" ? "border-risk-high text-risk-high bg-risk-high/10" :
                  alert.severity === "med" ? "border-risk-med text-risk-med bg-risk-med/10" :
                  "border-risk-low text-risk-low bg-risk-low/10"
                )}>
                  {alert.severity}
                </span>
                <span className="text-[8px] text-text-dim">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Traffic */}
      <div className="panel lg:col-span-2">
        <div className="panel-header">
          <span className="panel-title">Global Traffic Monitor</span>
          <Globe className="w-3 h-3 text-accent-neon" />
        </div>
        <div className="p-6 flex items-center justify-center min-h-[200px] relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative w-full h-full border border-dashed border-border-dim rounded flex items-center justify-center">
            <div className="text-center">
              <div className="stat-value text-3xl mb-1">8.2 GB/s</div>
              <div className="stat-label">Real-time throughput</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

