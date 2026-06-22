import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare } from 'lucide-react';

interface ChatSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
}

export default function ChatSidePanel({ isOpen, onClose }: ChatSidePanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = { id: Date.now().toString(), text: input.trim(), sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  }, [input]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (data) {
      const newMsg: ChatMessage = { id: Date.now().toString(), text: `Dropped: ${data}`, sender: 'system' };
      setMessages(prev => [...prev, newMsg]);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 h-full w-[320px] z-[1005] flex flex-col bg-halo-surface/85 border-l border-halo-border backdrop-blur-2xl shadow-lg"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-halo-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-halo-primary" />
              <span className="font-semibold text-halo-on-surface">Chat Panel</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-xl hover:bg-halo-elevated">
              <X className="w-4 h-4 text-halo-on-surface-muted" />
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-[#5B6BFF]/10 text-halo-on-surface' : 'bg-halo-surface/80 text-halo-on-surface-muted'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-halo-border bg-halo-surface/50">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              className="flex-1 rounded-xl px-3 py-1.5 bg-halo-surface/30 text-halo-on-surface placeholder-halo-on-surface-faint focus:outline-none"
              placeholder="Type a message…"
            />
            <button onClick={handleSend} className="p-2 rounded-xl hover:bg-halo-elevated">
              <Send className="w-5 h-5 text-halo-primary" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
