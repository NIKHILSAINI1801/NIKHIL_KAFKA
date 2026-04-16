import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: WhatsApp Chatbot Webhook (Mocked for real-time interaction)
  // In a real scenario, this would receive POST requests from WhatsApp/Twilio
  app.post("/api/whatsapp/webhook", (req, res) => {
    const { message, from } = req.body;
    console.log(`Received WhatsApp message from ${from}: ${message}`);
    
    // In a real production app, you would process this message here 
    // and call the WhatsApp API to reply. 
    // For this KAFKA app, we handle the AI logic in the frontend 
    // to comply with environment guidelines.
    
    res.json({ status: "received" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
