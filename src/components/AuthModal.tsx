import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { X, Mail, Lock, User, Chrome } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-panel w-full max-w-md p-8 relative z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 mb-8 text-sm">
              {isLogin ? "Access your security dashboard" : "Join the Kafka security network"}
            </p>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors mb-6"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-cyber-dark px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cyber-gray border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-cyber-blue outline-none transition-colors"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cyber-gray border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-cyber-blue outline-none transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cyber-gray border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-cyber-blue outline-none transition-colors"
                  required
                />
              </div>

              {error && <p className="text-cyber-pink text-xs">{error}</p>}

              <button type="submit" className="cyber-button w-full py-3">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-blue hover:underline font-bold"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
