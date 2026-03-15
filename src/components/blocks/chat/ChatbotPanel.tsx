import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

/**
 * ChatbotPanel — Floating chat widget (Home4)
 * Self-contained: trigger button + collapsible panel with messages,
 * quick replies, and text input. Purely visual / demo — no real AI.
 */

interface ChatbotPanelProps {
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  quickReplies?: string[];
  accentColor?: string;
}

interface Message {
  role: "user" | "bot";
  text: string;
}

const BOT_REPLIES: Record<string, string> = {
  default:
    "Thank you for your message. One of our advisors will follow up shortly. In the meantime, feel free to browse our featured properties.",
};

export default function ChatbotPanel({
  title = "Property Assistant",
  subtitle = "Online now",
  welcomeMessage = "Welcome! How can I help you find your perfect property today?",
  quickReplies = [
    "Show luxury villas",
    "What's off-market?",
    "Schedule a viewing",
    "Investment advice",
  ],
  accentColor = "#2D2926",
}: ChatbotPanelProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: welcomeMessage },
  ]);
  const [input, setInput] = useState("");

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: msg },
      { role: "bot", text: BOT_REPLIES[msg.toLowerCase()] ?? BOT_REPLIES.default },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110"
          style={{ background: accentColor }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col shadow-2xl bg-white"
          style={{ height: 480, border: "1px solid #e5e5e5" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: accentColor }}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-white/60">
                  {subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] px-4 py-3 text-[13px] leading-[1.6] font-light"
                  style={{
                    background: m.role === "user" ? accentColor : "#fff",
                    color: m.role === "user" ? "#fff" : "#333",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    border: m.role === "bot" ? "1px solid #e5e5e5" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 bg-neutral-50 border-t border-neutral-200">
              {quickReplies.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="text-[11px] tracking-[0.05em] px-3 py-1.5 bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-400 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            className="flex items-center gap-2 px-4 py-3 bg-white border-t border-neutral-200"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-[13px] font-light text-neutral-800 focus:outline-none"
            />
            <button
              type="submit"
              className="transition-opacity hover:opacity-70"
              style={{ color: accentColor }}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
