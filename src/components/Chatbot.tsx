import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Phone, Video, MoreVertical, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Kafka, your cybersecurity assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: `You are Kafka, a cybersecurity AI assistant. A user asked: "${input}". Provide a professional, helpful response focused on cybersecurity.` }] }]
      });
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the neural network. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col panel border-border-dim">
      {/* WhatsApp Header */}
      <div className="bg-bg-panel p-4 flex items-center justify-between border-b border-border-dim">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-accent-neon/10 flex items-center justify-center border border-accent-neon/30">
              <Bot className="w-4 h-4 text-accent-neon" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-risk-low border-2 border-bg-panel rounded-full" />
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider">Kafka Intelligence</h3>
            <p className="text-[9px] text-risk-low font-mono uppercase tracking-tighter">Active | Secure Channel</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-text-dim/50">
          <Phone className="w-4 h-4 cursor-not-allowed" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-text-main transition-colors" />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-bg-deep/50 custom-scrollbar"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex w-full",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] p-3 rounded shadow-sm relative",
              msg.sender === "user" 
                ? "bg-accent-neon text-bg-deep font-bold" 
                : "bg-bg-surface text-text-main border border-border-dim"
            )}>
              <p className="text-[11px] leading-relaxed font-mono">{msg.text}</p>
              <div className={cn(
                "flex items-center justify-end gap-1 mt-1.5",
                msg.sender === "user" ? "text-bg-deep/50" : "text-text-dim/40"
              )}>
                <span className="text-[8px] font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
                {msg.sender === "user" && <CheckCheck className="w-3 h-3" />}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-bg-surface p-3 rounded border border-border-dim">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-accent-neon rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-accent-neon rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-accent-neon rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-bg-panel border-t border-border-dim flex gap-3">
        <input
          type="text"
          placeholder="Enter query for security assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-bg-surface border border-border-dim rounded px-4 py-2 text-[11px] font-mono focus:border-accent-neon outline-none transition-colors placeholder:text-text-dim/30"
        />
        <button 
          type="submit"
          disabled={isTyping}
          className="w-10 h-10 rounded bg-accent-neon flex items-center justify-center text-bg-deep hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

