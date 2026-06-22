import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, X, Trash2, Plus, ArrowUpRight, TrendingUp, TrendingDown, Wallet, HelpCircle } from 'lucide-react';
import { PortfolioStock } from '../types';

interface PortfolioPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: PortfolioStock[];
  onRemoveStock: (ticker: string) => void;
  onAddStockManual: (stock: Omit<PortfolioStock, 'id'>) => void;
  isFaqOpen?: boolean;
  onToggleFaq?: () => void;
}

export default function PortfolioPanel({
  isOpen,
  onClose,
  stocks,
  onRemoveStock,
  onAddStockManual,
  isFaqOpen = false,
  onToggleFaq
}: PortfolioPanelProps) {
  const [newTicker, setNewTicker] = useState('');
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState<number>(10);
  const [newPrice, setNewPrice] = useState<number>(100);
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculations
  const investedAmount = stocks.reduce((acc, stock) => acc + stock.quantity * stock.buyPrice, 0);
  const currentVal = stocks.reduce((acc, stock) => acc + stock.quantity * stock.currentPrice, 0);
  const totalPL = currentVal - investedAmount;
  const plPercentage = investedAmount > 0 ? (totalPL / investedAmount) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicker.trim() || !newName.trim() || newQty <= 0 || newPrice <= 0) return;
    
    onAddStockManual({
      ticker: newTicker.trim().toUpperCase(),
      stockName: newName.trim(),
      quantity: newQty,
      buyPrice: newPrice,
      currentPrice: newPrice
    });

    // Reset Form
    setNewTicker('');
    setNewName('');
    setNewQty(10);
    setNewPrice(100);
    setShowAddForm(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-halo-border bg-halo-surface flex-shrink-0">
        <div className="flex items-center gap-1">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-halo-border bg-halo-surface/80">
            <button
              onClick={onToggleFaq}
              className="h-7 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-halo-on-surface-muted hover:text-white hover:bg-white/[0.06] cursor-pointer"
              title="Switch to FAQ Panel"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="text-[11px] tracking-wide uppercase">FAQ</span>
            </button>
            <button
              className="h-7 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all bg-[#2BE08C]/15 border border-[#2BE08C]/30 text-white font-semibold cursor-default"
              title="Active: Portfolio Panel"
            >
              <Wallet className="w-3.5 h-3.5 text-[#2BE08C]" />
              <span className="text-[11px] tracking-wide uppercase">Portfolio</span>
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
        
        {/* Portfolio Summary Card */}
        <div className="bg-gradient-to-br from-[#5B6BFF]/8 via-white/[0.01] to-[#5B6BFF]/2 border border-halo-border/65 rounded-2xl p-5 space-y-4 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-2 gap-4 divide-x divide-halo-border/30">
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-bold uppercase block tracking-wider text-slate-400">Invested</span>
              <span className="text-[13.5px] font-bold font-mono text-white">{formatCurrency(investedAmount)}</span>
            </div>
            <div className="space-y-1 pl-4">
              <span className="text-[9px] font-sans font-bold uppercase block tracking-wider text-slate-400">Current Value</span>
              <span className="text-[13.5px] font-bold font-mono text-[#5B6BFF]">{formatCurrency(currentVal)}</span>
            </div>
          </div>
          
          <div className="border-t border-halo-border/40 pt-4 flex justify-between items-center">
            <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-400">Total returns</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[11px] font-bold ${
              totalPL >= 0 
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/25 text-rose-400'
            }`}>
              {totalPL >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{totalPL >= 0 ? '+' : ''}{formatCurrency(totalPL)} ({totalPL >= 0 ? '+' : ''}{plPercentage.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        {/* Add Stock Manual Trigger */}
        <div className="flex justify-between items-center border-b border-halo-border/20 pb-2.5">
          <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-450">HOLDINGS</span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-[10px] font-sans font-extrabold text-[#5B6BFF] hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
          >
            {showAddForm ? 'Cancel' : '+ Add Position'}
          </button>
        </div>

        {/* Add Stock Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="bg-halo-surface/80 border border-halo-border rounded-xl p-4 space-y-3 overflow-hidden font-sans"
            >
              <div>
                <label className="text-[10px] font-semibold uppercase block mb-1 text-slate-455">Ticker Symbol</label>
                <input
                  type="text"
                  placeholder="e.g. INFYS"
                  value={newTicker}
                  onChange={(e) => setNewTicker(e.target.value)}
                  className="w-full halo-input py-1.5 px-2.5 text-xs focus:outline-none uppercase"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase block mb-1 text-slate-455">Stock Name</label>
                <input
                  type="text"
                  placeholder="e.g. Infosys Ltd"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full halo-input py-1.5 px-2.5 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase block mb-1 text-slate-455">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newQty}
                    onChange={(e) => setNewQty(parseInt(e.target.value) || 0)}
                    className="w-full halo-input py-1.5 px-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase block mb-1 text-slate-455">Buy Price (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full halo-input py-1.5 px-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl font-bold text-xs cursor-pointer bg-[#5B6BFF] hover:bg-[#4a5aee] text-white transition-all shadow-md active:scale-95"
              >
                Add Holdings
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Holdings List */}
        <div className="space-y-2.5 pt-1">
          {stocks.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-455 font-sans leading-relaxed">
              No holdings added yet.<br />Use search suggestions or add positions manually.
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {stocks.map((stock) => {
                const totalCurrent = stock.quantity * stock.currentPrice;
                const pl = (stock.currentPrice - stock.buyPrice) * stock.quantity;
                const percentagePL = stock.buyPrice > 0 ? (pl / (stock.buyPrice * stock.quantity)) * 100 : 0;
                const isProfit = pl >= 0;

                return (
                  <motion.div
                    key={stock.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="group border border-halo-border/40 hover:border-halo-border bg-halo-surface/20 hover:bg-halo-surface/40 rounded-xl p-3 flex justify-between items-center transition-all shadow-sm"
                  >
                    <div className="space-y-1 select-text">
                      <span className="font-bold text-[12px] font-mono text-white block tracking-wider leading-none">{stock.ticker}</span>
                      <span className="text-[9px] font-sans text-slate-450 block truncate max-w-[120px]">{stock.stockName}</span>
                      <span className="text-[9.5px] font-mono text-slate-400 block pt-0.5">{stock.quantity} shares @ {formatCurrency(stock.buyPrice)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[12.5px] font-bold font-mono text-white">{formatCurrency(totalCurrent)}</span>
                        <div className={`flex items-center gap-0.5 text-[9px] font-mono font-extrabold mt-1 px-1.5 py-0.2 rounded-full border ${
                          isProfit 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          <span>{isProfit ? '▲' : '▼'}</span>
                          <span>{percentagePL >= 0 ? '+' : ''}{percentagePL.toFixed(1)}%</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveStock(stock.ticker)}
                        className="p-1.5 rounded-xl border border-halo-border/60 bg-halo-surface/40 hover:bg-rose-500/10 hover:border-rose-500/40 text-slate-450 hover:text-rose-400 transition-all cursor-pointer active:scale-95"
                        title="Remove position"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
