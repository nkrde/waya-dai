import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ArrowUpRight, TrendingDown, Clock, Search, BookOpen, AlertCircle, Wallet, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQDrawerProps {
  onQuestionClick: (question: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  theme?: 'dark' | 'light';
  isPortfolioOpen?: boolean;
  onTogglePortfolio?: () => void;
}

export default function FAQDrawer({
  onQuestionClick,
  isOpen,
  onToggle,
  theme = 'dark',
  isPortfolioOpen = false,
  onTogglePortfolio
}: FAQDrawerProps) {
  const isLight = theme === 'light';

  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const FAQ_SECTIONS = [
    {
      title: 'STOCKS TO BUY',
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-halo-success" />,
      questions: [
        'Give me list of stocks I can buy',
        'Give me list of stocks that can give 10% returns in 30 days',
        'Give me 3 stocks in IT sector I can buy today',
        'Show me Pharma stocks currently in the BUY zone',
        'Which Capital Goods stocks are in the BUY zone right now?',
        'Give me 2 Chemicals stocks to buy this week',
        'Show me FMCG stocks in the BUY zone',
        'Which Metals stocks can I buy right now?',
        'Give me a diversified portfolio of 10 stocks for 1 year',
        'Give me 5 Small Cap stocks with high growth potential'
      ]
    },
    {
      title: 'SHORT SELLING',
      icon: <TrendingDown className="w-3.5 h-3.5 text-halo-error" />,
      questions: [
        'Give me 1 stock that I can short',
        'Which stocks can I short right now?',
        'Give me a bearish call in the Power sector',
        'Show me 2 short selling opportunities in Finance',
        'Give me a short trade in the FMCG sector'
      ]
    },
    {
      title: 'LONG-TERM PICKS',
      icon: <Clock className="w-3.5 h-3.5 text-halo-info" />,
      questions: [
        'Show me the multibagger portfolio picks',
        'What are your long-term wealth creation stock picks?',
        'Give me stocks that can give 3x returns in 3 years'
      ]
    },
    {
      title: 'TRACK RECORD',
      icon: <Search className="w-3.5 h-3.5 text-halo-warning" />,
      questions: [
        'What is your overall track record?',
        'How many of your past recommendations were profitable?',
        'Show me your best performing stock recommendations',
        'What is your win rate on closed calls?',
        'Show me recent closed trades and their returns'
      ]
    },
    {
      title: 'ABOUT WAYA',
      icon: <BookOpen className="w-3.5 h-3.5 text-halo-primary" />,
      questions: [
        'What is a BUY zone and how does it work?',
        'What is a short trade and how do I execute it?',
        'What is the Multibagger Portfolio?',
        'What are Stocks Under Radar?',
        'How many open calls do you have right now?',
        'How much should I invest in each recommendation?',
        'Can I use my own broker account to execute trades?',
        'How do I contact Waya support?'
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header – staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="p-4 flex items-center justify-between border-b border-halo-border flex-shrink-0"
      >
        <div className="flex items-center gap-1">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-halo-border bg-halo-surface/80">
            <button
              className="h-7 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all bg-[#5B6BFF]/15 border border-[#5B6BFF]/30 text-white font-semibold cursor-default"
              title="Active: FAQ Panel"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#5B6BFF]" />
              <span className="text-[11px] tracking-wide uppercase">FAQ</span>
            </button>
            <button
              onClick={onTogglePortfolio}
              className="h-7 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-halo-on-surface-muted hover:text-white hover:bg-white/[0.06] cursor-pointer"
              title="Switch to Portfolio Panel"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span className="text-[11px] tracking-wide uppercase">Portfolio</span>
            </button>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <XButton />
        </button>
      </motion.div>

      {/* Tip banner – staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="p-3 text-[10px] flex items-center gap-2 border-b border-halo-border/40 bg-[#5B6BFF]/5 text-halo-on-surface-muted flex-shrink-0"
      >
        <AlertCircle className="w-3.5 h-3.5 text-[#5B6BFF] flex-shrink-0" />
        <span>Tap any query below to run instant SEBI-guided advisory analysis</span>
      </motion.div>

      {/* Questions list – staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 overflow-y-auto custom-scroll px-3 py-3 space-y-5 font-sans select-text"
      >
        {FAQ_SECTIONS.map((section, idx) => {
          const isExpanded = !!expandedSections[idx];

          return (
            <div key={idx} className="space-y-3 pb-3 border-b border-halo-border/10 last:border-b-0 last:pb-1">
              {/* Section Title Accordion Button */}
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between pl-1.5 pr-2 py-2 border-l-2 border-[#5B6BFF] hover:bg-[#5B6BFF]/5 transition-colors duration-150 text-left cursor-pointer rounded-r-xl"
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-halo-on-surface font-sans">
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-halo-on-surface-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              
              {/* Questions List */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden space-y-2 pl-1 pt-1"
                  >
                    {section.questions.map((question, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => onQuestionClick(question)}
                        className="group relative w-full text-left rounded-xl px-4 py-3 text-xs font-sans transition-all duration-200 cursor-pointer flex items-start justify-between border bg-halo-surface/40 hover:bg-[#5B6BFF]/5 border-halo-border/50 hover:border-[#5B6BFF]/40 text-slate-300 hover:text-white hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                        title={question}
                      >
                        <span className="flex-1 pr-2 leading-relaxed whitespace-normal">{question}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#5B6BFF] flex-shrink-0 mt-0.5" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function XButton() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
