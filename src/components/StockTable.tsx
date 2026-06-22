import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Share2, TrendingUp, Info, Activity, Shield, TrendingDown, Plus } from 'lucide-react';
import { StockRecommendation } from '../types';

interface StockTableProps {
  stocks: StockRecommendation[];
  theme?: string;
  onAddToPortfolio?: (stock: StockRecommendation) => void;
}

export default function StockTable({ stocks, onAddToPortfolio }: StockTableProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <div className="w-full font-sans mt-4 text-halo-on-surface select-none">
      {/* 1. Mobile Card List Layout */}
      <div className="block md:hidden space-y-3.5">
        {stocks.map((stock, index) => {
          const stockId = stock.id || stock.ticker || `stock-${index}`;
          const isExpanded = expandedIds.includes(stockId);
          const isBuy = stock.action === 'BUY';

          return (
            <div 
              key={stockId} 
              className="bg-halo-surface border border-halo-border rounded-xl p-4.5 transition-all duration-300 text-halo-on-surface"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-3 mb-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[14px] font-sans tracking-tight leading-snug text-halo-on-surface">
                    {stock.stockName}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-xl font-semibold bg-halo-elevated text-halo-on-surface-muted border border-halo-border">
                      {stock.ticker}
                    </span>
                    <span className="text-[9.5px] font-semibold font-mono px-1.5 py-0.5 rounded-xl bg-white/[0.06] text-halo-primary border border-halo-primary/25">
                      Approved Advice
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {isBuy ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-white/[0.06] text-halo-success border border-halo-success/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-halo-success animate-pulse" />
                      BUY
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-white/[0.06] text-halo-error border border-halo-error/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-halo-error animate-pulse" />
                      SHORT
                    </span>
                  )}
                  {stock.targetUpside.includes('-') ? (
                    <div className="flex items-center gap-1 bg-white/[0.06] px-2 py-0.5 rounded-xl border border-halo-error/25">
                      <TrendingDown className="w-3 h-3 text-halo-error" />
                      <span className="text-[11px] font-mono font-bold text-halo-error">
                        {stock.targetUpside}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-white/[0.06] px-2 py-0.5 rounded-xl border border-halo-success/25">
                      <TrendingUp className="w-3 h-3 text-halo-success" />
                      <span className="text-[11px] font-mono font-bold text-halo-success">
                        {stock.targetUpside}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5 p-3.5 rounded-xl border bg-halo-elevated border-halo-border">
                <div>
                  <span className="text-[9px] font-mono uppercase block tracking-wider text-halo-on-surface-faint">Price Range</span>
                  <span className="text-[12px] font-bold font-mono text-halo-info">{stock.priceRange}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase block tracking-wider text-halo-on-surface-faint">Target Price</span>
                  <span className="text-[12px] font-extrabold font-mono text-halo-success">{stock.targetPrice}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase block tracking-wider text-halo-on-surface-faint">Stop Loss</span>
                  <span className="text-[12px] font-semibold font-mono text-halo-error">{stock.stopLoss}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase block tracking-wider text-halo-on-surface-faint">Tenure</span>
                  <span className="text-[12px] font-semibold font-mono text-halo-on-surface-muted">{stock.tenure}</span>
                </div>
              </div>

              {/* Bottom Card Toggle Controls */}
              <div className="mt-4 flex items-center justify-between border-t border-halo-border pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToPortfolio) {
                      onAddToPortfolio(stock);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold tracking-tight transition-all cursor-pointer border border-halo-border bg-halo-surface hover:bg-halo-elevated text-[#5B6BFF] hover:text-white"
                  title="Add to Portfolio"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Portfolio</span>
                </button>

                <button
                  onClick={() => toggleExpand(stockId)}
                  className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-semibold tracking-tight transition-all cursor-pointer border ${
                    isExpanded 
                      ? 'bg-halo-elevated text-halo-on-surface border-halo-border-strong' 
                      : 'bg-halo-surface hover:bg-halo-elevated text-halo-on-surface-muted hover:text-halo-on-surface border-halo-border'
                  }`}
                >
                  {isExpanded ? 'Less' : 'Analysis Detail'}
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Mobile Expanded indicators block */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 mt-4 pt-4 border-t border-halo-border">
                      {/* Thesis */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-halo-warning tracking-wider flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-halo-warning" />
                          INVESTMENT THESIS
                        </span>
                        <div className="text-[12px] leading-relaxed select-text p-3.5 rounded-xl text-slate-100 bg-halo-surface border-l-4 border-l-halo-warning border-t border-r border-b border-halo-border/40 shadow-md">
                          "{stock.thesis}"
                        </div>
                      </div>

                      {/* Technical */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-halo-primary tracking-wider flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-halo-primary" />
                          TECHNICAL INDICATORS
                        </span>
                        <div className="space-y-2 font-mono text-[11px] text-slate-300">
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">RDX Score</span>
                            <span className="font-bold text-white">{stock.technical.rdxScore} <span className="text-slate-500 font-normal">/ 5</span></span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">RSI Weekly</span>
                            <span className="font-bold text-halo-success">{stock.technical.rsiWeekly}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">ADX Weekly</span>
                            <span className="font-semibold text-white">{stock.technical.adxWeekly}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">EMA 50/200</span>
                            <span className="font-semibold text-white">{stock.technical.ema50_200}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">3M Return</span>
                            <span className="font-bold text-halo-success">{stock.technical.return3M}</span>
                          </div>
                        </div>
                      </div>

                      {/* Fundamental */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-halo-success tracking-wider flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-halo-success" />
                          FUNDAMENTAL RATIOS
                        </span>
                        <div className="space-y-2 font-mono text-[11px] text-slate-300">
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">PE Ratio</span>
                            <span className="font-semibold text-white">{stock.fundamental.peRatio}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">ROE %</span>
                            <span className="font-semibold text-white">{stock.fundamental.roe}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/40 border border-halo-border/30">
                            <span className="text-slate-400">Sales Growth 3Y</span>
                            <span className="font-bold text-halo-success">{stock.fundamental.profitGrowth3Y}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 2. Desktop Table Layout with Extreme Polish */}
      <div className="hidden md:block overflow-hidden rounded-[24px] border bg-[#12131a]/40 border-white/[0.04] backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b text-[10px] tracking-widest font-extrabold uppercase font-sans bg-halo-elevated border-halo-border text-halo-on-surface-muted">
                <th className="py-3.5 px-4 text-center w-14 font-extrabold font-mono opacity-80">#</th>
                <th className="py-3.5 px-4 min-w-[220px] font-extrabold">Company / Symbol</th>
                <th className="py-3.5 px-4 text-center font-extrabold w-32">Call Action</th>
                <th className="py-3.5 px-4 text-center font-extrabold">Trigger Zone</th>
                <th className="py-3.5 px-4 text-center font-extrabold">Target Price</th>
                <th className="py-3.5 px-4 text-center font-extrabold">Protective SL</th>
                <th className="py-3.5 px-4 text-center font-extrabold min-w-[130px]">Target Upside</th>
                <th className="py-3.5 px-4 text-center font-extrabold">Horizon Tenure</th>
                <th className="py-3.5 px-4 text-center w-32 font-extrabold">Details</th>
                <th className="py-3.5 px-4 text-center w-24 font-extrabold">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-halo-border)] text-[12.5px] text-halo-on-surface">
              {stocks.map((stock, index) => {
                const stockId = stock.id || stock.ticker || `stock-${index}`;
                const isExpanded = expandedIds.includes(stockId);
                const isBuy = stock.action === 'BUY';

                return (
                  <React.Fragment key={stockId}>
                    <tr className={`transition-all duration-300 hover:bg-halo-elevated/50 ${isExpanded ? 'bg-halo-elevated/30' : ''}`}>
                      {/* 1. Monospace Index */}
                      <td className="py-4.5 px-5 text-center font-mono font-semibold text-halo-on-surface-faint">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      
                      {/* 2. Company / Symbol */}
                      <td className="py-4.5 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold tracking-tight text-[13.5px] font-sans text-halo-on-surface">
                            {stock.stockName}
                          </span>
                          <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded-xl border mt-1.5 self-start bg-white/[0.06] border-white/10 text-halo-on-surface-muted">
                            {stock.ticker}
                          </span>
                        </div>
                      </td>

                      {/* 3. Call Action */}
                      <td className="py-4.5 px-5 text-center">
                        {isBuy ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest border bg-white/[0.06] text-halo-success border-halo-success/25 shadow-[0_0_12px_rgba(43,224,140,0.05)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-halo-success animate-pulse" />
                            BUY
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest border bg-white/[0.06] text-halo-error border-halo-error/25 shadow-[0_0_12px_rgba(255,58,92,0.05)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-halo-error animate-pulse" />
                            SHORT
                          </span>
                        )}
                      </td>

                      {/* 4. Trigger Zone */}
                      <td className="py-4.5 px-5 text-center font-mono font-semibold text-halo-info">
                        {stock.priceRange}
                      </td>

                      {/* 5. Target Price */}
                      <td className="py-4.5 px-5 text-center font-mono font-bold text-halo-success">
                        {stock.targetPrice}
                      </td>

                      {/* 6. Protective SL */}
                      <td className="py-4.5 px-5 text-center font-mono font-semibold text-halo-error">
                        {stock.stopLoss}
                      </td>

                      {/* 7. Target Upside */}
                      <td className="py-4.5 px-5 text-center">
                        {stock.targetUpside.includes('-') ? (
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl font-bold font-mono border bg-white/[0.06] text-halo-error border-halo-error/25">
                            <TrendingDown className="w-3.5 h-3.5 text-halo-error" />
                            <span>{stock.targetUpside}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl font-bold font-mono border bg-white/[0.06] text-halo-success border-halo-success/25">
                            <TrendingUp className="w-3.5 h-3.5 text-halo-success" />
                            <span>{stock.targetUpside}</span>
                          </div>
                        )}
                      </td>

                      {/* 8. Horizon Tenure */}
                      <td className="py-4.5 px-5 text-center font-mono font-semibold text-[11px] text-halo-on-surface-muted">
                        {stock.tenure}
                      </td>

                      {/* 9. Details Toggle */}
                      <td className="py-4.5 px-5 text-center">
                        <button
                          onClick={() => toggleExpand(stockId)}
                          className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[10.5px] font-semibold tracking-tight transition-all cursor-pointer border ${
                            isExpanded 
                              ? 'bg-halo-elevated text-halo-on-surface border-halo-border-strong' 
                              : 'bg-halo-surface hover:bg-halo-elevated text-halo-on-surface-muted hover:text-halo-on-surface border-halo-border'
                          }`}
                        >
                          <span>{isExpanded ? 'Hide' : 'Analyze'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </td>

                      {/* 10. Add to Portfolio Button */}
                      <td className="py-4.5 px-5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddToPortfolio) {
                              onAddToPortfolio(stock);
                            }
                          }}
                          className="inline-flex items-center justify-center p-1.5 rounded-xl border border-halo-border bg-halo-surface hover:bg-halo-elevated text-[#5B6BFF] hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          title="Add to Portfolio"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* 10. Secondary Expanded Analytical Drawer Grid */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <tr>
                          <td colSpan={10} className="p-0 border-t bg-transparent border-halo-border">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 font-sans divide-y md:divide-y-0 md:divide-x divide-halo-border bg-white/[0.01] border-t border-white/[0.03] backdrop-blur-md">
                                {/* Column A: Technical Indicators */}
                                <div className="space-y-3.5 pb-4 md:pb-0">
                                  <h4 className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-2 flex items-center gap-2 text-white border-halo-border/80">
                                    <Activity className="w-4 h-4 text-halo-primary" />
                                    <span>TECHNICAL MATRIX</span>
                                  </h4>
                                  <div className="space-y-2 font-mono text-[11px]">
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">RDX Confidence Score</span>
                                      <span className="font-bold text-white">{stock.technical.rdxScore} <span className="text-slate-500 font-normal text-[10px]">/ 5</span></span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">RSI Indicator (Weekly)</span>
                                      <span className="font-bold text-halo-success">{stock.technical.rsiWeekly}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">ADX Strength (Weekly)</span>
                                      <span className="text-white font-semibold">{stock.technical.adxWeekly}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">EMA Ribbon Convergence</span>
                                      <span className="text-white font-semibold">{stock.technical.ema50_200}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">1 Month Trailing Return</span>
                                      <span className="font-bold text-halo-success">{stock.technical.return1M}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">3 Month Trailing Return</span>
                                      <span className="font-bold text-halo-success">{stock.technical.return3M}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">1 Year Trailing Return</span>
                                      <span className="font-extrabold text-halo-success">{stock.technical.return1Y}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Volatility index (30D)</span>
                                      <span className="font-bold text-halo-error">{stock.technical.volatility30D}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column B: Fundamental ratios */}
                                <div className="space-y-3.5 pt-4 md:pt-0 pb-4 md:pb-0 md:pl-6">
                                  <h4 className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-2 flex items-center gap-2 border-halo-border/80 text-white">
                                    <Shield className="w-4 h-4 text-halo-success" />
                                    <span>FUNDAMENTAL SHIELD</span>
                                  </h4>
                                  <div className="space-y-2 font-mono text-[11px]">
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Price-to-Earnings (PE)</span>
                                      <span className="text-white font-semibold">{stock.fundamental.peRatio}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Price-to-Book (PB)</span>
                                      <span className="text-white font-semibold">{stock.fundamental.pbRatio}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Return on Equity (ROE %)</span>
                                      <span className="text-white font-semibold">{stock.fundamental.roe}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Return on Capital (ROCE %)</span>
                                      <span className="text-white font-semibold">{stock.fundamental.roce}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Debt / Equity ratio</span>
                                      <span className="text-white font-semibold">{stock.fundamental.debtEquity}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Foreign Institutional (FII)</span>
                                      <span className="text-white font-semibold">{stock.fundamental.fiiHolding}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Operating profit growth</span>
                                      <span className="text-white font-semibold">{stock.fundamental.opm}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-halo-surface/30 hover:bg-halo-surface/50 border border-halo-border/40 transition-colors">
                                      <span className="text-slate-300 font-medium">Profit Growth 3Y CAGR</span>
                                      <span className="font-bold text-halo-success">{stock.fundamental.profitGrowth3Y}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column C: Core thesis & Export tools */}
                                <div className="space-y-3.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                                  <div className="space-y-2.5">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-2 flex items-center gap-2 border-halo-border/80 text-white">
                                      <Info className="w-4 h-4 text-halo-warning" />
                                      <span>INVESTMENT THESIS</span>
                                    </h4>
                                    <div className="text-[13px] leading-relaxed font-sans font-medium select-text p-4 rounded-xl text-slate-100 bg-halo-surface/40 border-l-4 border-l-halo-warning border-t border-r border-b border-halo-border/40 shadow-lg">
                                      "{stock.thesis}"
                                    </div>
                                  </div>

                                  <div className="pt-4 border-t mt-auto flex items-center justify-between border-halo-border/80">
                                    <span className="text-[10px] font-bold tracking-wider font-mono uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 border bg-halo-success/10 border-halo-success/35 text-halo-success">
                                      <Shield className="w-3.5 h-3.5 text-halo-success animate-pulse" /> Advisory Approved
                                    </span>
                                    <button 
                                      className="flex items-center gap-1.5 text-[11px] font-semibold transition cursor-pointer text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-xl hover:bg-halo-primary hover:border-halo-primary hover:shadow-lg"
                                      onClick={() => console.log(`Recommendation metadata exported for ticker ${stock.ticker}`)}
                                    >
                                      <Share2 className="w-3.5 h-3.5 text-white" /> Export Rec
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
