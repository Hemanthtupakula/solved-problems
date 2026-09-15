import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export const ConciergeChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Namaste! Welcome to TBH Concierge. How can I assist your ride today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    "What documents are needed to rent?",
    "Is fuel included in the price?",
    "How is the security deposit refunded?",
    "Emergency Roadside Helpline"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');

    setTimeout(() => {
      let reply = "Our team is here 24/7. Feel free to call our emergency helpline at 1800-TBH-RIDE (1800 824 7433).";
      const lower = text.toLowerCase();
      if (lower.includes('document') || lower.includes('license')) {
        reply = "You only need a valid Indian Driving License (or International Driving Permit for foreign nationals) and Aadhaar/Passport verification.";
      } else if (lower.includes('fuel')) {
        reply = "Petrol/Diesel vehicles are provided with sufficient fuel to reach the next station; return at same fuel level. EV rides include 100% full charge with access to fast charging grids!";
      } else if (lower.includes('deposit') || lower.includes('refund')) {
        reply = "Security deposits are 100% refundable and automatically released back to your original payment method within 2 to 4 hours after vehicle check-in.";
      } else if (lower.includes('emergency') || lower.includes('helpline')) {
        reply = "Emergency Roadside Assistance is active 24/7 across all Indian highways. Toll-Free SOS: 1800-TBH-RIDE (1800 824 7433).";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Concierge Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black shadow-teal-glow hover:scale-105 transition-all flex items-center justify-center"
        title="TBH 24/7 Concierge & SOS"
      >
        <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[90vw] h-[480px] bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#141416] to-[#1E1E24] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00E5C7]/20 border border-[#00E5C7]/50 flex items-center justify-center text-[#00E5C7]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">TBH Concierge — Demo AI Assistant</h4>
                <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 Virtual Assistant & Roadside SOS</span>
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-[#00E5C7] text-black font-semibold rounded-tr-none' 
                    : 'bg-[#0A0A0B] border border-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-[#0A0A0B] border-t border-white/5 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#141416] border-t border-white/10 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about deposits, helplines, hubs..."
              className="flex-1 bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-[#00E5C7] text-black hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
