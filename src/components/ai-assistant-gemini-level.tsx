import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Send, Bot, User, Loader2, Sparkles, RefreshCw, Copy, Check,
  ArrowLeft, Code, Rocket, Terminal
} from "lucide-react";

// ============================================================
// GEMINI API KEY — Replace with your actual key
// ============================================================
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
// ============================================================

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are the AI Programming Assistant for the Catalyst education-to-employment platform (SIH 2025, India). Help students transition from learning to earning.

Rules:
- Be professional, encouraging, concise
- Provide working code examples with language identifiers in fenced code blocks
- Use markdown: ## headers, **bold**, bullet lists, code blocks
- Focus on practical, industry-relevant skills
- Reference the Indian tech ecosystem when relevant
- Keep responses under 500 words unless a detailed tutorial is requested
- End responses with 1-2 follow-up suggestions`;

interface AIAssistantProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onBack?: () => void;
  onOpenChat?: (partner?: { name: string; role: string; isOnline: boolean }) => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  content:
    "Hello! I'm your AI Programming Assistant for Catalyst.\n\nI can help you with:\n- **Learning** programming concepts\n- **Debugging** code and fixing errors\n- **Building** projects step-by-step\n- **Code reviews** and best practices\n- **Career guidance** for developers\n\nWhat would you like to work on today?",
  sender: "ai",
  timestamp: new Date(),
  suggestions: [
    "Learn JavaScript fundamentals",
    "Debug my code",
    "Build a web portfolio",
    "React best practices",
    "Career advice for developers",
  ],
};

export function AIAssistantGeminiLevel({ onBack }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<{ role: string; parts: { text: string }[] }[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ======== Gemini API Call ========
  const callGemini = async (userMsg: string): Promise<string> => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      return localFallback(userMsg);
    }
    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            ...history.slice(-10),
            { role: "user", parts: [{ text: userMsg }] },
          ],
          generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 2048 },
        }),
      });
      if (!res.ok) {
        console.error("Gemini error:", res.status);
        return localFallback(userMsg);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return localFallback(userMsg);
      setHistory((h) => [
        ...h.slice(-8),
        { role: "user", parts: [{ text: userMsg }] },
        { role: "model", parts: [{ text }] },
      ]);
      return text;
    } catch (err) {
      console.error("Gemini network error:", err);
      return localFallback(userMsg);
    }
  };

  // ======== Local Fallback ========
  const localFallback = (msg: string): string => {
    const m = msg.toLowerCase();
    if (/(learn|tutorial|how to|what is|explain|teach)/i.test(m)) {
      if (/javascript|js|react/i.test(m))
        return "## JavaScript Quick Start\n\n```javascript\nconst greeting = \"Hello!\";\nlet count = 0;\n\nconst increment = () => ++count;\n\nconst users = [\n  { name: \"Alice\", age: 25 },\n  { name: \"Bob\", age: 30 }\n];\n\nconst names = users.map(u => u.name);\nconsole.log(names);\n```\n\n**Key concepts:**\n- Variables (let, const)\n- Arrow functions\n- Array methods (map, filter, reduce)\n- Async/Await\n- DOM manipulation\n\nWant me to explain any of these in detail?";
      if (/python/i.test(m))
        return "## Python Quick Start\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]\n\nuser = {\"name\": \"Alice\", \"skills\": [\"Python\", \"SQL\"]}\n```\n\n**Learning path:**\n1. Syntax and data types\n2. Functions and modules\n3. OOP (classes)\n4. Libraries (pandas, flask)\n5. Build projects!\n\nWhat Python topic interests you?";
      return "## Programming Guide\n\n**Popular paths:**\n\n- **Web Dev:** HTML, CSS, JavaScript → React\n- **Backend:** Python/Node.js + databases\n- **Mobile:** React Native or Flutter\n- **Data Science:** Python + pandas + ML\n\n**Tips:**\n1. Pick ONE language first\n2. Build projects, not just tutorials\n3. Practice 30 min/day consistently\n4. Join developer communities\n\nWhich path interests you?";
    }
    if (/(debug|error|fix|broken|not working)/i.test(m))
      return "## Debugging Guide\n\n**Steps:**\n1. Read the error message carefully\n2. Check the line number\n3. Add console.log/print statements\n4. Use browser DevTools\n\n```javascript\ntry {\n  const result = riskyOperation();\n  console.log(\"Result:\", result);\n} catch (error) {\n  console.error(\"Error:\", error.message);\n}\n```\n\n**Paste your code and error message** — I'll help fix it!";
    if (/(career|job|interview|resume|portfolio)/i.test(m))
      return "## Career Guidance\n\n**Action plan:**\n1. Build 3-5 portfolio projects\n2. Active GitHub profile\n3. 1-page resume (projects first)\n4. LinkedIn networking\n\n**In-demand skills (India 2026):**\n- React/Next.js + TypeScript\n- Python + AI/ML\n- Cloud (AWS/GCP)\n- System Design\n\nWhat career question can I help with?";
    if (/(build|create|project|make)/i.test(m))
      return "## Project Ideas\n\n**Beginner:** Todo app, Calculator, Weather app\n**Intermediate:** Blog platform, E-commerce, Chat app\n**Advanced:** Real-time collab tool, ML dashboard\n\n```bash\nmkdir my-project && cd my-project\nnpm init -y\nnpm install react react-dom\n```\n\nWhat would you like to build? I'll create a step-by-step plan!";
    return "I can help with:\n\n- **Learning** — Programming tutorials\n- **Debugging** — Fix code errors\n- **Building** — Project guidance\n- **Code Review** — Improve quality\n- **Career** — Job prep and advice\n\nTry: \"Teach me React hooks\" or \"Debug my function\"\n\nWhat would you like to explore?";
  };

  // ======== Send Message ========
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), content: input, sender: "user", timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);
    const text = input;
    setInput("");
    setIsTyping(true);
    try {
      const reply = await callGemini(text);
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), content: reply, sender: "ai", timestamp: new Date() }]);
    } catch {
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), content: "Sorry, an error occurred. Please try again.", sender: "ai", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyText = (t: string) => {
    navigator.clipboard.writeText(t);
    setCopied(t);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setHistory([]);
  };

  // ======== Markdown Renderer ========
  const renderContent = (content: string) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = codeRegex.exec(content)) !== null) {
      if (match.index > last) {
        parts.push(<div key={`t-${last}`}>{renderText(content.substring(last, match.index))}</div>);
      }
      const lang = match[1] || "text";
      const code = match[2].trim();
      parts.push(
        <div key={`c-${match.index}`} className="my-3">
          <div className="bg-muted rounded-lg p-3 border border-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs"><Terminal className="h-3 w-3 mr-1" />{lang}</Badge>
              <Button variant="ghost" size="sm" onClick={() => copyText(code)} className="h-6 w-6 p-0">
                {copied === code ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
            <pre className="text-sm whitespace-pre-wrap break-all font-mono overflow-x-auto"><code>{code}</code></pre>
          </div>
        </div>
      );
      last = match.index + match[0].length;
    }
    if (last < content.length) {
      parts.push(<div key={`t-${last}`}>{renderText(content.substring(last))}</div>);
    }
    return parts.length > 0 ? parts : renderText(content);
  };

  const renderText = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h4 key={i} className="text-sm font-semibold text-foreground mt-3 mb-1">{line.substring(3)}</h4>;
      if (line.startsWith("# ")) return <h3 key={i} className="text-base font-semibold text-foreground mt-3 mb-1">{line.substring(2)}</h3>;
      if (line.startsWith("### ")) return <h5 key={i} className="text-sm font-medium text-foreground mt-2 mb-1">{line.substring(4)}</h5>;
      if (line.startsWith("- **") || line.startsWith("* **")) {
        const boldEnd = line.indexOf("**", 4);
        if (boldEnd > 0) {
          const bold = line.substring(4, boldEnd);
          const rest = line.substring(boldEnd + 2);
          return <li key={i} className="ml-4 list-disc text-sm text-muted-foreground mb-0.5"><span className="font-medium text-foreground">{bold}</span>{rest}</li>;
        }
      }
      if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i} className="ml-4 list-disc text-sm text-muted-foreground mb-0.5">{renderInline(line.substring(2))}</li>;
      if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 list-decimal text-sm text-muted-foreground mb-0.5">{renderInline(line.substring(line.indexOf(" ") + 1))}</li>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm text-muted-foreground mb-1 leading-relaxed">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    // Simple bold rendering
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => i % 2 === 1 ? <span key={i} className="font-medium text-foreground">{part}</span> : part);
  };

  // ======== UI ========
  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="p-2"><ArrowLeft className="h-4 w-4" /></Button>
          )}
          <div className="h-9 w-9 rounded-lg bg-foreground flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-background" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">AI Programming Assistant</h1>
            <p className="text-xs text-muted-foreground">
              {GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE" ? "Powered by Gemini" : "Local mode — add API key for Gemini"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />New Chat
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-5 max-w-3xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "ai" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-foreground text-background text-xs"><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[85%] min-w-0 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-foreground text-background" : "bg-card border border-border"}`}>
                  {msg.sender === "ai" ? (
                    <div className="prose prose-sm max-w-none">{renderContent(msg.content)}</div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {msg.sender === "ai" && msg.suggestions && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((s, i) => (
                      <Button key={i} variant="outline" size="sm" className="text-xs h-7 border-border" onClick={() => { setInput(s); inputRef.current?.focus(); }}>
                        <Rocket className="h-3 w-3 mr-1" />{s}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {msg.sender === "user" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs"><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-foreground text-background text-xs"><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about programming..."
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1 h-10"
            disabled={isTyping}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="h-10 px-4 bg-foreground text-background hover:bg-foreground/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
