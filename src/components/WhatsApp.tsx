import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, MessageSquare, Settings, Activity, Shield, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function WhatsApp() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [logs, setLogs] = useState([
    { time: "12:45:01", type: "INBOUND", msg: "Query: Analyze website example.com", status: "Processed" },
    { time: "12:44:30", type: "OUTBOUND", msg: "Alert: Potential SQLi detected on node_04", status: "Delivered" },
    { time: "12:42:15", type: "SYSTEM", msg: "Secure Bridge re-authenticated", status: "Success" },
    { time: "12:38:09", type: "INBOUND", msg: "Query: What is the current threat level?", status: "Processed" },
    { time: "12:35:55", type: "OUTBOUND", msg: "Daily security summary dispatched", status: "Delivered" },
  ]);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const incomingMessages = [
        "Status report requested for node_07",
        "New vulnerability detected in perimeter",
        "System heartbeat: STABLE",
        "Query: List active dispatches",
        "Alert: Unauthorized access attempt blocked"
      ];
      
      const randomMsg = incomingMessages[Math.floor(Math.random() * incomingMessages.length)];
      const newLog = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        type: "INBOUND",
        msg: randomMsg,
        status: "Processed"
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      type: "OUTBOUND",
      msg: messageInput,
      status: "Sending..."
    };

    setLogs(prev => [newLog, ...prev]);
    setMessageInput("");

    setTimeout(() => {
      setLogs(prev => prev.map(log => log === newLog ? { ...log, status: "Delivered" } : log));
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="panel-title flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent-neon" /> WhatsApp API
            </h2>
            <div className={cn(
              "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
              isConnected ? "bg-risk-low/20 text-risk-low" : "bg-risk-med/20 text-risk-med"
            )}>
              {isConnected ? "Active" : "Disconnected"}
            </div>
          </div>

          {!isConnected ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-48 h-48 bg-white p-2 rounded-lg mb-6 relative group overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/whatsapp-qr/400/400" 
                  alt="WhatsApp QR Code" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {isConnecting && (
                  <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-lg">
                    <Loader2 className="w-8 h-8 text-accent-neon animate-spin mb-2" />
                    <span className="text-[10px] font-bold text-bg-deep uppercase tracking-tighter">Syncing...</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-text-dim font-mono mb-6 max-w-[200px]">
                Scan the QR code with your WhatsApp mobile app to initialize the Kafka Secure Bridge.
              </p>
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="cyber-button w-full"
              >
                {isConnecting ? "INITIALIZING..." : "GENERATE NEW BRIDGE"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-bg-surface rounded border border-border-dim">
                <div className="w-12 h-12 rounded-full bg-accent-neon/10 flex items-center justify-center border border-accent-neon/30">
                  <Phone className="w-6 h-6 text-accent-neon" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-main">+1 (555) KAFKA-01</h3>
                  <p className="text-[9px] text-text-dim font-mono uppercase">Secure API Endpoint</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-bg-surface border border-border-dim rounded">
                  <div className="text-[8px] text-text-dim uppercase mb-1">Messages</div>
                  <div className="text-lg font-bold text-text-main">1,284</div>
                </div>
                <div className="p-3 bg-bg-surface border border-border-dim rounded">
                  <div className="text-[8px] text-text-dim uppercase mb-1">Uptime</div>
                  <div className="text-lg font-bold text-text-main">99.9%</div>
                </div>
              </div>

              <button 
                onClick={() => setIsConnected(false)}
                className="w-full py-2 bg-risk-high/10 border border-risk-high/30 text-risk-high text-[10px] font-bold uppercase tracking-widest rounded hover:bg-risk-high/20 transition-all"
              >
                Terminate Bridge
              </button>
            </div>
          )}
        </div>

        <div className="panel p-6">
          <h4 className="stat-label mb-4 flex items-center gap-2">
            <Settings className="w-3 h-3 text-accent-neon" /> Integration Settings
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-dim uppercase">Auto-Response</span>
              <div className="w-8 h-4 bg-accent-neon rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-2 h-2 bg-bg-deep rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-dim uppercase">Threat Alerts</span>
              <div className="w-8 h-4 bg-accent-neon rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-2 h-2 bg-bg-deep rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-dim uppercase">Daily Reports</span>
              <div className="w-8 h-4 bg-bg-surface border border-border-dim rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-2 h-2 bg-text-dim rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="panel flex-1">
          <div className="panel-header">
            <h2 className="panel-title flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-neon" /> Live Activity Stream
            </h2>
            <div className="flex gap-2">
              <div className="badge badge-low">Real-time</div>
            </div>
          </div>
          <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar max-h-[400px]">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start gap-4 p-3 bg-bg-surface/50 border border-border-dim rounded group hover:border-accent-neon/30 transition-colors">
                <div className="text-[9px] font-mono text-text-dim mt-0.5">{log.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded",
                      log.type === "INBOUND" ? "bg-blue-500/20 text-blue-400" : 
                      log.type === "OUTBOUND" ? "bg-accent-neon/20 text-accent-neon" : 
                      "bg-text-dim/20 text-text-dim"
                    )}>
                      {log.type}
                    </span>
                    <span className="text-[10px] font-bold text-text-main">{log.msg}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-risk-low" />
                    <span className="text-[8px] text-text-dim uppercase font-mono">{log.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="stat-label flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-accent-neon" /> Quick Dispatch
            </h4>
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type a secure message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              disabled={!isConnected}
              className="flex-1 bg-bg-surface border border-border-dim rounded px-3 py-2 text-[10px] font-mono outline-none focus:border-accent-neon transition-colors disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!isConnected || !messageInput.trim()}
              className="px-4 py-2 bg-accent-neon text-bg-deep text-[10px] font-bold uppercase rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="stat-label flex items-center gap-2">
              <Shield className="w-3 h-3 text-accent-neon" /> Security Protocol
            </h4>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-risk-low" />
              <span className="text-[10px] font-mono text-risk-low uppercase">E2E Encryption Active</span>
            </div>
          </div>
          <p className="text-[10px] text-text-dim font-mono leading-relaxed">
            All communications through the Kafka WhatsApp Bridge are secured using end-to-end encryption. 
            Kafka does not store message contents on external servers. Integration uses the official WhatsApp Business API 
            via secure webhooks.
          </p>
        </div>
      </div>
    </div>
  );
}
