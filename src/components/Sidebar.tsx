import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, CandlestickChart, Trash2, Edit3, Check, X, Search, 
  Brain, ShieldCheck, HelpCircle, ChevronRight, ChevronLeft, ChevronDown, Settings,
  PanelLeft, User, Home, Wallet
} from 'lucide-react';
import { ChatHistory, UserProfile } from '../types';

interface SidebarProps {
  chatHistories: ChatHistory[];
  activeChatId: string;
  userProfile: UserProfile;
  isOpen?: boolean;
  isRightPanelOpen?: boolean;
  onChangeProfile: (profile: UserProfile) => void;
  onSelectChat: (id: string) => void;
  onCreateNewChat: () => void;
  onRenameChat: (id: string, newTitle: string) => void;
  onDeleteChat: (id: string) => void;
  onToggleSidebar?: () => void;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
  onSignOut?: () => void;
  onGoHome?: () => void;
  isPortfolioOpen?: boolean;
  onTogglePortfolio?: () => void;
  isFaqOpen?: boolean;
  onToggleFaq?: () => void;
}

export default function Sidebar({
  chatHistories,
  activeChatId,
  userProfile,
  isOpen = true,
  isRightPanelOpen = false,
  onChangeProfile,
  onSelectChat,
  onCreateNewChat,
  onRenameChat,
  onDeleteChat,
  onToggleSidebar,
  theme = 'dark',
  setTheme,
  onSignOut,
  onGoHome,
  isPortfolioOpen = false,
  onTogglePortfolio,
  isFaqOpen = false,
  onToggleFaq
}: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [isMemoryExpanded, setIsMemoryExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const isLight = theme === 'light';

  // Close on outside click (desktop only)
  useEffect(() => {
    if (!isOpen || isMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onToggleSidebar?.();
      }
    };
    // Slight delay so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile, onToggleSidebar]);

  // Filtered histories based on search query
  const filteredHistories = chatHistories.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(id);
    setEditTitle(currentTitle);
  };

  const saveRename = (id: string, e: React.FormEvent | React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameChat(id, editTitle.trim());
    }
    setEditingChatId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(null);
  };

  return (
    <>
      {/* Floating Sidebar Panel (Always rendered, width changes dynamically for emerging effect) */}
      <motion.div
        ref={panelRef}
        id="side-chat-panel"
        animate={{
          width: isOpen ? 280 : (window.innerWidth < 768 ? 0 : 48),
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed z-[999] flex flex-col select-none overflow-hidden bg-halo-surface border border-halo-border shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          isOpen
            ? 'top-0 left-0 bottom-0 h-screen rounded-none border-y-0 border-l-0'
            : 'top-0 left-0 bottom-0 h-screen rounded-none border-y-0 border-l-0 hidden md:flex'
        }`}
        style={{
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col h-full w-full overflow-hidden"
            >
              {/* Brand Header – staggered entrance */}
              <motion.div 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 flex items-center justify-between border-b border-halo-border flex-shrink-0"
              >
                <div className="flex items-center gap-2.5">
                  {/* Logo Shield */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center border bg-halo-surface border-halo-border">
                    <img src="https://i.ibb.co/qYKrsTcM/WA-2-2.png" className="w-[98%] h-[98%] object-contain" alt="WayaX Logo" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-bold tracking-tight text-sm text-halo-on-surface">WayaX</span>
                </div>
                
                {onToggleSidebar && (
                  <button
                    onClick={onToggleSidebar}
                    className="w-8 h-8 rounded-xl border border-halo-border bg-halo-elevated hover:bg-halo-elevated hover:border-halo-primary text-halo-on-surface-muted hover:text-halo-on-surface flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Close panel"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                )}
              </motion.div>

              {/* New Chat Button & Search – staggered entrance */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 space-y-2 flex-shrink-0"
              >
                <button
                  onClick={onGoHome}
                  className="w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 rounded-xl border border-halo-border bg-white/[0.04] text-halo-on-surface hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-all cursor-pointer shadow-sm select-none"
                  title="Go to Home Screen"
                >
                  <Home className="w-4 h-4 text-[#5B6BFF]" />
                  Home
                </button>

                <button
                  onClick={onCreateNewChat}
                  id="btn-new-chat"
                  className="w-full halo-btn-primary py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-white font-bold" />
                  New Chat
                </button>

                <button
                  onClick={onTogglePortfolio}
                  className={`w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 rounded-xl border transition-all cursor-pointer shadow-sm select-none ${
                    isPortfolioOpen
                      ? 'border-[#2BE08C] bg-[#2BE08C]/15 text-white font-bold'
                      : 'border-halo-border bg-white/[0.04] text-halo-on-surface hover:text-white hover:bg-[#2BE08C]/10 hover:border-[#2BE08C]/20'
                  }`}
                  title="Open Portfolio Panel"
                >
                  <Wallet className="w-4 h-4 text-[#2BE08C]" />
                  Portfolio
                </button>

                <button
                  onClick={onToggleFaq}
                  className={`w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 rounded-xl border transition-all cursor-pointer shadow-sm select-none ${
                    isFaqOpen
                      ? 'border-[#5B6BFF] bg-[#5B6BFF]/15 text-white font-bold'
                      : 'border-halo-border bg-white/[0.04] text-halo-on-surface hover:text-white hover:bg-[#5B6BFF]/10 hover:border-[#5B6BFF]/20'
                  }`}
                  title="Open FAQ Panel"
                >
                  <HelpCircle className="w-4 h-4 text-[#5B6BFF]" />
                  FAQ
                </button>

                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-halo-on-surface-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full halo-input pl-9 pr-8 py-1.5 text-xs focus:outline-none"
                  />
                </div>
              </motion.div>

              {/* Chat History List – staggered entrance */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 overflow-y-auto px-2 space-y-0.5 min-h-0 chat-history-list"
              >
                <div className="px-2 py-1.5 text-[10.5px] font-bold tracking-wider uppercase flex justify-between items-center text-halo-on-surface-faint">
                  <span>Chat History</span>
                </div>

                {filteredHistories.length === 0 ? (
                  <div className="p-6 text-center text-xs text-halo-on-surface-faint">
                    No history found
                  </div>
                ) : (
                  filteredHistories.map((chat) => {
                    const isActive = chat.id === activeChatId;
                    const isEditing = chat.id === editingChatId;

                    return (
                      <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
                          isActive 
                            ? 'bg-halo-elevated border-halo-primary text-halo-on-surface shadow-sm'
                            : 'bg-transparent border-transparent text-halo-on-surface-muted hover:bg-halo-elevated hover:text-halo-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <CandlestickChart className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-halo-primary' : 'text-halo-on-surface-faint group-hover:text-halo-on-surface-muted'}`} />
                          
                          {isEditing ? (
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="halo-input border rounded-xl px-1.5 py-0.5 text-xs focus:outline-none w-full"
                              autoFocus
                            />
                          ) : (
                            <span className="truncate pr-1">{chat.title}</span>
                          )}
                        </div>

                        {/* Hover Action buttons */}
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          {isEditing ? (
                            <>
                              <button 
                                onClick={(e) => saveRename(chat.id, e)}
                                className="p-0.5 hover:text-halo-success text-halo-on-surface-faint"
                                title="Save rename"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={cancelRename}
                                className="p-0.5 hover:text-halo-error text-halo-on-surface-faint"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => startRename(chat.id, chat.title, e)}
                                className="p-0.5 transition hover:text-halo-on-surface text-halo-on-surface-faint"
                                title="Rename"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteChat(chat.id);
                                }}
                                className="p-0.5 transition hover:text-halo-error text-halo-on-surface-faint"
                                title="Delete chat"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>

              {/* Memory & Preferences Drawer Container at bottom – staggered entrance */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-halo-border flex-shrink-0"
              >
                <div 
                  onClick={() => setIsMemoryExpanded(!isMemoryExpanded)} 
                  className="p-3 flex items-center justify-between cursor-pointer transition-all hover:bg-halo-elevated"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center border border-halo-border bg-halo-elevated">
                      <User className="w-4 h-4 text-halo-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold flex items-center gap-1.5 text-halo-on-surface">
                        Profile
                        <span className="text-[9px] border px-1 rounded-xl bg-white/[0.06] text-halo-primary border-halo-primary/25">Active</span>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-halo-on-surface-muted transition-transform duration-200" />
                </div>

                <AnimatePresence>
                  {isMemoryExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3 pb-4 space-y-3 overflow-hidden text-xs border-t border-halo-border"
                    >
                      <div className="pt-2 text-[10px] font-mono tracking-wider uppercase flex items-center justify-between text-halo-on-surface-muted">
                        <span>Investor Memory Profile</span>
                        <Settings className="w-3 h-3 animate-spin text-halo-primary" style={{ animationDuration: '6s' }} />
                      </div>

                      {/* Memory Form Fields */}
                      <div className="space-y-2 pt-1 font-sans">
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-semibold uppercase block mb-1 text-halo-on-surface-muted">Name</label>
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => onChangeProfile({ ...userProfile, name: e.target.value })}
                            className="w-full halo-input py-1.5 px-2.5 text-[16px] md:text-xs focus:outline-none"
                          />
                        </div>

                        {/* Risk */}
                        <div>
                          <label className="text-[10px] font-semibold uppercase block mb-1 text-halo-on-surface-muted">Risk Tolerance</label>
                          <select
                            value={userProfile.riskTolerance}
                            onChange={(e) => onChangeProfile({ ...userProfile, riskTolerance: e.target.value as any })}
                            className="w-full halo-input py-1.5 px-2 text-[16px] md:text-xs focus:outline-none"
                          >
                            <option value="Low">Low (Capital Preservation)</option>
                            <option value="Moderate">Moderate (Dividend + Growth)</option>
                            <option value="High">High (Momentum Breakouts)</option>
                            <option value="Aggressive">Aggressive (F&O / Microcaps)</option>
                          </select>
                        </div>

                        {/* Horizon */}
                        <div>
                          <label className="text-[10px] font-semibold uppercase block mb-1 text-halo-on-surface-muted">Investment Horizon</label>
                          <select
                            value={userProfile.investmentHorizon}
                            onChange={(e) => onChangeProfile({ ...userProfile, investmentHorizon: e.target.value as any })}
                            className="w-full halo-input py-1.5 px-2 text-[16px] md:text-xs focus:outline-none"
                          >
                            <option value="Quick Trade">Quick Trade (1-3 weeks)</option>
                            <option value="Short-Term">Short-Term (3-6 months)</option>
                            <option value="Medium-Term">Medium-Term (6-12 months)</option>
                            <option value="Long-Term">Long-Term (1-3 years)</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-[10px] rounded-xl p-2 flex items-center gap-1.5 mt-2 border text-halo-primary/80 bg-halo-primary/10 border-halo-primary/15">
                        <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 text-halo-primary" />
                        <span>Memory is attached to all outbound AI queries automatically.</span>
                      </div>

                      {onSignOut && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSignOut();
                          }}
                          className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-halo-error/10 border-halo-error/20 text-halo-error hover:bg-halo-error/20"
                        >
                          Sign Out & Reset
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col h-full w-full justify-between items-center py-4 overflow-hidden bg-[#12131a] text-[#8f92a1] border-r border-white/5"
            >
              {/* Top Section Actions */}
              <div className="flex flex-col items-center gap-3 w-full">
                {/* 1. Sidebar Toggle Button (Logo/ChevronRight) */}
                <button
                  onClick={onToggleSidebar}
                  className="group relative w-8 h-8 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Expand Sidebar"
                >
                  {/* Logo Shield (default visible, hidden on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
                    <img src="https://i.ibb.co/qYKrsTcM/WA-2-2.png" className="w-[80%] h-[80%] object-contain" alt="WayaX Logo" referrerPolicy="no-referrer" />
                  </div>
                  {/* Arrow (hidden by default, visible on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-white">
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                </button>
                
                <div className="w-5 h-px bg-white/10 my-0.5" />

                {/* 2. Home Button */}
                <button
                  onClick={onGoHome}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Go to Home"
                >
                  <Home className="w-4 h-4" />
                </button>

                {/* 3. New Chat Button - Brand Indigo/Blue with white plus */}
                <button
                  onClick={onCreateNewChat}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#5B6BFF] hover:bg-[#7886FF] text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md font-bold"
                  title="New Chat"
                >
                  <Plus className="w-4 h-4 text-white" strokeWidth={3} />
                </button>

                {/* 3.5. Portfolio Button */}
                <button
                  onClick={onTogglePortfolio}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    isPortfolioOpen
                      ? 'bg-[#2BE08C] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  title="Portfolio"
                >
                  <Wallet className="w-4 h-4 text-[#2BE08C]" />
                </button>

                {/* 3.6. FAQ Button */}
                <button
                  onClick={onToggleFaq}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    isFaqOpen
                      ? 'bg-[#5B6BFF] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  title="FAQ"
                >
                  <HelpCircle className="w-4 h-4 text-[#5B6BFF]" />
                </button>
              </div>

              {/* Bottom Section Actions */}
              <div className="flex flex-col items-center gap-3 w-full">
                {/* 4. User Profile Button */}
                <button
                  onClick={onToggleSidebar}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="User Profile"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
