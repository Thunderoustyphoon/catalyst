import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical, 
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Clock,
  CheckCheck,
  Loader2
} from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  type: 'text' | 'image' | 'file';
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  chatType?: 'user' | 'ai' | 'support';
  chatPartner?: {
    name: string;
    role: string;
    isOnline: boolean;
    avatar?: string;
  } | null;
}

export function ChatInterface({ 
  isOpen, 
  onClose, 
  onMinimize, 
  isMinimized, 
  chatType = 'user',
  chatPartner
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set default chat partner if none provided
  const defaultChatPartner = {
    name: "Gordon Pateron",
    role: "Instructor",
    isOnline: true
  };
  
  const activeChatPartner = chatPartner || defaultChatPartner;

  const [messages, setMessages] = useState<Message[]>(() => {
    if (chatType === 'ai') {
      return [
        {
          id: 1,
          sender: "AI Assistant",
          content: "Hello! I'm your AI Learning Assistant. I'm here to help you with programming concepts, project ideas, career guidance, and any questions about your learning journey. How can I assist you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwnMessage: false,
          type: 'text'
        }
      ];
    } else {
      return [
        {
          id: 1,
          sender: activeChatPartner.name,
          content: "Hi, I'm here to help you with the Motion Design course. How's your progress going?",
          timestamp: "2:30 PM",
          isOwnMessage: false,
          type: 'text'
        },
        {
          id: 2,
          sender: "You",
          content: "Hi! I'm working on the animation timeline section. Could you help me understand keyframes better?",
          timestamp: "2:32 PM",
          isOwnMessage: true,
          type: 'text',
          status: 'read'
        },
        {
          id: 3,
          sender: activeChatPartner.name,
          content: "Of course! Keyframes are essential for creating smooth animations. Let me share a quick example with you.",
          timestamp: "2:35 PM",
          isOwnMessage: false,
          type: 'text'
        },
        {
          id: 4,
          sender: "You",
          content: "That would be great, thank you!",
          timestamp: "2:36 PM",
          isOwnMessage: true,
          type: 'text',
          status: 'delivered'
        }
      ];
    }
  });

  // Intelligent local AI response system
  const generateLocalAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const message = userMessage.toLowerCase().trim();

    // Specific React help
    if (message.includes('react')) {
      if (message.includes('hook') || message.includes('usestate') || message.includes('useeffect')) {
        return "React hooks are powerful! useState for state: `const [count, setCount] = useState(0)`. useEffect for side effects: `useEffect(() => { /* code */ }, [dependencies])`. What specific hook challenge are you facing?";
      }
      if (message.includes('component')) {
        return "React components should be small and focused. Use props for data input, state for internal data. Keep them under 200 lines. Are you building a specific component that needs help?";
      }
      return "React is great for building UIs! Key concepts: components, props, state, and hooks. Focus on functional components with hooks. What specific React topic can I help clarify?";
    }

    // JavaScript specific help
    if (message.includes('javascript') || message.includes('js')) {
      if (message.includes('async') || message.includes('await') || message.includes('promise')) {
        return "Async JavaScript: Promises represent future values. async/await makes it cleaner: `async function fetchData() { const result = await fetch(url); return result.json(); }`. What async scenario are you working with?";
      }
      if (message.includes('array') || message.includes('map') || message.includes('filter')) {
        return "Array methods are essential! map() transforms elements, filter() selects elements, reduce() combines them. Example: `users.filter(u => u.age >= 18).map(u => u.name)`. What array operation do you need?";
      }
      return "JavaScript fundamentals: variables, functions, objects, arrays. Modern features: arrow functions, destructuring, template literals. What specific JavaScript concept needs explanation?";
    }

    // Career and job guidance
    if (message.includes('career') || message.includes('job') || message.includes('interview')) {
      if (message.includes('interview')) {
        return "Interview prep: Practice coding challenges, prepare to discuss your projects, review common questions (closures, async, React lifecycle). Be ready to code live and explain your thinking. What interview aspect worries you most?";
      }
      if (message.includes('portfolio')) {
        return "Strong portfolio needs: 3-5 quality projects, live demos, clean GitHub repos, detailed READMEs. Show your problem-solving process, not just the final result. What project are you working on?";
      }
      return "Career growth: Build projects, contribute to open source, network authentically, keep learning. Focus on solving real problems. Where are you in your career journey?";
    }

    // Learning and study help
    if (message.includes('learn') || message.includes('study') || message.includes('beginner')) {
      return "Effective learning: 80% hands-on practice, 20% theory. Build projects while learning concepts. Start small, add complexity gradually. Consistency beats intensity. What are you currently learning?";
    }

    // Debugging and code help
    if (message.includes('error') || message.includes('debug') || message.includes('stuck') || message.includes('problem')) {
      return "Debugging tips: Read error messages carefully, use console.log to track data flow, check browser DevTools, break problems into smaller pieces. What specific error or issue are you facing?";
    }

    // Motivation and encouragement
    if (message.includes('motivation') || message.includes('hard') || message.includes('difficult') || message.includes('frustrated')) {
      return "Coding is challenging but rewarding! Every expert was once a beginner. Feeling stuck is normal and means you're growing. Take breaks, celebrate small wins, and remember why you started. You've got this! 💪";
    }

    // Gratitude responses
    if (message.includes('thank') || message.includes('appreciate') || message.includes('helpful')) {
      return "You're very welcome! I'm glad I could help. Keep asking questions and building projects. The coding community is here to support each other. What's your next challenge?";
    }

    // Project and idea help
    if (message.includes('project') || message.includes('idea') || message.includes('build')) {
      return "Project ideas: Start with a todo app, then weather app, then something you're passionate about. Focus on solving real problems. Each project should showcase different skills. What type of project interests you?";
    }

    // Default contextual response
    const contextualResponses = [
      "That's an interesting question! I'm here to help with React, JavaScript, career advice, or learning strategies. Could you be more specific about what you need help with?",
      "I'd love to help! For the best assistance, let me know: Are you facing a coding challenge, need career guidance, or want learning advice? What's your main focus right now?",
      "Great to chat with you! I can provide quick help with web development, career tips, or learning strategies. What specific area would be most helpful?",
      "Happy to assist! Whether it's debugging code, planning your learning path, or career advice, I'm here to help. What challenge are you working on?"
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwnMessage: true,
        type: 'text',
        status: 'sent'
      };
      setMessages(prev => [...prev, newMessage]);
      const userMessage = message;
      setMessage("");

      // Handle AI responses with local system
      if (chatType === 'ai') {
        setIsLoading(true);
        try {
          const aiResponseContent = await generateLocalAIResponse(userMessage);
          const response: Message = {
            id: messages.length + 2,
            sender: 'AI Assistant',
            content: aiResponseContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwnMessage: false,
            type: 'text'
          };
          setMessages(prev => [...prev, response]);
        } catch (error) {
          const errorResponse: Message = {
            id: messages.length + 2,
            sender: 'AI Assistant',
            content: "I'm here to help! Try asking about React, JavaScript, career advice, or learning strategies.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwnMessage: false,
            type: 'text'
          };
          setMessages(prev => [...prev, errorResponse]);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Simulate response for instructor/user chat
        setTimeout(() => {
          const response: Message = {
            id: messages.length + 2,
            sender: activeChatPartner.name,
            content: "Great question! I'll prepare a detailed explanation for you.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwnMessage: false,
            type: 'text'
          };
          setMessages(prev => [...prev, response]);
        }, 1500);
      }
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-600" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <Card className="h-full flex flex-col border-gray-200 shadow-lg bg-white">
        {/* Chat Header */}
        <CardHeader className="pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-black text-white text-sm">
                    {chatType === 'ai' ? <Bot className="w-4 h-4" /> : activeChatPartner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {activeChatPartner.isOnline && chatType !== 'ai' && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-black text-sm truncate">
                  {chatType === 'ai' ? 'AI Assistant' : activeChatPartner.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {chatType === 'ai' ? 'Quick help available' : `${activeChatPartner.role} ${activeChatPartner.isOnline ? '• Online' : '• Offline'}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {!isMinimized && chatType !== 'ai' && (
                <>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Phone className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Video className="w-3 h-3" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={onMinimize}>
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0 bg-muted/20 hover:bg-destructive hover:text-white text-foreground border border-border" onClick={onClose}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[75%] ${msg.isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!msg.isOwnMessage && (
                      <Avatar className="w-6 h-6 flex-shrink-0">
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {chatType === 'ai' ? <Bot className="w-3 h-3" /> : msg.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`p-3 rounded-lg ${
                      msg.isOwnMessage 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-black'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        msg.isOwnMessage ? 'flex-row-reverse' : ''
                      }`}>
                        <span className={`text-xs ${
                          msg.isOwnMessage ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {msg.timestamp}
                        </span>
                        {msg.isOwnMessage && getStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator for AI responses */}
              {isLoading && chatType === 'ai' && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2 max-w-[75%]">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-lg bg-gray-100 text-black">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <p className="text-sm">AI is thinking...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder={chatType === 'ai' ? "Ask me anything..." : "Type here..."}
                    disabled={isLoading}
                    className="pr-10 border-gray-200 focus:border-black"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 p-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="w-8 h-8 p-0 bg-black hover:bg-gray-800"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}