/**
 * KAFKA Cybersecurity Suite
 */

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Scanner from "./components/Scanner";
import Simulator from "./components/Simulator";
import Chatbot from "./components/Chatbot";
import WhatsApp from "./components/WhatsApp";
import AuthModal from "./components/AuthModal";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "scanner":
        return <Scanner user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />;
      case "simulator":
        return <Simulator />;
      case "chatbot":
        return <Chatbot />;
      case "whatsapp":
        return <WhatsApp />;
      default:
        return <Hero onStart={() => setActiveTab("scanner")} />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-deep text-text-main overflow-hidden">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogin={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[70px] bg-bg-panel border-b border-border-dim flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-dim">
              {activeTab === "home" ? "System Overview" : activeTab.toUpperCase()}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-bg-surface border border-border-dim rounded text-xs font-bold hover:bg-white/5 transition-colors">
              SYSTEM STATUS: OPTIMAL
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}


