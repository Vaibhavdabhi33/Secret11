
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, Sparkles, ChevronDown, X } from 'lucide-react';
import { chatWithSkincareBot } from '../services/gemini';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: 'Namaste! I am your Secret11 AI Skincare Assistant. Ask me anything about skincare routines or ingredients!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const response = await chatWithSkincareBot(userMsg, history);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-8 right-8 p-4 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-all duration-300 z-40 group ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      >
        <MessageSquare className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      </button>

      <div className={`fixed bottom-24 md:bottom-8 right-8 w-[calc(100%-4rem)] md:w-full max-w-[380px] bg-[#080808] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/10 h-[500px] md:h-[600px] transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
          {/* Header */}
          <div className="bg-[#111] p-5 flex justify-between items-center text-white border-b border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            
            <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-600/30 relative shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                     <Bot className="h-5 w-5 text-blue-400" />
                     <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#111]"></div>
                </div>
                <div>
                    <span className="font-bold block text-sm tracking-wide">Secret11 AI</span>
                    <span className="text-[10px] text-green-500 font-mono block tracking-wider flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> ONLINE
                    </span>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition hover:bg-white/5 p-2 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 bg-black space-y-6 scrollbar-hide relative">
             <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                    msg.role === 'user' ? 'bg-white text-black rounded-br-none font-medium' : 'bg-[#151515] text-gray-300 border border-white/10 rounded-bl-none font-light'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
             {loading && (
                 <div className="flex justify-start relative z-10">
                    <div className="bg-[#151515] border border-white/5 text-gray-500 rounded-2xl p-4 text-xs flex items-center gap-2">
                        <Sparkles className="h-3 w-3 animate-spin text-blue-500" /> 
                        <span className="tracking-widest uppercase">Analyzing...</span>
                    </div>
                 </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-[#111] border-t border-white/5">
            <div className="relative">
                <input 
                    type="text" 
                    className="w-full pl-5 pr-12 py-4 bg-black text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-sm placeholder-gray-600 transition-all shadow-inner"
                    placeholder="Ask about your skin..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !inputValue.trim()}
                    className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
            <div className="text-[10px] text-gray-600 text-center mt-3 font-mono">
                Secret11 Smart Assistant
            </div>
          </div>
      </div>
    </>
  );
};

export default ChatWidget;
