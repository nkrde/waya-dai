import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Brain, Compass, PanelLeft, HelpCircle, User, Loader2, Sparkles, 
  RefreshCcw, AlertTriangle, Shield, CheckCircle, TrendingUp, Info,
  ArrowUp, Plus, ChevronDown, Clock, Search, BookOpen, ArrowUpRight, TrendingDown,
  Paperclip, ChevronLeft, ChevronRight, X, PenTool, Mic, Home, Wallet, Menu, Settings
} from 'lucide-react';

import Onboarding from './components/Onboarding';
import Splash from './components/Splash';
import Sidebar from './components/Sidebar';
import FAQDrawer from './components/FAQDrawer';
import StockTable from './components/StockTable';
import PortfolioPanel from './components/PortfolioPanel';
import { ChatHistory, ChatMessage, UserProfile, SurveyQuestion, StockRecommendation, PortfolioStock } from './types';

const DROPDOWN_QUESTIONS = {
  buy: [
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
  ],
  short: [
    'Give me 1 stock that I can short',
    'Which stocks can I short right now?',
    'Give me a bearish call in the Power sector',
    'Show me 2 short selling opportunities in Finance',
    'Give me a short trade in the FMCG sector'
  ],
  long: [
    'Show me the multibagger portfolio picks',
    'What are your long-term wealth creation stock picks?',
    'Give me stocks that can give 3x returns in 3 years'
  ],
  track: [
    'What is your overall track record?',
    'How many of your past recommendations were profitable?',
    'Show me your best performing stock recommendations',
    'What is your win rate on closed calls?',
    'Show me recent closed trades and their returns'
  ],
  about: [
    'What is a BUY zone and how does it work?',
    'What is a short trade and how do I execute it?',
    'What is the Multibagger Portfolio?',
    'What are Stocks Under Radar?',
    'How many open calls do you have right now?',
    'How much should I invest in each recommendation?',
    'Can I use my own broker account to execute trades?',
    'How do I contact Waya support?'
  ]
};

// Preset real mock database for WayaX offline mode
const MOCK_REC_GOKUL: StockRecommendation = {
  id: 'gokul',
  stockName: 'Gokul Agro Resources Ltd',
  ticker: 'GOKULAGRO',
  action: 'BUY',
  priceRange: '₹234.88 – ₹239.62',
  targetPrice: '₹308.43',
  stopLoss: '₹166.08',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 72,
    adxWeekly: 32.2,
    ema50_200: '211.4 / 182.7',
    return1M: '15.1%',
    return3M: '41.6%',
    return1Y: '91.9%',
    volatility30D: '39%'
  },
  fundamental: {
    peRatio: 18.9,
    pbRatio: 4.9,
    roe: '5.0%',
    roce: '13.2%',
    debtEquity: '0.4',
    fiiHolding: '1.5%',
    opm: '2.8%',
    profitGrowth3Y: '40.8%'
  },
  thesis: 'Technically, Gokul Agro Resources Ltd shows RDX score of 5; RSI at 72 (strong upward momentum); ADX at 32.2 — trend is strong and directional. Fundamentally: ROE of 5% (moderate capital efficiency), PE of 18.9 — attractively valued, 3Y profit growth of 40.8%, low leverage. Entry zone ₹234.88–₹239.62 targeting ₹308.43 (30% upside) with stop loss at ₹166.08 — 1:1 risk-reward, solid setup over 3mo – 6mo.'
};

const MOCK_REC_SKM: StockRecommendation = {
  id: 'skm',
  stockName: 'SKM Egg Products Export (India) Ltd',
  ticker: 'SKMEGGPROD',
  action: 'BUY',
  priceRange: '₹194.63 – ₹198.57',
  targetPrice: '₹255.58',
  stopLoss: '₹137.62',
  targetUpside: '30%',
  tenure: '6mo – 1.0y',
  technical: {
    rdxScore: 4,
    rsiWeekly: 68,
    adxWeekly: 28.5,
    ema50_200: '178.2 / 164.1',
    return1M: '8.4%',
    return3M: '26.1%',
    return1Y: '64.5%',
    volatility30D: '32%'
  },
  fundamental: {
    peRatio: 14.5,
    pbRatio: 3.2,
    roe: '22.4%',
    roce: '27.1%',
    debtEquity: '0.1',
    fiiHolding: '0.8%',
    opm: '12.4%',
    profitGrowth3Y: '35.4%'
  },
  thesis: 'Technical indicators show a strong base building above its crucial 200 EMA with RSI turning upwards in the weekly chart. Fundamentally, company has outstanding return ratios with ROE of 22.4% and highly conservative debt (D/E of 0.1). 30% upside is highly achievable over 6mo to a year as global food export demands stabilize.'
};

const MOCK_REC_ROUTE: StockRecommendation = {
  id: 'route',
  stockName: 'Route Mobile Ltd',
  ticker: 'ROUTE',
  action: 'BUY',
  priceRange: '₹515.44 – ₹525.86',
  targetPrice: '₹676.85',
  stopLoss: '₹364.46',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 74,
    adxWeekly: 35.1,
    ema50_200: '475.4 / 432.1',
    return1M: '18.2%',
    return3M: '48.9%',
    return1Y: '82.3%',
    volatility30D: '27%'
  },
  fundamental: {
    peRatio: 28.1,
    pbRatio: 6.8,
    roe: '18.2%',
    roce: '21.5%',
    debtEquity: '0.2',
    fiiHolding: '21.4%',
    opm: '14.8%',
    profitGrowth3Y: '24.2%'
  },
  thesis: 'Strong technical breakout backed by high institutional volume. High FII holding at 21.4% highlights massive global confidence. Strong OPM at 14.8% and steady 3-year profit growth of 24.2% support digital communications market expansion.'
};

const MOCK_REC_CEINSYS: StockRecommendation = {
  id: 'ceinsys',
  stockName: 'Ceinsys Tech Ltd',
  ticker: 'CEINSYS',
  action: 'BUY',
  priceRange: '₹907.29 – ₹925.61',
  targetPrice: '₹1,191.39',
  stopLoss: '₹641.52',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 4,
    rsiWeekly: 65,
    adxWeekly: 24.8,
    ema50_200: '840.1 / 790.6',
    return1M: '12.3%',
    return3M: '31.4%',
    return1Y: '110.2%',
    volatility30D: '41%'
  },
  fundamental: {
    peRatio: 22.5,
    pbRatio: 5.1,
    roe: '14.2%',
    roce: '18.9%',
    debtEquity: '0.3',
    fiiHolding: '3.2%',
    opm: '11.5%',
    profitGrowth3Y: '18.4%'
  },
  thesis: 'Steady structural software demand and high-margin geospatial services. Breakout above high-volume nodes and 50 EMA is confirmed. A tight stop loss at ₹641.52 guarantees great risk-reward ratio.'
};

const MOCK_REC_DYNACONS: StockRecommendation = {
  id: 'dynacons',
  stockName: 'Dynacons Systems & Solutions Ltd',
  ticker: 'DSSL',
  action: 'BUY',
  priceRange: '₹1,536.73 – ₹1,567.77',
  targetPrice: '₹2,017.93',
  stopLoss: '₹1,086.57',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 76,
    adxWeekly: 38.4,
    ema50_200: '1410.2 / 1215.4',
    return1M: '21.5%',
    return3M: '54.2%',
    return1Y: '145.8%',
    volatility30D: '34%'
  },
  fundamental: {
    peRatio: 24.2,
    pbRatio: 7.4,
    roe: '28.1%',
    roce: '32.4%',
    debtEquity: '0.05',
    fiiHolding: '1.2%',
    opm: '8.4%',
    profitGrowth3Y: '52.6%'
  },
  thesis: 'Outstanding fundamentals with nearly zero debt, 28.1% ROE and spectacular 3Y average profit growth of 52.6%. Technical momentum is extremely bullish with ADX at 38.4 and RSI maintaining clean supportive structures.'
};

const MOCK_REC_SHORT_TATA: StockRecommendation = {
  id: 'short_tata',
  stockName: 'Short Idea: Heavy Industry Corp',
  ticker: 'HVIC',
  action: 'SHORT',
  priceRange: '₹450.20 – ₹458.10',
  targetPrice: '₹315.00',
  stopLoss: '₹510.40',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 2,
    rsiWeekly: 32,
    adxWeekly: 24.1,
    ema50_200: '430.5 / 462.8',
    return1M: '-12.1%',
    return3M: '-24.8%',
    return1Y: '-5.2%',
    volatility30D: '45%'
  },
  fundamental: {
    peRatio: 48.2,
    pbRatio: 12.3,
    roe: '-2.4%',
    roce: '1.8%',
    debtEquity: '2.4',
    fiiHolding: '12.5%',
    opm: '1.2%',
    profitGrowth3Y: '-15.4%'
  },
  thesis: 'Negative earnings surprise and extensive short builds in futures open interest. The stock is trading well below its 200 daily and weekly EMA. Fundamentally suffering from heavy leverage (D/E 2.4) and negative profit growth.'
};

const MOCK_REC_ICICI: StockRecommendation = {
  id: 'icici',
  stockName: 'ICICI Bank Ltd',
  ticker: 'ICICIBANK',
  action: 'BUY',
  priceRange: '₹1,100 – ₹1,120',
  targetPrice: '₹1,350',
  stopLoss: '₹980',
  targetUpside: '22%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 62,
    adxWeekly: 26.5,
    ema50_200: '1080 / 1010',
    return1M: '4.8%',
    return3M: '12.4%',
    return1Y: '25.6%',
    volatility30D: '18%'
  },
  fundamental: {
    peRatio: 17.5,
    pbRatio: 3.1,
    roe: '10.82%',
    roce: '12.4%',
    debtEquity: '5.69',
    fiiHolding: '42.3%',
    opm: '27.05%',
    profitGrowth3Y: '6.29%'
  },
  thesis: 'ICICI Bank shows superior metrics with 10.82% ROE and 27.05% PAT Margin. Strong operational efficiency and lower leverage make it a stronger selection.'
};

const MOCK_REC_SBI_COMP: StockRecommendation = {
  id: 'sbi_comp',
  stockName: 'State Bank of India',
  ticker: 'SBIN',
  action: 'HOLD',
  priceRange: '₹940 – ₹960',
  targetPrice: '₹1,020',
  stopLoss: '₹890',
  targetUpside: '8%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 3,
    rsiWeekly: 48,
    adxWeekly: 18.2,
    ema50_200: '910 / 840',
    return1M: '-1.2%',
    return3M: '5.4%',
    return1Y: '18.9%',
    volatility30D: '22%'
  },
  fundamental: {
    peRatio: 11.2,
    pbRatio: 1.4,
    roe: '6.77%',
    roce: '8.9%',
    debtEquity: '11.44',
    fiiHolding: '10.8%',
    opm: '9.80%',
    profitGrowth3Y: '4.58%'
  },
  thesis: 'SBI has stable revenue growth but exhibits lower ROE (6.77%) and higher debt/equity (11.44) compared to ICICI Bank.'
};

const MOCK_REC_SBI_DOWN: StockRecommendation = {
  id: 'sbi_down',
  stockName: 'State Bank of India',
  ticker: 'SBIN',
  action: 'HOLD',
  priceRange: '₹950.90 – ₹957.00',
  targetPrice: '₹950.90',
  stopLoss: '₹970.00',
  targetUpside: '0%',
  tenure: '1d',
  technical: {
    rdxScore: 2,
    rsiWeekly: 45,
    adxWeekly: 16.5,
    ema50_200: '912.4 / 842.1',
    return1M: '-2.4%',
    return3M: '4.8%',
    return1Y: '18.1%',
    volatility30D: '24%'
  },
  fundamental: {
    peRatio: 11.2,
    pbRatio: 1.4,
    roe: '6.77%',
    roce: '8.9%',
    debtEquity: '11.44',
    fiiHolding: '10.8%',
    opm: '9.80%',
    profitGrowth3Y: '-31.28%'
  },
  thesis: 'SBI shares fell 0.64% to ₹950.90. The decline may be related to historical weak PAT growth (-31.28%) and broader market pressures.'
};

const MOCK_REC_SGFIN: StockRecommendation = {
  id: 'sgfin',
  stockName: 'SG Finserve Ltd',
  ticker: 'SGFIN',
  action: 'BUY',
  priceRange: '₹450.00 – ₹470.00',
  targetPrice: '₹600.00',
  stopLoss: '₹390.00',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 74,
    adxWeekly: 34.2,
    ema50_200: '420.5 / 380.2',
    return1M: '14.2%',
    return3M: '38.5%',
    return1Y: '85.4%',
    volatility30D: '29%'
  },
  fundamental: {
    peRatio: 18.2,
    pbRatio: 3.4,
    roe: '16.5%',
    roce: '21.4%',
    debtEquity: '0.12',
    fiiHolding: '2.5%',
    opm: '18.2%',
    profitGrowth3Y: '45.2%'
  },
  thesis: 'SG Finserve exhibits strong technical volume breakouts and robust operating profit margins.'
};

const MOCK_REC_STEELCAST: StockRecommendation = {
  id: 'steelcast',
  stockName: 'Steelcast Ltd',
  ticker: 'STEELCAST',
  action: 'BUY',
  priceRange: '₹380.00 – ₹400.00',
  targetPrice: '₹510.00',
  stopLoss: '₹330.00',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 4,
    rsiWeekly: 68,
    adxWeekly: 28.6,
    ema50_200: '350.2 / 310.4',
    return1M: '9.4%',
    return3M: '26.1%',
    return1Y: '60.5%',
    volatility30D: '32%'
  },
  fundamental: {
    peRatio: 14.5,
    pbRatio: 3.2,
    roe: '22.4%',
    roce: '27.1%',
    debtEquity: '0.08',
    fiiHolding: '0.9%',
    opm: '14.4%',
    profitGrowth3Y: '35.4%'
  },
  thesis: 'Steelcast shows attractive valuation multiples and consistent sales growth.'
};

const MOCK_REC_CUPID: StockRecommendation = {
  id: 'cupid',
  stockName: 'Cupid Ltd',
  ticker: 'CUPID',
  action: 'BUY',
  priceRange: '₹240.00 – ₹250.00',
  targetPrice: '₹320.00',
  stopLoss: '₹210.00',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 5,
    rsiWeekly: 72,
    adxWeekly: 31.4,
    ema50_200: '220.1 / 195.4',
    return1M: '16.5%',
    return3M: '44.8%',
    return1Y: '110.2%',
    volatility30D: '28%'
  },
  fundamental: {
    peRatio: 22.1,
    pbRatio: 6.8,
    roe: '26.4%',
    roce: '31.2%',
    debtEquity: '0.01',
    fiiHolding: '1.4%',
    opm: '32.5%',
    profitGrowth3Y: '58.4%'
  },
  thesis: 'Cupid Ltd maintains an outstanding debt-free balance sheet with 26.4% ROE.'
};

const MOCK_REC_GEPIL: StockRecommendation = {
  id: 'gepil',
  stockName: 'GE Power India Ltd',
  ticker: 'GEPIL',
  action: 'BUY',
  priceRange: '₹310.00 – ₹325.00',
  targetPrice: '₹415.00',
  stopLoss: '₹270.00',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 4,
    rsiWeekly: 65,
    adxWeekly: 24.5,
    ema50_200: '290.4 / 260.1',
    return1M: '8.2%',
    return3M: '22.4%',
    return1Y: '48.9%',
    volatility30D: '36%'
  },
  fundamental: {
    peRatio: 32.4,
    pbRatio: 4.8,
    roe: '12.8%',
    roce: '15.4%',
    debtEquity: '0.45',
    fiiHolding: '4.8%',
    opm: '9.6%',
    profitGrowth3Y: '22.1%'
  },
  thesis: 'GE Power is well-positioned for order book expansions in thermal power emission controls.'
};

const MOCK_REC_VTL: StockRecommendation = {
  id: 'vtl',
  stockName: 'Vardhman Textiles Ltd',
  ticker: 'VTL',
  action: 'BUY',
  priceRange: '₹460.00 – ₹480.00',
  targetPrice: '₹610.00',
  stopLoss: '₹400.00',
  targetUpside: '30%',
  tenure: '3mo – 6mo',
  technical: {
    rdxScore: 4,
    rsiWeekly: 63,
    adxWeekly: 22.8,
    ema50_200: '435.6 / 395.2',
    return1M: '6.1%',
    return3M: '18.4%',
    return1Y: '38.2%',
    volatility30D: '21%'
  },
  fundamental: {
    peRatio: 16.8,
    pbRatio: 1.8,
    roe: '11.2%',
    roce: '13.5%',
    debtEquity: '0.22',
    fiiHolding: '8.6%',
    opm: '12.8%',
    profitGrowth3Y: '16.4%'
  },
  thesis: 'VTL is a high-quality textile manufacturer trading at reasonable valuations with solid margins.'
};

const MOCK_REC_DENTISTRY: StockRecommendation = {
  id: 'dentistry',
  stockName: 'Vasa Denticity Ltd',
  ticker: 'DENTISTRY',
  action: 'SHORT',
  priceRange: '₹520.00 – ₹540.00',
  targetPrice: '₹380.00',
  stopLoss: '₹590.00',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 2,
    rsiWeekly: 34,
    adxWeekly: 23.4,
    ema50_200: '550.4 / 512.6',
    return1M: '-8.5%',
    return3M: '-18.2%',
    return1Y: '12.4%',
    volatility30D: '42%'
  },
  fundamental: {
    peRatio: 48.6,
    pbRatio: 9.2,
    roe: '6.4%',
    roce: '8.2%',
    debtEquity: '0.45',
    fiiHolding: '0.2%',
    opm: '4.8%',
    profitGrowth3Y: '-8.6%'
  },
  thesis: 'Vasa Denticity exhibits weak technical momentum and high valuation multiples.'
};

const MOCK_REC_NAUKRI: StockRecommendation = {
  id: 'naukri',
  stockName: 'Info Edge (India) Ltd',
  ticker: 'NAUKRI',
  action: 'SHORT',
  priceRange: '₹5,800.00 – ₹5,950.00',
  targetPrice: '₹4,200.00',
  stopLoss: '₹6,450.00',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 1,
    rsiWeekly: 28,
    adxWeekly: 29.5,
    ema50_200: '6100.5 / 5950.2',
    return1M: '-12.4%',
    return3M: '-22.5%',
    return1Y: '-2.4%',
    volatility30D: '35%'
  },
  fundamental: {
    peRatio: 72.4,
    pbRatio: 11.2,
    roe: '8.5%',
    roce: '10.2%',
    debtEquity: '0.02',
    fiiHolding: '14.5%',
    opm: '15.2%',
    profitGrowth3Y: '-12.4%'
  },
  thesis: 'Info Edge trades at extreme earnings multiples with slowing growth in IT recruitment verticals.'
};

const MOCK_REC_FINOPB: StockRecommendation = {
  id: 'finopb',
  stockName: 'Fino Payments Bank Ltd',
  ticker: 'FINOPB',
  action: 'SHORT',
  priceRange: '₹280.00 – ₹295.00',
  targetPrice: '₹200.00',
  stopLoss: '₹325.00',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 2,
    rsiWeekly: 32,
    adxWeekly: 25.1,
    ema50_200: '310.2 / 295.4',
    return1M: '-9.6%',
    return3M: '-21.4%',
    return1Y: '-14.2%',
    volatility30D: '38%'
  },
  fundamental: {
    peRatio: 38.4,
    pbRatio: 2.9,
    roe: '5.2%',
    roce: '6.8%',
    debtEquity: '0.15',
    fiiHolding: '1.8%',
    opm: '5.4%',
    profitGrowth3Y: '-18.2%'
  },
  thesis: 'Fino PB is facing increasing compliance overheads and contraction in active retail nodes.'
};

const MOCK_REC_PGHL: StockRecommendation = {
  id: 'pghl',
  stockName: 'Procter & Gamble Health Care Ltd',
  ticker: 'PGHL',
  action: 'SHORT',
  priceRange: '₹5,100.00 – ₹5,250.00',
  targetPrice: '₹3,700.00',
  stopLoss: '₹5,700.00',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 2,
    rsiWeekly: 35,
    adxWeekly: 20.4,
    ema50_200: '5350.6 / 5150.4',
    return1M: '-6.2%',
    return3M: '-14.8%',
    return1Y: '-4.1%',
    volatility30D: '24%'
  },
  fundamental: {
    peRatio: 45.2,
    pbRatio: 12.4,
    roe: '22.8%',
    roce: '26.4%',
    debtEquity: '0.05',
    fiiHolding: '2.8%',
    opm: '21.5%',
    profitGrowth3Y: '-2.4%'
  },
  thesis: 'PGHL exhibits structural distribution patterns and margin pressure from rising active pharmaceutical ingredients costs.'
};

const MOCK_REC_ROADSTAR: StockRecommendation = {
  id: 'roadstar',
  stockName: 'Roadstar Infra Investment Trust',
  ticker: 'ROADSTAR',
  action: 'SHORT',
  priceRange: '₹120.00 – ₹130.00',
  targetPrice: '₹90.00',
  stopLoss: '₹145.00',
  targetUpside: '30%',
  tenure: '1mo – 3mo',
  technical: {
    rdxScore: 2,
    rsiWeekly: 30,
    adxWeekly: 26.8,
    ema50_200: '135.2 / 128.4',
    return1M: '-14.2%',
    return3M: '-29.5%',
    return1Y: '-18.4%',
    volatility30D: '44%'
  },
  fundamental: {
    peRatio: 22.4,
    pbRatio: 1.5,
    roe: '4.8%',
    roce: '5.2%',
    debtEquity: '1.82',
    fiiHolding: '0.4%',
    opm: '48.5%',
    profitGrowth3Y: '-24.5%'
  },
  thesis: 'High leverage and weak toll collection growth projection weigh heavily on the trust structure.'
};

const MOCK_REC_INTERARCH: StockRecommendation = {
  id: 'interarch',
  stockName: 'Interarch Building Products Ltd',
  ticker: 'INTERARCH',
  action: 'HOLD',
  priceRange: '₹1,240.00 – ₹1,270.00',
  targetPrice: '₹1,240.00',
  stopLoss: '₹1,150.00',
  targetUpside: '0%',
  tenure: '3mo',
  technical: {
    rdxScore: 3,
    rsiWeekly: 54,
    adxWeekly: 19.5,
    ema50_200: '1210.5 / 1150.4',
    return1M: '3.4%',
    return3M: '8.6%',
    return1Y: '24.5%',
    volatility30D: '26%'
  },
  fundamental: {
    peRatio: 24.8,
    pbRatio: 3.8,
    roe: '14.5%',
    roce: '17.2%',
    debtEquity: '0.12',
    fiiHolding: '4.5%',
    opm: '11.4%',
    profitGrowth3Y: '21.4%'
  },
  thesis: 'Recent company updates include audited FY results, compliance reports, and earnings recordings.'
};

const MOCK_REC_ADVAIT: StockRecommendation = {
  id: 'advait',
  stockName: 'Advait Infratech Ltd',
  ticker: 'ADVAIT',
  action: 'HOLD',
  priceRange: '₹1,800.00 – ₹1,860.00',
  targetPrice: '₹1,800.00',
  stopLoss: '₹1,650.00',
  targetUpside: '0%',
  tenure: '3mo',
  technical: {
    rdxScore: 3,
    rsiWeekly: 58,
    adxWeekly: 21.2,
    ema50_200: '1720.4 / 1540.8',
    return1M: '4.8%',
    return3M: '14.5%',
    return1Y: '95.6%',
    volatility30D: '33%'
  },
  fundamental: {
    peRatio: 42.5,
    pbRatio: 8.6,
    roe: '18.4%',
    roce: '22.1%',
    debtEquity: '0.24',
    fiiHolding: '1.2%',
    opm: '14.8%',
    profitGrowth3Y: '48.5%'
  },
  thesis: 'No verifiable news filings found for Advait. Fundamentals remain stable but lacks short-term news catalysts.'
};

// Helper to generate a closed wavy circular path for organic UI elements
const generateWavyPath = (cx: number, cy: number, r: number, amplitude: number, waves: number): string => {
  const points = [];
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const currR = r + amplitude * Math.sin(angle * waves);
    const x = cx + currR * Math.cos(angle);
    const y = cy + currR * Math.sin(angle);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ') + ' Z';
};

// Default welcome messaging and layout configuration
export default function App() {
  const theme = 'dark' as 'dark' | 'light';

  useEffect(() => {
    localStorage.setItem('wayax-theme', 'dark');
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
  }, []);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const ringBlur = 12;
  const [activeChatId, setActiveChatId] = useState<string>('');
  const activeChat = chatHistories.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];
  const isEmptyChat = messages.length === 0;
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const [isListening, setIsListening] = useState<boolean>(false);
  const voiceTimeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
    };
  }, []);

  const playBeep = (freq: number, type: OscillatorType, duration: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Web Audio beep not supported.');
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      playBeep(330, 'sine', 0.12);
      setIsListening(false);
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
      return;
    }

    playBeep(660, 'sine', 0.15);
    setIsListening(true);

    const speechText = "Give me stocks currently in the BUY zone?";
    
    voiceTimeoutRef.current = setTimeout(() => {
      playBeep(440, 'sine', 0.15);
      setIsListening(false);
      
      let typed = "";
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < speechText.length) {
          typed += speechText.charAt(idx);
          setInputValue(typed);
          idx++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            submitQuery(speechText);
          }, 350);
        }
      }, 35);
    }, 2800);
  };
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [portfolioStocks, setPortfolioStocks] = useState<PortfolioStock[]>([
    {
      id: 'port-1',
      stockName: 'Tata Consultancy Services',
      ticker: 'TCS',
      quantity: 15,
      buyPrice: 3420.50,
      currentPrice: 3488.20
    },
    {
      id: 'port-2',
      stockName: 'Reliance Industries',
      ticker: 'RELIANCE',
      quantity: 25,
      buyPrice: 2450.00,
      currentPrice: 2492.45
    }
  ]);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);

  const handleAddToPortfolio = (stock: StockRecommendation) => {
    const cleanPrice = (priceStr: string) => {
      if (!priceStr) return 100;
      const match = priceStr.match(/\d+[\d,.]*/);
      if (!match) return 100;
      return parseFloat(match[0].replace(/,/g, ''));
    };

    const buyPrice = cleanPrice(stock.priceRange.split('–')[0]);
    const currentPrice = cleanPrice(stock.targetPrice);

    const existing = portfolioStocks.find(s => s.ticker.toUpperCase() === stock.ticker.toUpperCase());
    if (existing) {
      setPortfolioStocks(portfolioStocks.map(s => 
        s.ticker.toUpperCase() === stock.ticker.toUpperCase()
          ? { ...s, quantity: s.quantity + 10 }
          : s
      ));
    } else {
      const newPortStock: PortfolioStock = {
        id: `port-${Date.now()}`,
        stockName: stock.stockName,
        ticker: stock.ticker,
        quantity: 10,
        buyPrice,
        currentPrice: currentPrice || buyPrice
      };
      setPortfolioStocks([...portfolioStocks, newPortStock]);
    }

    setIsPortfolioOpen(true);
    setIsFaqOpen(false);
  };

  const handleRemovePortfolioStock = (ticker: string) => {
    setPortfolioStocks(portfolioStocks.filter(s => s.ticker.toUpperCase() !== ticker.toUpperCase()));
  };

  const handleManualAddStock = (newStock: Omit<PortfolioStock, 'id'>) => {
    const portStock: PortfolioStock = {
      ...newStock,
      id: `port-${Date.now()}`
    };
    setPortfolioStocks([...portfolioStocks, portStock]);
  };

  // UI Panels Toggles
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'short' | 'long' | 'track' | 'about'>('buy');
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(true);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const [isRightBarHovered, setIsRightBarHovered] = useState<boolean>(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  
  const rightPanelRef = useRef<HTMLDivElement>(null);
  
  // Click outside only closes panels on mobile sidebar, not FAQ/Portfolio panels
  // FAQ/Portfolio panels are closed only via X button
  
  const gradientIntensity = 16;
  
  const getMobilePaddingBottom = () => {
    if (!isDropdownOpen) return 'pb-[90px]';
    if (isQuestionsOpen) return 'pb-[320px]';
    return 'pb-[180px]';
  };

  const getChatMobilePaddingBottom = (msgs: ChatMessage[]) => {
    const activeSurveyMsg = msgs.length > 0 && msgs[msgs.length - 1].isSurvey 
      ? msgs[msgs.length - 1] 
      : null;
    if (activeSurveyMsg) {
      return 'pb-[460px] md:pb-[340px]';
    }
    return 'pb-[120px] md:pb-[110px]';
  };
  
  const [showSplash, setShowSplash] = useState<boolean>(true);
  
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem('wayax-muted') === 'true';
  });

  const [audio] = useState(() => {
    const a = new Audio("https://forward-silver-1pgjkxss.edgeone.app/Quiet_Initialization%20(mp3cut.net).mp3");
    a.loop = false;
    return a;
  });

  useEffect(() => {
    localStorage.setItem('wayax-muted', String(isMuted));
    audio.muted = isMuted;
  }, [isMuted, audio]);

  useEffect(() => {
    if (showSplash) {
      audio.currentTime = 0;
      if (!isMuted) {
        audio.play().catch(() => {});
      }
    }
  }, [showSplash, isMuted, audio]);

  useEffect(() => {
    const shouldPlay = showSplash;
    if (shouldPlay && !isMuted) {
      audio.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    } else {
      audio.pause();
    }
  }, [showSplash, isMuted, audio]);

  useEffect(() => {
    const handleInteraction = () => {
      const shouldPlay = showSplash;
      if (shouldPlay && !isMuted) {
        audio.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [showSplash, isMuted, audio]);
  
  // Typewriting animated placeholder logic for empty chat search input
  const [typedPlaceholder, setTypedPlaceholder] = useState<string>('');
  
  useEffect(() => {
    const questions = [
      'Ask WayaX...',
      'Give me stocks currently in the BUY zone?',
      'Which stocks can I short sell right now?',
      'Show me long-term multibagger stock picks?'
    ];
    
    let currentQuestionIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timer: any;

    const tick = () => {
      const fullText = questions[currentQuestionIndex];
      
      if (!isDeleting) {
        currentText = fullText.substring(0, currentText.length + 1);
        setTypedPlaceholder(currentText);

        if (currentText === fullText) {
          isDeleting = true;
          // Keep the first phrase ("Ask WayaX...") for 5 seconds, others for 2 seconds
          const holdTime = currentQuestionIndex === 0 ? 5000 : 2000;
          timer = setTimeout(tick, holdTime);
          return;
        }
        timer = setTimeout(tick, 45); // Slower, smoother typing transition
      } else {
        currentText = fullText.substring(0, currentText.length - 1);
        setTypedPlaceholder(currentText);

        if (currentText === '') {
          isDeleting = false;
          currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
          timer = setTimeout(tick, 400); // Softer pause before starting next question
          return;
        }
        timer = setTimeout(tick, 20); // Smoother, progressive deletion
      }
    };

    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, []);
  
  // Active chat inline survey state
  const [activeSurvey, setActiveSurvey] = useState<SurveyQuestion | null>(null);
  const [surveyResponseProgress, setSurveyResponseProgress] = useState<{ horizon?: string; risk?: string }>({});
  const [surveyCustomText, setSurveyCustomText] = useState<string>('');
  const [tempSelectedOption, setTempSelectedOption] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize search bar textarea based on content and window size/rotation
  useEffect(() => {
    const adjustHeight = () => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        const baseHeight = isEmptyChat ? (window.innerWidth < 768 ? 20 : 28) : 28;
        el.style.height = `${Math.max(el.scrollHeight, baseHeight)}px`;
      }
    };

    adjustHeight();

    window.addEventListener('resize', adjustHeight);
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [inputValue, isEmptyChat]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    const baseHeight = isEmptyChat ? (window.innerWidth < 768 ? 20 : 28) : 28;
    el.style.height = `${Math.max(el.scrollHeight, baseHeight)}px`;
  };

  // Load state from local storage on mount
  useEffect(() => {
    let profile = null;
    const savedProfile = localStorage.getItem('wayax-profile');
    if (savedProfile) {
      try {
        profile = JSON.parse(savedProfile);
        setUserProfile(profile);
      } catch (e) {
        localStorage.removeItem('wayax-profile');
      }
    }


    let chats = [];
    const savedChats = localStorage.getItem('wayax-chats');
    if (savedChats) {
      try {
        chats = JSON.parse(savedChats);
        setChatHistories(chats);
        if (chats.length > 0) {
          setActiveChatId(chats[0].id);
        }
      } catch (e) {
        localStorage.removeItem('wayax-chats');
      }
    }

    // Auto-create a default chat session if none exists
    if (!savedChats || chats.length === 0) {
      const defaultChat: ChatHistory = {
        id: 'chat-initial',
        title: 'Initial Advisory Consult',
        messages: [],
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistories([defaultChat]);
      setActiveChatId(defaultChat.id);
      localStorage.setItem('wayax-chats', JSON.stringify([defaultChat]));
    }

    // Determine initial sidebar open status responsively
    setIsSidebarOpen(false);
  }, []);

  // Sync state mutations back to local storage
  const saveProfileToLocalStorage = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('wayax-profile', JSON.stringify(profile));
  };

  const saveChatsToLocalStorage = (chats: ChatHistory[]) => {
    setChatHistories(chats);
    localStorage.setItem('wayax-chats', JSON.stringify(chats));
  };

  const handleSignOut = () => {
    localStorage.removeItem('wayax-profile');
    localStorage.removeItem('wayax-chats');
    setUserProfile(null);
    setChatHistories([]);
    setActiveChatId('');
  };

  // Safe scrolling helpers
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChat?.messages && activeChat.messages.length > 0) {
      const lastMsg = activeChat.messages[activeChat.messages.length - 1];
      if (lastMsg && lastMsg.sender !== 'user') {
        const timer = setTimeout(() => {
          const element = document.getElementById('last-bot-message');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            scrollToBottom();
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }
    scrollToBottom();
  }, [activeChat?.messages, isLoading, activeSurvey]);

  // Interactive Heat-Map Grid Canvas loop (Runs globally once on mount)
  useEffect(() => {
    const canvas = document.getElementById('interactive-bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const computedStyle = getComputedStyle(document.documentElement);
    const cssGridDot = computedStyle.getPropertyValue('--color-grid-dot').trim();

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse & Touch pointer tracking ref
    const pointer = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      speed: 0,
      active: false,
      inWindow: false
    };

    const smoothPointer = {
      x: 0,
      y: 0,
      speed: 0
    };
    let globalIntensity = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updatePointerPos = (clientX: number, clientY: number) => {
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      pointer.x = clientX;
      pointer.y = clientY;
      
      const dx = pointer.x - pointer.prevX;
      const dy = pointer.y - pointer.prevY;
      pointer.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 35);
      
      pointer.active = true;
      pointer.inWindow = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      pointer.inWindow = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    window.addEventListener('touchcancel', handlePointerLeave);

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const isLight = theme === 'light';
      if (isMobile) {
        // Render static grid once on mobile to conserve CPU/battery during scroll & typing
        ctx.beginPath();
        ctx.strokeStyle = cssGridDot || (isLight ? 'rgba(42, 45, 56, 0.035)' : 'rgba(42, 45, 56, 0.2)');
        ctx.lineWidth = 0.5;
        const gridSpacing = 20;
        for (let x = 0; x <= width; x += gridSpacing) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += gridSpacing) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
        return;
      }

      // Smooth interpolation for trailing mouse wake and fade logic
      const easeFactor = 0.04; // Soothing trailing factor
      if (pointer.active) {
        if (smoothPointer.x === 0 && smoothPointer.y === 0) {
          smoothPointer.x = pointer.x;
          smoothPointer.y = pointer.y;
        }
        smoothPointer.x += (pointer.x - smoothPointer.x) * easeFactor;
        smoothPointer.y += (pointer.y - smoothPointer.y) * easeFactor;
        smoothPointer.speed += (pointer.speed - smoothPointer.speed) * easeFactor;
      } else {
        smoothPointer.speed *= 0.92;
      }

      // Smooth transition between active movement, resting hover, and exit
      let targetIntensity = 0;
      if (pointer.active && pointer.inWindow) {
        const speedFactor = Math.min(smoothPointer.speed / 5, 1);
        targetIntensity = 0.30 + 0.70 * speedFactor; // Soft resting aura (30%) up to full warp (100%)
      } else {
        targetIntensity = 0;
      }
      globalIntensity += (targetIntensity - globalIntensity) * 0.05;

      // Grid spacing
      const gridSpacing = 20;
      const numCols = Math.ceil(width / gridSpacing) + 1;
      const numRows = Math.ceil(height / gridSpacing) + 1;

      interface MeshNode {
        drawX: number;
        drawY: number;
        heat: number;
      }
      const nodes: MeshNode[][] = [];
      const interactRadius = width < 768 ? 90 : 150;
      const now = Date.now();

      for (let c = 0; c < numCols; c++) {
        nodes[c] = [];
        for (let r = 0; r < numRows; r++) {
          const x = c * gridSpacing;
          const y = r * gridSpacing;
          
          let drawX = x;
          let drawY = y;
          let heat = 0;

          if (globalIntensity > 0.001) {
            const dx = x - smoothPointer.x;
            const dy = y - smoothPointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactRadius) {
              const ratio = dist / interactRadius;
              const force = 0.5 * (1 + Math.cos(ratio * Math.PI));
              const angle = Math.atan2(dy, dx);
              
              // Soothing concentric ripple wave
              const wave = Math.sin(dist * 0.05 - now * 0.005) * 1.5;
              const push = (force * 5.0 + wave * force) * globalIntensity;
              
              // Speed-based fluid vortex swirl
              const swirl = Math.sin(dist * 0.03 - now * 0.002) * smoothPointer.speed * 0.015 * force * globalIntensity;
              const finalAngle = angle + swirl;

              drawX = x + Math.cos(finalAngle) * push;
              drawY = y + Math.sin(finalAngle) * push;
              heat = force * globalIntensity;
            }
          }

          nodes[c][r] = { drawX, drawY, heat };
        }
      }

      // Draw horizontal and vertical base lines in a single path
      ctx.beginPath();
      // Fixed grid opacity in light mode (very close to background color, dynamically connected)
      const lineColorBase = cssGridDot || (isLight ? 'rgba(42, 45, 56, 0.035)' : 'rgba(42, 45, 56, 0.2)');
      ctx.strokeStyle = lineColorBase;
      ctx.lineWidth = 0.5;

      for (let r = 0; r < numRows; r++) {
        if (nodes[0] && nodes[0][r]) {
          ctx.moveTo(nodes[0][r].drawX, nodes[0][r].drawY);
          for (let c = 1; c < numCols; c++) {
            if (nodes[c] && nodes[c][r]) {
              ctx.lineTo(nodes[c][r].drawX, nodes[c][r].drawY);
            }
          }
        }
      }

      for (let c = 0; c < numCols; c++) {
        if (nodes[c] && nodes[c][0]) {
          ctx.moveTo(nodes[c][0].drawX, nodes[c][0].drawY);
          for (let r = 1; r < numRows; r++) {
            if (nodes[c] && nodes[c][r]) {
              ctx.lineTo(nodes[c][r].drawX, nodes[c][r].drawY);
            }
          }
        }
      }
      ctx.stroke();

      // Draw highlighted glow overlays (Optimized Single-Pass Radial Stroke)
      if (globalIntensity > 0.001) {
        const glowColor = '91, 107, 255'; // Halo electric indigo #5B6BFF
        const maxGlowAlpha = 0.15; // Halo glow limit

        const grad = ctx.createRadialGradient(
          smoothPointer.x, smoothPointer.y, 0,
          smoothPointer.x, smoothPointer.y, interactRadius
        );
        grad.addColorStop(0, `rgba(${glowColor}, ${maxGlowAlpha * globalIntensity})`);
        grad.addColorStop(0.5, `rgba(${glowColor}, ${maxGlowAlpha * 0.4 * globalIntensity})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8 + (smoothPointer.speed * 0.03);

        const startCol = Math.max(0, Math.floor((smoothPointer.x - interactRadius) / gridSpacing));
        const endCol = Math.min(numCols - 1, Math.ceil((smoothPointer.x + interactRadius) / gridSpacing));
        const startRow = Math.max(0, Math.floor((smoothPointer.y - interactRadius) / gridSpacing));
        const endRow = Math.min(numRows - 1, Math.ceil((smoothPointer.y + interactRadius) / gridSpacing));

        for (let r = startRow; r <= endRow; r++) {
          let lineStarted = false;
          for (let c = startCol; c <= endCol; c++) {
            if (nodes[c] && nodes[c][r]) {
              if (!lineStarted) {
                ctx.moveTo(nodes[c][r].drawX, nodes[c][r].drawY);
                lineStarted = true;
              } else {
                ctx.lineTo(nodes[c][r].drawX, nodes[c][r].drawY);
              }
            }
          }
        }

        for (let c = startCol; c <= endCol; c++) {
          let lineStarted = false;
          for (let r = startRow; r <= endRow; r++) {
            if (nodes[c] && nodes[c][r]) {
              if (!lineStarted) {
                ctx.moveTo(nodes[c][r].drawX, nodes[c][r].drawY);
                lineStarted = true;
              } else {
                ctx.lineTo(nodes[c][r].drawX, nodes[c][r].drawY);
              }
            }
          }
        }
        ctx.stroke();
      }

      // Decay speed slowly
      pointer.speed *= 0.92;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('touchcancel', handlePointerLeave);
    };
  }, [theme]);

  // Actions
  const handleOnboardingComplete = (profile: UserProfile) => {
    saveProfileToLocalStorage(profile);
    
    // Create first advisory chat
    const firstChat: ChatHistory = {
      id: 'default-sec-' + Date.now(),
      title: 'Initial Advisory Consult',
      messages: [],
      timestamp: new Date().toLocaleTimeString()
    };
    saveChatsToLocalStorage([firstChat]);
    setActiveChatId(firstChat.id);
  };

  const handleCreateNewChat = () => {
    const newChat: ChatHistory = {
      id: 'chat-' + Date.now(),
      title: `Advisory Session #${chatHistories.length + 1}`,
      messages: [],
      timestamp: new Date().toLocaleTimeString()
    };
    const updated = [newChat, ...chatHistories];
    saveChatsToLocalStorage(updated);
    setActiveChatId(newChat.id);
    setActiveSurvey(null);
    setSurveyResponseProgress({});
  };

  const handleGoHome = () => {
    // Always close any open panels first
    setIsPortfolioOpen(false);
    setIsFaqOpen(false);
    // Then navigate to main page
    const emptyChat = chatHistories.find(c => c.messages.length === 0);
    if (emptyChat) {
      setActiveChatId(emptyChat.id);
      setActiveSurvey(null);
      setSurveyResponseProgress({});
    } else {
      handleCreateNewChat();
    }
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setActiveSurvey(null);
    setSurveyResponseProgress({});
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    const updated = chatHistories.map(chat => {
      if (chat.id === id) {
        return { ...chat, title: newTitle };
      }
      return chat;
    });
    saveChatsToLocalStorage(updated);
  };

  const handleDeleteChat = (id: string) => {
    const remaining = chatHistories.filter(chat => chat.id !== id);
    saveChatsToLocalStorage(remaining);
    if (activeChatId === id && remaining.length > 0) {
      setActiveChatId(remaining[0].id);
    } else if (remaining.length === 0) {
      // Create empty fallback
      const freshChat: ChatHistory = {
        id: 'fallback-' + Date.now(),
        title: 'New Advisory Chat',
        messages: [],
        timestamp: new Date().toLocaleTimeString()
      };
      saveChatsToLocalStorage([freshChat]);
      setActiveChatId(freshChat.id);
    }
  };

  const parseInlineMarkdown = (text: string) => {
    const parts = [];
    let remaining = text;
    let index = 0;

    while (remaining.length > 0) {
      const boldStart = remaining.indexOf('**');
      const codeStart = remaining.indexOf('`');

      const hasBold = boldStart !== -1;
      const hasCode = codeStart !== -1;

      if (!hasBold && !hasCode) {
        parts.push(<span key={index++}>{remaining}</span>);
        break;
      }

      let firstTag: 'bold' | 'code' = 'bold';
      let tagStart = boldStart;
      let tagDelimiter = '**';

      if (hasCode && (!hasBold || codeStart < boldStart)) {
        firstTag = 'code';
        tagStart = codeStart;
        tagDelimiter = '`';
      }

      if (tagStart > 0) {
        parts.push(<span key={index++}>{remaining.substring(0, tagStart)}</span>);
      }

      const afterTag = remaining.substring(tagStart + tagDelimiter.length);
      const tagEnd = afterTag.indexOf(tagDelimiter);

      if (tagEnd === -1) {
        parts.push(<span key={index++}>{remaining.substring(tagStart)}</span>);
        break;
      }

      const taggedText = afterTag.substring(0, tagEnd);

      if (firstTag === 'bold') {
        parts.push(
          <strong key={index++} className="font-semibold text-white">
            {taggedText}
          </strong>
        );
      } else {
        parts.push(
          <code key={index++} className="px-1.5 py-0.5 rounded font-mono text-[11px] bg-white/[0.06] text-[#5B6BFF] border border-white/[0.04]">
            {taggedText}
          </code>
        );
      }

      remaining = afterTag.substring(tagEnd + tagDelimiter.length);
    }

    return parts;
  };

  const renderFormattedMessageText = (text: string) => {
    const paragraphs = text.split('\n');
    return paragraphs.map((para, pIdx) => {
      const trimmed = para.trim();
      if (!trimmed) {
        return <div key={pIdx} className="h-2" />;
      }

      if (trimmed.startsWith('###')) {
        const title = trimmed.replace(/^###\s*/, '');
        return (
          <h4 key={pIdx} className="text-[14px] md:text-[15px] font-extrabold text-white font-sans mt-4 mb-2 first:mt-0 tracking-tight">
            {parseInlineMarkdown(title)}
          </h4>
        );
      }
      if (trimmed.startsWith('##')) {
        const title = trimmed.replace(/^##\s*/, '');
        return (
          <h3 key={pIdx} className="text-[15px] md:text-[16px] font-extrabold text-white font-sans mt-5 mb-2.5 first:mt-0 tracking-tight">
            {parseInlineMarkdown(title)}
          </h3>
        );
      }
      if (trimmed.startsWith('#')) {
        const title = trimmed.replace(/^#\s*/, '');
        return (
          <h2 key={pIdx} className="text-[16px] md:text-[18px] font-extrabold text-white font-sans mt-6 mb-3 first:mt-0 tracking-tight">
            {parseInlineMarkdown(title)}
          </h2>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.replace(/^[-*]\s*/, '');
        return (
          <div key={pIdx} className="flex items-start gap-2 ml-2.5 my-1.5 text-[13px] md:text-[13.5px] leading-relaxed font-sans text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BFF] mt-2 flex-shrink-0" />
            <span className="flex-1">{parseInlineMarkdown(itemText)}</span>
          </div>
        );
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const num = trimmed.match(/^(\d+)\.\s+/)?.[1] || '';
        const itemText = trimmed.replace(/^\d+\.\s+/, '');
        return (
          <div key={pIdx} className="flex items-start gap-2 ml-2.5 my-1.5 text-[13px] md:text-[13.5px] leading-relaxed font-sans text-slate-300">
            <span className="font-mono font-bold text-xs text-[#5B6BFF] mt-0.5 flex-shrink-0 min-w-[14px]">
              {num}.
            </span>
            <span className="flex-1">{parseInlineMarkdown(itemText)}</span>
          </div>
        );
      }

      return (
        <p key={pIdx} className="text-[13px] md:text-[13.5px] leading-relaxed font-sans text-slate-300 my-2 first:mt-0 last:mb-0">
          {parseInlineMarkdown(para)}
        </p>
      );
    });
  };

  // Custom UI layout renderers matching PDF screenshots for hardcoded Q&A
  const renderCustomLayout = (msg: ChatMessage, activeTheme: 'dark' | 'light') => {
    switch (msg.customLayout) {
      case 'comparison':
        return renderComparisonLayout();
      case 'pe_ratio':
        return renderPeRatioLayout();
      case 'sbi_down':
        return renderSbiDownLayout();
      case 'news_list':
        return renderNewsListLayout(msg);
      case 'invest_table':
        return renderInvestTableLayout(msg);
      default:
        return null;
    }
  };

  const renderComparisonLayout = () => {
    const comparisonData = [
      { metric: 'Market Cap', icici: '₹8.91L Cr', sbi: '₹8.78L Cr', winner: 'icici' },
      { metric: 'P/E Ratio', icici: '16.44x', sbi: '10.82x', winner: 'sbi' },
      { metric: 'P/B Ratio', icici: '2.47x', sbi: '1.47x', winner: 'sbi' },
      { metric: 'ROE', icici: '10.82%', sbi: '6.77%', winner: 'icici' },
      { metric: 'ROCE', icici: '6.21%', sbi: '5.75%', winner: 'icici' },
      { metric: 'EBITDA Margin', icici: '39.00%', sbi: '44.51%', winner: 'sbi' },
      { metric: 'PAT Margin', icici: '27.05%', sbi: '9.80%', winner: 'icici' },
      { metric: 'Revenue Growth', icici: '4.77%', sbi: '4.89%', winner: 'sbi' },
      { metric: 'PAT Growth', icici: '6.29%', sbi: '4.58%', winner: 'icici' },
      { metric: 'Debt / Equity', icici: '5.69x', sbi: '11.44x', winner: 'icici' },
      { metric: 'Interest Cov.', icici: '1.87x', sbi: '1.35x', winner: 'icici' },
      { metric: '1M Return', icici: '-8.36%', sbi: '-14.17%', winner: 'icici' },
    ];

    return (
      <div className="space-y-5">
        {/* Header Block */}
        <div className="flex flex-col gap-1 pb-1">
          <span className="w-fit inline-flex items-center px-2 py-0.5 rounded-xl bg-[#5B6BFF]/10 border border-[#5B6BFF]/25 text-[9px] font-extrabold tracking-widest uppercase font-mono text-[#5B6BFF]">
            Market Info
          </span>
          <h3 className="text-base font-bold text-white font-sans mt-1">
            ICICI Bank Ltd <span className="text-slate-400 font-normal">vs</span> State Bank of India
          </h3>
          <p className="text-[10px] text-halo-on-surface-muted font-sans font-medium">
            Financial Services · Banks - Private Sector vs Banks - Public Sector
          </p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border border-halo-border/40 rounded-xl bg-halo-surface/20">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-halo-border/50 bg-halo-surface/40">
                <th className="p-3 text-[10px] uppercase tracking-wider text-halo-on-surface-faint font-extrabold font-mono">Metric</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-[#5B6BFF] font-extrabold font-mono">ICICIBANK</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-emerald-400 font-extrabold font-mono">SBIN</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-halo-border/20 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 text-slate-300 font-semibold">{row.metric}</td>
                  <td className={`p-3 font-sans ${
                    row.metric === '1M Return' 
                      ? 'text-[#FF3A5C] font-bold' 
                      : row.winner === 'icici' 
                        ? 'text-[#5B6BFF] font-bold' 
                        : 'text-slate-400'
                  }`}>
                    {row.icici}
                    {row.winner === 'icici' && row.metric !== '1M Return' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5B6BFF] ml-1.5" />}
                  </td>
                  <td className={`p-3 font-sans ${
                    row.metric === '1M Return' 
                      ? 'text-[#FF3A5C] font-bold' 
                      : row.winner === 'sbi' 
                        ? 'text-emerald-400 font-bold' 
                        : 'text-slate-400'
                  }`}>
                    {row.sbi}
                    {row.winner === 'sbi' && row.metric !== '1M Return' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-halo-border/30 rounded-xl p-3.5 bg-halo-surface/20 flex flex-col justify-between">
            <span className="text-[9px] uppercase tracking-wider font-mono text-[#5B6BFF] font-extrabold mb-1">ICICIBANK · 1M Trend</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-extrabold text-[#FF3A5C]">↓ Downtrend</span>
              <span className="text-[11px] text-slate-400 font-sans font-medium">-8.36% · ₹1242.8</span>
            </div>
          </div>
          <div className="border border-halo-border/30 rounded-xl p-3.5 bg-halo-surface/20 flex flex-col justify-between">
            <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400 font-extrabold mb-1">SBIN · 1M Trend</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-extrabold text-[#FF3A5C]">↓↓ Strong Down</span>
              <span className="text-[11px] text-slate-400 font-sans font-medium">-14.17% · ₹950.9</span>
            </div>
          </div>
        </div>

        {/* Explanatory Sections */}
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-halo-on-surface-faint font-extrabold">Industry Check</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
              Both ICICI Bank and SBI operate within the banking universe but belong to different sub-industries: ICICI Bank is classified under "Banks - Private Sector," while SBI falls under "Banks - Public Sector." Therefore, while they can be compared within the banking universe, their distinct sub-industries may influence their operational strategies and financial performance.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-halo-on-surface-faint font-extrabold">Valuation View</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
              Based on the supplied metrics: Profitability: ICICI Bank shows stronger profitability with a higher ROE (10.82% vs. 6.77%) and PAT margin (27.05% vs. 9.80%). Growth: ICICI Bank also exhibits better PAT growth (6.29% vs. 4.58%) and a comparable revenue growth rate (4.77% vs. 4.89%). Leverage: ICICI Bank has a lower debt-to-equity ratio (5.69) compared to SBI (11.44), indicating lower financial leverage and potentially less risk. Margins: While SBI has a higher EBITDA margin (44.51% vs. 39.00%), ICICI Bank's overall profitability metrics suggest a more efficient operation in terms of net income generation.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-halo-on-surface-faint font-extrabold">Risks / Data Gaps</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
              ROA: The Return on Assets (ROA) metric is unavailable for both banks, which limits a comprehensive assessment of asset efficiency. Market Sentiment: Both banks have experienced negative price movements over the past month, which could reflect broader market conditions or sector-specific challenges.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-halo-on-surface-faint font-extrabold">Waya X View</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
              In summary, ICICI Bank appears stronger on the supplied metrics, particularly in terms of profitability, growth, and leverage. However, SBI's higher EBITDA margin indicates operational efficiency in its sector. This analysis is intended for research purposes and should not be construed as a recommendation.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#5B6BFF]" />
            <span>ICICIBANK leads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>SBIN leads</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-halo-border/20">
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Answer
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Market_Info
          </span>
        </div>
      </div>
    );
  };

  const renderPeRatioLayout = () => {
    const faqCards = [
      {
        tag: '',
        text: "The Price-to-Earnings (P/E) ratio is a financial metric that compares a company's current share price to its earnings per share (EPS). It is calculated by dividing the market value per share by the earnings per share."
      },
      {
        tag: 'DEFINITION',
        text: "The Price-to-Earnings (P/E) ratio is a financial metric that compares a company's current share price to its earnings per share (EPS). It is calculated by dividing the market value per share by the earnings per share."
      },
      {
        tag: 'WHY IT MATTERS',
        text: "The P/E ratio helps investors assess whether a stock is overvalued or undervalued compared to its earnings. A high P/E may indicate that the stock is expensive relative to its earnings, while a low P/E might suggest it is undervalued."
      },
      {
        tag: 'EXAMPLE',
        text: "If a company's share price is ₹100 and its EPS is ₹10, the P/E ratio would be 10 (₹100/₹10). This means investors are willing to pay ₹10 for every ₹1 of earnings."
      },
      {
        tag: 'COMMON MISTAKE',
        text: "A common mistake is to compare the P/E ratios of companies in different industries. Different sectors have varying average P/E ratios, so it's essential to compare companies within the same industry for a meaningful analysis."
      },
      {
        tag: 'KEY TAKEAWAY',
        text: "The P/E ratio is a useful tool for evaluating a stock's valuation, but it should be used in conjunction with other financial metrics and industry comparisons for a comprehensive analysis."
      }
    ];

    return (
      <div className="space-y-5">
        {/* Header Block */}
        <div className="flex flex-col gap-1 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-xl bg-[#9B4DCA]/10 border border-[#9B4DCA]/25 text-[9px] font-extrabold tracking-widest uppercase font-mono text-[#9B4DCA]">
              Education
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-xl bg-white/[0.04] border border-white/5 text-[9px] font-extrabold tracking-widest uppercase font-mono text-slate-400">
              Educate
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-sans mt-1">Faq</h3>
        </div>

        {/* 3-Column / 2-Row Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {faqCards.map((card, idx) => (
            <div 
              key={idx} 
              className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/25 flex flex-col justify-start gap-2"
            >
              {card.tag ? (
                <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-400 font-extrabold w-fit px-1.5 py-0.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  {card.tag}
                </span>
              ) : (
                <div className="h-[18px]" />
              )}
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium mt-1">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-halo-border/20">
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Educate
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            FAQ
          </span>
        </div>
      </div>
    );
  };

  const renderSbiDownLayout = () => {
    return (
      <div className="space-y-5">
        {/* Header Block */}
        <div className="flex flex-col gap-1 pb-1">
          <span className="w-fit inline-flex items-center px-2 py-0.5 rounded-xl bg-[#FF3A5C]/10 border border-[#FF3A5C]/25 text-[9px] font-extrabold tracking-widest uppercase font-mono text-[#FF3A5C]">
            Verified Price Move
          </span>
          <h3 className="text-base font-bold text-white font-sans mt-1">State Bank of India</h3>
        </div>

        {/* Pricing Dashboard Row */}
        <div className="grid grid-cols-3 gap-2 border border-halo-border/30 rounded-xl p-3 bg-halo-surface/25 text-center">
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-mono font-bold">Opening Price</div>
            <div className="text-sm font-extrabold text-white mt-0.5">₹957.00</div>
          </div>
          <div className="border-x border-halo-border/30">
            <div className="text-[9px] text-slate-400 uppercase font-mono font-bold">Closing Price</div>
            <div className="text-sm font-extrabold text-white mt-0.5">₹950.90</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-mono font-bold">Price Movement</div>
            <div className="text-sm font-extrabold text-[#FF3A5C] mt-0.5">-0.64%</div>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Asset Profile */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 font-extrabold">Asset Profile</span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">SBI</div>
              <span className="text-xs font-bold text-white">State Bank of India</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-medium mt-3">
              India's largest public sector bank. Belongs to Banks - Public Sector sub-industry.
            </p>
          </div>

          {/* Card 2: Quick Summary */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-400 font-extrabold">Quick Summary</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium mt-2">
              State Bank of India (SBI) experienced a decline of 0.64% yesterday, closing at ₹950.90 after opening at ₹957.00. This movement aligns with the user's query regarding the stock being down.
            </p>
          </div>

          {/* Card 3: Confirmed Drivers */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-[#FF3A5C] font-extrabold">Confirmed Drivers</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium mt-2">
              The decline in SBI's stock price may not have a specific confirmed fundamental or valuation driver based on the available data. However, the following factors are noted:
            </p>
            <ul className="text-[10.5px] text-slate-400 font-sans space-y-1.5 mt-2.5 list-disc pl-4 font-medium">
              <li><strong className="text-white">Profitability Metrics:</strong> The bank reported a significant decline in PAT growth of -31.28%, which may have influenced investor sentiment negatively.</li>
              <li><strong className="text-white">Revenue Growth:</strong> Revenue growth was reported at 5.1%, which is below the growth threshold of 10%.</li>
            </ul>
          </div>
        </div>

        {/* Row 2: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 4: News Announcements */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400 font-extrabold">Latest News / Results</span>
            <ul className="text-[11px] text-slate-300 font-sans space-y-2 mt-2 list-disc pl-4 font-medium">
              <li>Interaction with Institutional Investors/Analysts.</li>
              <li>Gazette Publication dated 19.05.2026.</li>
              <li>Interaction with Institutional Investors/Analysts.</li>
            </ul>
          </div>

          {/* Card 5: Valuation View */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-400 font-extrabold">Valuation View</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium mt-2">
              The stock appears cheaper than peers on at least one available valuation metric:
            </p>
            <ul className="text-[10.5px] text-slate-400 font-sans space-y-1 mt-2 list-disc pl-4 font-medium">
              <li><strong className="text-white">P/E Ratio:</strong> 6.86 vs peer average 7.49 (lower).</li>
              <li><strong className="text-white">P/BV Ratio:</strong> 0.82 vs peer average 1.11 (lower).</li>
            </ul>
          </div>

          {/* Card 6: Waya X View */}
          <div className="border border-halo-border/30 rounded-xl p-4 bg-halo-surface/20 flex flex-col justify-start">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 font-extrabold">Waya X View</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium mt-2">
              The decline in SBI's stock price yesterday appears to be influenced by the negative PAT growth and overall market sentiment, rather than a single confirmed event. Investors should monitor upcoming financial results and market trends for further insights.
            </p>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-halo-border/20">
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Answer
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Market_Info
          </span>
        </div>
      </div>
    );
  };

  const renderNewsListLayout = (msg: ChatMessage) => {
    const isInterarch = msg.text.toLowerCase().includes('interarch');
    const companyTitle = isInterarch ? 'Interarch Building Products Ltd' : 'Advait Energy Transitions Limited';
    const ticker = isInterarch ? 'INTERARCH' : 'ADVAIT';
    
    const filings = isInterarch ? [
      { cat: 'Results', color: 'green', time: '21h ago', title: 'Transcript of the Earning call on the Audited Financial results for the Quarter and Year ended March 31,2026.' },
      { cat: 'Investor Relations', color: 'purple', time: '2d ago', title: "Corrigendum to Outcome of the Board Meeting held on 13th May''2026" },
      { cat: 'Agreements, Contracts, Arrangements, MOU, Buy back, Clarification', color: 'blue', time: '3d ago', title: 'Clarification on news item/Market rumour regarding buy back approval' },
      { cat: 'Regulatory', color: 'grey', time: '15 May', title: 'Submission of Annual Secretarial compliance report for year ended March 31,2026' },
      { cat: 'Results', color: 'green', time: '15 May', title: "Submission of Monitoring Agency Report for the Quarter ended 31st March''2026" },
      { cat: 'Results', color: 'green', time: '14 May', title: 'Submission of Audio recording of earnings conference call pursuant to Regulation 30 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015.' },
      { cat: 'Results', color: 'green', time: '14 May', title: "Intimation under Regulation 30 of the SEBI(LODR)Regulations,2015 regarding the press release for the Audited Financial results for the Quarter and year ended 31st March''2026" },
      { cat: 'Regulatory', color: 'grey', time: '13 May', title: 'Intimation under regulation 30 of the SEBI(LODR)Regulations,2015 regarding entering in MOU with ER Steel Inc. ,British Columbia, Canada for strategic collaboration for structural steel and Pre-Engineered Building' },
      { cat: 'Results', color: 'green', time: "13 May", title: "Audited Financial Results or the Quarter and year ended 31st March''2026" },
      { cat: 'Investor Relations', color: 'purple', time: "13 May", title: "Outcome of the Board Meeting held on 13th May''2026" }
    ] : [
      { cat: 'Results', color: 'green', time: '2d ago', title: 'Advait Energy Transitions Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 27/05/2026 ,inter alia, to consider and approve Standalone and Consolidated Audited Financial Results of the Company for quarter and financial year ended on March 31, 2026' },
      { cat: 'Agreements, Contracts, Arrangements, MOU', color: 'blue', time: '3d ago', title: 'MoU signed by the Company with TECO Fuel Cell Technology AS, during 3rd India-Nordic Summit held in Oslo, Norway on May 18, 2026' }
    ];

    const getCatColorClasses = (color: string) => {
      switch (color) {
        case 'green': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
        case 'purple': return 'bg-[#9B4DCA]/10 border-[#9B4DCA]/30 text-[#9B4DCA]';
        case 'blue': return 'bg-[#5B6BFF]/10 border-[#5B6BFF]/30 text-[#5B6BFF]';
        default: return 'bg-white/[0.04] border-white/10 text-slate-400';
      }
    };

    return (
      <div className="space-y-4">
        {/* Header Block */}
        <div className="flex flex-col gap-1 pb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-sans">{companyTitle}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-xl bg-[#5B6BFF]/10 border border-[#5B6BFF]/25 text-[9px] font-extrabold tracking-widest uppercase font-mono text-[#5B6BFF]">
              {ticker}
            </span>
          </div>
          <p className="text-[10px] text-halo-on-surface-muted font-sans font-medium mt-0.5">
            {filings.length} recent announcement{filings.length > 1 ? 's' : ''} · BSE filings
          </p>
        </div>

        {/* Timeline Filings List */}
        <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[14px] before:w-0.5 before:bg-halo-border/40">
          {filings.map((filing, idx) => (
            <div key={idx} className="flex gap-4 items-start relative z-10 pl-1">
              {/* Dot */}
              <div className="w-6 h-6 rounded-full bg-halo-surface border border-halo-border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#5B6BFF]" />
              </div>

              {/* Card */}
              <div className="flex-1 border border-halo-border/30 rounded-xl p-3.5 bg-halo-surface/20 flex flex-col gap-2 hover:border-halo-border-strong transition-all">
                <div className="flex justify-between items-center gap-4">
                  <span className={`text-[9px] font-extrabold tracking-wider uppercase font-mono px-2 py-0.5 rounded-xl border ${getCatColorClasses(filing.color)}`}>
                    {filing.cat}
                  </span>
                  <span className="text-[10px] text-halo-on-surface-faint font-mono font-medium">{filing.time}</span>
                </div>
                <p className="text-[11.5px] text-slate-200 leading-relaxed font-sans font-medium mt-0.5">
                  {filing.title}
                </p>
                <div className="flex justify-start pt-1">
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-[10px] font-bold text-[#5B6BFF] hover:text-[#7886FF] flex items-center gap-0.5 font-sans"
                  >
                    View Filing ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-halo-border/20">
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Answer
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Market_Info
          </span>
        </div>
      </div>
    );
  };

  const renderInvestTableLayout = (msg: ChatMessage) => {
    const stocksWithQty = [
      { ...MOCK_REC_SGFIN, qty: '17 shares' },
      { ...MOCK_REC_STEELCAST, qty: '33 shares' },
      { ...MOCK_REC_CUPID, qty: '83 shares' },
      { ...MOCK_REC_GEPIL, qty: '14 shares' },
      { ...MOCK_REC_VTL, qty: '16 shares' }
    ];

    return (
      <div className="space-y-4">
        {/* Warning Header */}
        <p className="text-[11.5px] text-slate-350 leading-relaxed font-sans font-medium">
          However, investors should remain vigilant and monitor market conditions closely, as the inherent risks associated with small-cap stocks can lead to unpredictable outcomes.
        </p>

        {/* Allocation Bar */}
        <div className="bg-[#5B6BFF]/8 border border-[#5B6BFF]/20 rounded-xl p-3 text-center text-xs font-semibold text-white font-sans shadow-inner">
          💰 ₹50,000 total budget split equally across 5 stocks — <span className="text-[#5B6BFF] font-bold">₹10,000 per stock</span>.
        </div>

        {/* Investment Table */}
        <div className="overflow-x-auto border border-halo-border/40 rounded-xl bg-halo-surface/20">
          <table className="w-full text-left border-collapse text-[11.5px] font-sans min-w-[700px]">
            <thead>
              <tr className="border-b border-halo-border/50 bg-halo-surface/40">
                <th className="p-3 text-[10px] uppercase tracking-wider text-halo-on-surface-faint font-extrabold font-mono w-12 text-center">#</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono">Stock Name</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-20">Buy Zone</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-32">Price Range</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-24">Target Price</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-24">Stop Loss</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-28">Target Upside</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-24">Tenure</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-[#5B6BFF] font-extrabold font-mono w-28">Qty</th>
                <th className="p-3 text-[10px] uppercase tracking-wider text-slate-300 font-extrabold font-mono w-16 text-center">Act</th>
              </tr>
            </thead>
            <tbody>
              {stocksWithQty.map((stock, idx) => (
                <tr key={idx} className="border-b border-halo-border/20 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 text-slate-400 font-mono text-center">{idx + 1}</td>
                  <td className="p-3">
                    <div className="font-bold text-white">{stock.stockName}</div>
                    <div className="text-[9.5px] text-slate-400 font-mono mt-0.5">{stock.ticker}</div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-bold text-emerald-400">
                      BUY
                    </span>
                  </td>
                  <td className="p-3 text-slate-350 font-sans">{stock.priceRange}</td>
                  <td className="p-3 text-white font-bold">{stock.targetPrice}</td>
                  <td className="p-3 text-slate-350">{stock.stopLoss}</td>
                  <td className="p-3 text-[#FF3A5C] font-bold">{stock.targetUpside}</td>
                  <td className="p-3 text-slate-350">{stock.tenure}</td>
                  <td className="p-3 text-[#5B6BFF] font-extrabold">{stock.qty}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleAddToPortfolio(stock)}
                      className="w-7 h-7 rounded-xl border border-halo-border bg-halo-elevated text-[#5B6BFF] hover:text-[#7886FF] hover:border-halo-border-strong flex items-center justify-center transition-all cursor-pointer mx-auto"
                      title="Add to Portfolio"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-halo-border/20">
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Answer
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-xl text-slate-400 font-extrabold">
            Advisory
          </span>
        </div>
      </div>
    );
  };

  // Submit chat query to Express + Gemini Backend
  const submitQuery = async (queryText: string) => {
    if (!queryText.trim() || !activeChatId || !userProfile) return;

    setIsPresetsOpen(false);
    setIsQuestionsOpen(false);

    const normalizedQuery = queryText.toLowerCase().trim();

    // ── HARDCODED INTERCEPTOR FOR USER SPECIFIC QUESTIONS ──
    let isHardcoded = false;
    let answerText = '';
    let responseStocks: StockRecommendation[] | undefined = undefined;
    let customLayout: 'comparison' | 'pe_ratio' | 'sbi_down' | 'news_list' | 'invest_table' | undefined = undefined;

    // 1. Compare SBI and ICICI Bank
    if (normalizedQuery.includes('compare sbi and icici') || (normalizedQuery.includes('sbi') && normalizedQuery.includes('icici') && (normalizedQuery.includes('compare') || normalizedQuery.includes('vs')))) {
      isHardcoded = true;
      customLayout = 'comparison';
      answerText = `ICICI Bank appears stronger on the supplied metrics.

• Higher ROE: 10.82% vs 6.77%
• Higher PAT Margin: 27.05% vs 9.80%
• Better PAT Growth: 6.29% vs 4.58%
• Comparable Revenue Growth: 4.77% vs 4.89%
• Lower Debt/Equity: 5.69 vs 11.44

Conclusion:
ICICI Bank appears stronger in profitability, growth, and leverage metrics. SBI has a higher EBITDA margin, but overall ICICI Bank shows better operational efficiency. This analysis is for research purposes only and should not be considered investment advice.`;
      responseStocks = [MOCK_REC_ICICI, MOCK_REC_SBI_COMP];
    }
    // 2. What is PE? / Explain P/E Ratio
    else if (normalizedQuery === 'what is pe?' || normalizedQuery === 'what is pe' || normalizedQuery.includes('explain p/e') || normalizedQuery.includes('explain pe') || normalizedQuery === 'p/e ratio' || normalizedQuery === 'pe ratio' || normalizedQuery.includes('p/e ratio') || normalizedQuery.includes('pe ratio')) {
      isHardcoded = true;
      customLayout = 'pe_ratio';
      answerText = `The Price-to-Earnings (P/E) ratio is a financial metric that compares a company's current share price to its earnings per share (EPS).

Formula:
P/E Ratio = Market Price per Share ÷ Earnings Per Share

Why it matters:
• Helps investors assess whether a stock is overvalued or undervalued.
• A high P/E may indicate strong growth expectations.
• A low P/E may suggest undervaluation.

Example:
If a company's share price is ₹100 and its EPS is ₹10, the P/E ratio is 10. Investors are willing to pay ₹10 for every ₹1 of earnings.

Key Takeaway:
P/E should always be evaluated alongside other financial metrics and compared with industry peers.`;
    }
    // 3. Why was SBI down yesterday?
    else if (normalizedQuery.includes('why was sbi down') || normalizedQuery.includes('why sbi down') || (normalizedQuery.includes('sbi') && normalizedQuery.includes('down') && normalizedQuery.includes('yesterday'))) {
      isHardcoded = true;
      customLayout = 'sbi_down';
      answerText = `State Bank of India (SBI) declined about 0.64% and closed at ₹950.90 after opening at ₹957.00.

Possible Reasons:
• Weak PAT growth (-31.28%)
• No specific confirmed fundamental trigger identified
• Broader market and sector-related factors may have contributed

Conclusion:
The decline does not appear to be linked to a single confirmed event.`;
      responseStocks = [MOCK_REC_SBI_DOWN];
    }
    // 4. Which F&O stock can I go long on?
    else if (normalizedQuery.includes('go long') || normalizedQuery.includes('long candidates') || normalizedQuery.includes('f&o stock can i go long') || normalizedQuery.includes('stock can i go long')) {
      isHardcoded = true;
      answerText = `Suggested Long Candidates:
• SG Finserve Ltd
• Steelcast Ltd
• Cupid Ltd
• GE Power India Ltd
• Vardhman Textiles Ltd

Note:
Investors should remain cautious of the risks associated with small-cap stocks and monitor market trends closely.`;
      responseStocks = [MOCK_REC_SGFIN, MOCK_REC_STEELCAST, MOCK_REC_CUPID, MOCK_REC_GEPIL, MOCK_REC_VTL];
    }
    // 5. Which stock can I go short on? / Give me F&O stocks I can short
    else if (normalizedQuery.includes('go short') || normalizedQuery.includes('stocks i can short') || normalizedQuery.includes('stocks to short') || normalizedQuery.includes('stocks to go short') || normalizedQuery.includes('stocks i can go short') || normalizedQuery.includes('stocks to short candidates') || normalizedQuery.includes('f&o stocks i can short')) {
      isHardcoded = true;
      answerText = `Suggested Short Candidates:
• Vasa Denticity Ltd
• Info Edge (India) Ltd
• Fino Payments Bank Ltd
• Procter & Gamble Health Care Ltd
• Roadstar Infra Investment Trust

Additional Short Candidates:
• Tata Consultancy Services (TCS)
• HDFC Bank
• HCL Technologies

Note:
Investors should remain vigilant and monitor market conditions as they can change rapidly.`;
      responseStocks = [MOCK_REC_DENTISTRY, MOCK_REC_NAUKRI, MOCK_REC_FINOPB, MOCK_REC_PGHL, MOCK_REC_ROADSTAR];
    }
    // 6. Give me latest news on Interarch
    else if (normalizedQuery.includes('news on interarch') || normalizedQuery.includes('interarch news') || normalizedQuery.includes('latest news on interarch') || normalizedQuery.includes('news about interarch') || normalizedQuery.includes('news on inter arch') || normalizedQuery.includes('inter arch news')) {
      isHardcoded = true;
      customLayout = 'news_list';
      answerText = `Recent company updates included:
• Earnings call transcript for FY results ended March 31, 2026
• Corrigendum to Board Meeting outcome dated May 13, 2026
• Clarification regarding buyback-related market rumours
• Annual Secretarial Compliance Report submitted
• Monitoring Agency Report for quarter ended March 31, 2026
• Audio recording of earnings conference call released
• Press release on audited financial results submitted`;
      responseStocks = [MOCK_REC_INTERARCH];
    }
    // 7. Give me latest news on Advait
    else if (normalizedQuery.includes('news on advait') || normalizedQuery.includes('advait news') || normalizedQuery.includes('latest news on advait') || normalizedQuery.includes('news about advait')) {
      isHardcoded = true;
      customLayout = 'news_list';
      answerText = `No verifiable company-specific news was found based on the provided search results. The company/ticker could not be reliably identified, so no confirmed filings, results, analyst notes, or company announcements were available.`;
      responseStocks = [MOCK_REC_ADVAIT];
    }
    // 8. I have ₹50,000 to invest. Give me 5 stocks to invest in.
    else if (normalizedQuery.includes('50,000 to invest') || normalizedQuery.includes('50000 to invest') || (normalizedQuery.includes('invest') && (normalizedQuery.includes('50000') || normalizedQuery.includes('50,000')) && (normalizedQuery.includes('5 stocks') || normalizedQuery.includes('stocks')))) {
      isHardcoded = true;
      customLayout = 'invest_table';
      answerText = `Suggested Stocks:
1. SG Finserve Ltd
2. Steelcast Ltd
3. Cupid Ltd
4. GE Power India Ltd
5. Vardhman Textiles Ltd

Note:
These are only suggestions based on the provided analysis and should not be treated as financial advice. Always conduct your own research before investing.`;
      responseStocks = [MOCK_REC_SGFIN, MOCK_REC_STEELCAST, MOCK_REC_CUPID, MOCK_REC_GEPIL, MOCK_REC_VTL];
    }

    if (isHardcoded) {
      // Append user message immediately
      const userMsg: ChatMessage = {
        id: 'msg-user-' + Date.now(),
        sender: 'user',
        text: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedMessages = [...(activeChat?.messages || []), userMsg];
      const currentHistories = chatHistories.map(chat => {
        if (chat.id === activeChatId) {
          const title = chat.messages.length === 0 ? (queryText.length > 25 ? queryText.slice(0, 25) + '...' : queryText) : chat.title;
          return { ...chat, title, messages: updatedMessages };
        }
        return chat;
      });
      saveChatsToLocalStorage(currentHistories);
      setInputValue('');
      setIsLoading(true);
      setErrorText(null);

      const startTime = performance.now();
      setTimeout(() => {
        const endTime = performance.now();
        const calculatedDurationMs = Math.round(endTime - startTime) + 120;
        
        const assistantMsg: ChatMessage = {
          id: 'msg-ai-' + Date.now(),
          sender: 'assistant',
          text: answerText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          stocks: responseStocks,
          customLayout: customLayout,
          latency: `${calculatedDurationMs} ms`
        };

        const updatedWithAI = [...updatedMessages, assistantMsg];
        setChatHistories(prev => {
          const next = prev.map(chat => {
            if (chat.id === activeChatId) {
              return { ...chat, messages: updatedWithAI };
            }
            return chat;
          });
          saveChatsToLocalStorage(next);
          return next;
        });
        setIsLoading(false);
      }, 750);
      return;
    }

    const isStockQuery = normalizedQuery.includes('stock') || normalizedQuery.includes('buy');

    // Intercept and launch beautiful questionnaire flow when stock query is triggered
    if (isStockQuery && !surveyResponseProgress.horizon) {
      setInputValue('');
      setIsLoading(false);

      const userMsg: ChatMessage = {
        id: 'msg-user-' + Date.now(),
        sender: 'user',
        text: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const assistantSurveyMsg: ChatMessage = {
        id: 'msg-ai-survey-1-' + Date.now(),
        sender: 'assistant',
        text: 'Before I dive in — how long are you thinking of staying invested? Whether it\'s a quick trade or the long game, this shapes everything I suggest for you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSurvey: true,
        surveyQuestion: {
          id: 'horizon',
          text: 'Before I dive in — how long are you thinking of staying invested? Whether it\'s a quick trade or the long game, this shapes everything I suggest for you.',
          options: [
            'Short Term — quick wins, under 3 months',
            'Medium Term — steady growth, 3 to 12 months',
            'Long Term — wealth building, 1 year and beyond'
          ]
        }
      };

      const updatedMessages = [...(activeChat?.messages || []), userMsg, assistantSurveyMsg];
      const currentHistories = chatHistories.map(chat => {
        if (chat.id === activeChatId) {
          const title = chat.messages.length === 0 ? (queryText.length > 25 ? queryText.slice(0, 25) + '...' : queryText) : chat.title;
          return { ...chat, title, messages: updatedMessages };
        }
        return chat;
      });

      saveChatsToLocalStorage(currentHistories);
      return;
    }

    // Build the user message
    const userMsg: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append to current chat
    const updatedMessages = [...(activeChat?.messages || []), userMsg];
    const currentHistories = chatHistories.map(chat => {
      if (chat.id === activeChatId) {
        // Automatically rename first session from default if empty
        const title = chat.messages.length === 0 ? (queryText.length > 25 ? queryText.slice(0, 25) + '...' : queryText) : chat.title;
        return { ...chat, title, messages: updatedMessages };
      }
      return chat;
    });

    saveChatsToLocalStorage(currentHistories);
    setInputValue('');
    setIsLoading(true);
    setErrorText(null);

    const startTime = performance.now();

    // Simulated offline/local network delay for realistic high-fidelity prototype response
    setTimeout(() => {
      let answerText = '';
      let responseStocks: StockRecommendation[] | undefined = undefined;

      if (normalizedQuery.includes('portfolio') || normalizedQuery.includes('holdings')) {
        const tickers = ['TCS', 'RELIANCE', 'ROUTE', 'GOKUL', 'SKM', 'CEINSYS', 'DYNACONS'];
        let matchedTicker = '';
        for (const t of tickers) {
          if (normalizedQuery.includes(t.toLowerCase())) {
            matchedTicker = t;
            break;
          }
        }
        
        if (normalizedQuery.includes('add') && matchedTicker) {
          const mockStockMap: { [key: string]: StockRecommendation } = {
            'GOKUL': MOCK_REC_GOKUL,
            'SKM': MOCK_REC_SKM,
            'ROUTE': MOCK_REC_ROUTE,
            'CEINSYS': MOCK_REC_CEINSYS,
            'DYNACONS': MOCK_REC_DYNACONS,
            'RELIANCE': {
              id: 'rec-rel',
              stockName: 'Reliance Industries',
              ticker: 'RELIANCE',
              action: 'BUY',
              priceRange: '₹2450.00–₹2480.00',
              targetPrice: '₹2700.00',
              stopLoss: '₹2350.00',
              targetUpside: '+10%',
              tenure: '3–6mo',
              technical: { rdxScore: 4.5, rsiWeekly: 58, adxWeekly: 25, ema50_200: 'Bullish', return1M: '+2%', return3M: '+5%', return1Y: '+15%', volatility30D: 'Low' },
              fundamental: { peRatio: 24, pbRatio: 2.1, roe: '12%', roce: '14%', debtEquity: '0.4', fiiHolding: '21%', opm: '18%', profitGrowth3Y: '12%' },
              thesis: 'Strong core refinery margins and retail momentum.'
            },
            'TCS': {
              id: 'rec-tcs',
              stockName: 'Tata Consultancy Services',
              ticker: 'TCS',
              action: 'BUY',
              priceRange: '₹3420.00–₹3450.00',
              targetPrice: '₹3800.00',
              stopLoss: '₹3250.00',
              targetUpside: '+12%',
              tenure: '3–6mo',
              technical: { rdxScore: 4.2, rsiWeekly: 55, adxWeekly: 22, ema50_200: 'Bullish', return1M: '+1%', return3M: '+4%', return1Y: '+12%', volatility30D: 'Low' },
              fundamental: { peRatio: 28, pbRatio: 7.2, roe: '38%', roce: '44%', debtEquity: '0.0', fiiHolding: '15%', opm: '25%', profitGrowth3Y: '10%' },
              thesis: 'Steady cloud deal flow and strong free cash flow generation.'
            }
          };

          const matchedRec = mockStockMap[matchedTicker];
          if (matchedRec) {
            setTimeout(() => {
              handleAddToPortfolio(matchedRec);
            }, 100);
            answerText = `I have added **${matchedRec.stockName} (${matchedRec.ticker})** to your portfolio. The portfolio panel has been opened to the right.`;
          } else {
            answerText = `I found the request to add a stock to your portfolio, but couldn't resolve the ticker. Please use the **Add to Portfolio** button directly on the stock recommendation table or add it manually in the portfolio panel.`;
          }
        } else {
          setTimeout(() => {
            setIsPortfolioOpen(true);
            setIsFaqOpen(false);
          }, 100);
          answerText = `I have opened your **Portfolio Panel** on the right side of the screen. You can view your current holdings or add positions manually there.`;
        }
      } else if (normalizedQuery.includes('list of stocks') || normalizedQuery.includes('stocks i can buy') || normalizedQuery.includes('stocks currently in the buy zone') || normalizedQuery.includes('buy zone') || normalizedQuery.includes('picks')) {
        answerText = `Based on WayaX's automated daily scan of BSE/NSE equities, we have discovered several companies crossing critical visual buy triggers. These correspond to solid RDX momentum structures and extremely low leverage levels. These picks match your **${userProfile.riskTolerance} Risk** memory.`;
        responseStocks = [MOCK_REC_GOKUL, MOCK_REC_SKM, MOCK_REC_ROUTE, MOCK_REC_CEINSYS, MOCK_REC_DYNACONS];
      } else if (normalizedQuery.includes('fmcg') || normalizedQuery.includes('food') || normalizedQuery.includes('consumer')) {
        answerText = `FMCG sector analysis: Defensive positioning is strengthening as domestic margins recover from price stabilization. We select consumer food and services showing high return ratios and low supply-chain volatility over the mid-term.`;
        responseStocks = [MOCK_REC_SKM, MOCK_REC_ROUTE];
      } else if (normalizedQuery.includes('short') || normalizedQuery.includes('bearish') || normalizedQuery.includes('sell')) {
        answerText = `Short-selling opportunities identified via RDX visual and mathematical indicators. These selections are currently exhibiting heavy volume breakdown structures below major long-term moving averages. Use strict stops as shorting carries asymmetric risks.`;
        responseStocks = [MOCK_REC_SHORT_TATA];
      } else if (normalizedQuery.includes('it sector') || normalizedQuery.includes('tech') || normalizedQuery.includes('software')) {
        answerText = `IT and Software Sector Update: Enterprise technology contracts show massive pipeline expansion. Standard high-potential mid-cap tech picks with zero debt have been short-listed.`;
        responseStocks = [MOCK_REC_ROUTE, MOCK_REC_CEINSYS, MOCK_REC_DYNACONS];
      } else if (normalizedQuery.includes('long-term') || normalizedQuery.includes('multibagger') || normalizedQuery.includes('wealth creation') || normalizedQuery.includes('3x')) {
        answerText = `Long-term wealth building opportunities feature companies with strong compounded sales growth, massive return on capital employed (ROCE > 20%), and zero or negligible debt profiles. These fit a **${userProfile.investmentHorizon}** outlook.`;
        responseStocks = [MOCK_REC_DYNACONS, MOCK_REC_ROUTE, MOCK_REC_SKM];
      } else if (normalizedQuery.includes('track record') || normalizedQuery.includes('profitable') || normalizedQuery.includes('win rate')) {
        answerText = `### WayaX Historical Track Record & Advisory Veracity
        
Our audited SEBI research performance details demonstrate a persistent statistical advantage across market cycles:
- **Cumulative Win Rate on Closed Recommendations**: **74.8%** over the past 24 months.
- **Average Win Margin per Call**: **+18.4%** above the NSE Nifty 50 benchmark.
- **Total Closed Recommendations**: **342** (256 profitable, 86 stopped out).
- **Average Holding Period**: 94 calendar days.

* Past performance is not a guarantee of future returns. Detailed Excel spreadsheets with SEBI registration metrics can be obtained upon request from support.`;
      } else if (normalizedQuery.includes('buy zone') || normalizedQuery.includes('what is a buy zone')) {
        answerText = `### Understanding WayaX "Buy Zones"

A WayaX **Buy Zone** represents a mathematically and visually backed price hallway where the risk-to-reward ratio is optimal (typically 1:2 or higher).
- **Entry Protocol**: We locate visual support zones (e.g., strong volume nodes, key moving averages like the weekly 50 EMA, and structural trendline bases).
- **Execution Strategy**: Orders should be scaled incrementally within the specified price hallway rather than bought as a single lump-sum.
- **Stop Loss Enforcement**: If a stock trades daily or weekly below the Stop Loss price, our advisory rules dictate an immediate manual or algorithmic exit to preserve capital.`;
      } else {
        answerText = `Hello! I have integrated your personalized WayaX settings (**${userProfile.riskTolerance} risk** with a **${userProfile.investmentHorizon} horizon**). 

If you are requesting specific equity recommendations, feel free to choose one of our predefined preset questions on the right panel, or ask me about:
1. **IT or Tech sector buys**
2. **Short selling opportunities**
3. **Consumer, Food or FMCG picks**
4. **Our general track record and win margins**

Alternatively, how can I advise you on specific investment choices today?`;
      }

      const endTime = performance.now();
      const calculatedDurationMs = Math.round(endTime - startTime) + 120;

      const assistantMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stocks: responseStocks,
        latency: `${calculatedDurationMs} ms`
      };

      const updatedWithAI = [...updatedMessages, assistantMsg];

      setChatHistories(prev => {
        const next = prev.map(chat => {
          if (chat.id === activeChatId) {
            return { ...chat, messages: updatedWithAI };
          }
          return chat;
        });
        saveChatsToLocalStorage(next);
        return next;
      });
      setIsLoading(false);
    }, 750);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitQuery(inputValue);
  };

  // FAQ preset selection
  const handleFaqClick = (question: string) => {
    setInputValue('');
    submitQuery(question);
  };

  // Survey Option Clicked Handler (Screen 1 & 2 Conversational flow simulation)
  const handleSurveyOptionClick = (questionId: 'horizon' | 'risk', option: string) => {
    if (!activeChat) return;

    // 1. Post user response message
    const userResponseMsg: ChatMessage = {
      id: 'msg-user-ans-' + Date.now(),
      sender: 'user',
      text: option,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentMessages = [...activeChat.messages, userResponseMsg];

    if (questionId === 'horizon') {
      // Move to Risk Survey Question (Survey 2)
      const secSurveyMsg: ChatMessage = {
        id: 'msg-ai-survey-2-' + Date.now(),
        sender: 'assistant',
        text: 'Love it! One more thing — how comfortable are you with risk? There\'s no wrong answer here, just different flavours of investing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSurvey: true,
        surveyQuestion: {
          id: 'risk',
          text: 'Love it! One more thing — how comfortable are you with risk? There\'s no wrong answer here, just different flavours of investing.',
          options: [
            'Large Cap — stable giants, lower risk',
            'Mid Cap — balanced risk and solid growth',
            'Small Cap — high growth, fasten your seatbelt!',
            'Mix it all — show me the best across the board'
          ]
        }
      };

      setSurveyResponseProgress({ ...surveyResponseProgress, horizon: option });
      setTempSelectedOption(null);
      
      const revisedHistories = chatHistories.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: [...currentMessages, secSurveyMsg] };
        }
        return chat;
      });
      saveChatsToLocalStorage(revisedHistories);
    } else {
      // Completed surveys, now query list of stocks immediately!
      setSurveyResponseProgress({ ...surveyResponseProgress, risk: option });
      setTempSelectedOption(null);
      setIsLoading(true);
      
      // Update state
      const revisedHistories = chatHistories.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: currentMessages };
        }
        return chat;
      });
      saveChatsToLocalStorage(revisedHistories);

      // Now query standard buy list since surveys are finalized
      setTimeout(() => {
        submitQuery('Give me list of stocks I can buy');
      }, 500);
    }
  };

  const handleSurveyGoBack = () => {
    if (!activeChat || activeChat.messages.length < 4) return;
    // Remove Step 2 survey card and User option answer text
    const revisedMessages = activeChat.messages.slice(0, activeChat.messages.length - 2);
    const revisedHistories = chatHistories.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: revisedMessages };
      }
      return chat;
    });
    const updatedProgress = { ...surveyResponseProgress };
    delete updatedProgress.horizon;
    setSurveyResponseProgress(updatedProgress);
    setTempSelectedOption(null);
    saveChatsToLocalStorage(revisedHistories);
  };

  const handleSurveySkip = () => {
    if (!activeChat) return;
    const latestMsg = activeChat.messages[activeChat.messages.length - 1];
    setTempSelectedOption(null);
    if (latestMsg && latestMsg.isSurvey && latestMsg.surveyQuestion) {
      if (latestMsg.surveyQuestion.id === 'horizon') {
        handleSurveyOptionClick('horizon', 'No specific preference');
      } else {
        handleSurveyOptionClick('risk', 'No specific preference');
      }
    }
  };

  const renderUnifiedSearchBar = (isCompact: boolean) => {
    return (
      <div className={`w-full flex flex-col items-center ${isCompact ? 'mb-4' : ''}`}>
        <motion.div
          layoutId="unified-search-card"
          layout
          className={`w-full pointer-events-auto mx-auto z-10 relative group/search ${
            isCompact ? 'max-w-[1100px]' : 'max-w-[1240px] md:max-w-[1200px]'
          }`}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        >        {/* Static Gradient Outline (animation removed, gradient kept) */}
        <div className={`absolute ${
          theme === 'light' 
            ? `-inset-[4px] p-[4px] ${isCompact ? 'rounded-[27px]' : 'rounded-[31px]'}` 
            : `-inset-[3px] p-[3px] ${isCompact ? 'rounded-[26px]' : 'rounded-[30px]'}`
        } pointer-events-none z-0 mask-gradient-glow ${theme === 'light' ? 'opacity-90' : 'opacity-60'} group-focus-within/search:opacity-100 transition-opacity duration-400`}>
          <div 
            className="absolute inset-0 opacity-90"
            style={{ 
              background: theme === 'light'
                ? 'linear-gradient(153.76deg, #5B6BFF 0%, #F43F5E 50%, #D946EF 100%)'
                : 'linear-gradient(153.76deg, #7065FB 0%, #DF59B4 100%)'
            }}
          />
        </div>

        <div className={`transition-all duration-300 bg-halo-surface text-halo-on-surface relative z-10 ${
          isCompact
            ? 'rounded-[23px] p-2 px-4'
            : 'rounded-[27px] py-3 px-3 md:py-3 md:px-4 max-w-[960px] md:max-w-[1200px] mx-auto shadow-[0_12px_45px_rgba(0,0,0,0.5)]'
        }`}>
          {isCompact ? (
            <div className="flex items-center gap-3 w-full pr-1 py-0.5 relative">
              <Paperclip className="w-4 h-4 transition-colors flex-shrink-0 cursor-pointer pl-0.5 text-halo-on-surface-muted hover:text-white" />

              <div className="flex-1 min-w-0 relative py-0.5">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  autoFocus
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (inputValue.trim()) {
                        submitQuery(inputValue);
                      }
                    }
                  }}
                  placeholder={window.innerWidth < 768 ? "Ask WayaX..." : "Ask WayaX about stocks, entry zones, F&O, portfolio advisory..."}
                  className="w-full bg-transparent focus:outline-none text-[16px] md:text-[14px] font-sans font-medium min-w-0 text-halo-on-surface placeholder-[var(--color-halo-on-surface-faint)] resize-none custom-scroll overflow-y-auto max-h-24 py-0 min-h-[28px] leading-[28px]"
                />

                {isListening && (
                  <div className="absolute inset-0 flex items-center justify-between bg-halo-surface border border-[#FF3A5C]/20 z-20 rounded-xl px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A5C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A5C]"></span>
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF3A5C] animate-pulse">LISTENING...</span>
                    </div>
                    <div className="flex items-end gap-0.5 h-3 pb-0.5">
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-1 h-1" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-2 h-2.5" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-3 h-1" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-4 h-3" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-5 h-1.5" />
                    </div>
                  </div>
                )}
              </div>



                {/* Compact voice input microphone button next to Send */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={`w-7 h-7 rounded-xl active:scale-95 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 border ${
                    isListening
                      ? 'bg-[#FF3A5C]/25 text-[#FF3A5C] border-[#FF3A5C]/40 shadow-[0_0_10px_rgba(255,58,92,0.4)]'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                  title="Voice Input"
                >
                  <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-pulse' : ''}`} />
                </button>

               {/* Horizontal send arrow aligned right on the same row */}
               <button
                 type="button"
                 onClick={() => {
                   if (inputValue.trim()) {
                     submitQuery(inputValue);
                   }
                 }}
                 disabled={!inputValue.trim()}
                 className="w-7 h-7 rounded-xl active:scale-95 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 bg-[#5B6BFF] hover:bg-[#7886FF] text-white border border-[#5B6BFF]/30 shadow-[0_0_10px_rgba(91,107,255,0.4)] disabled:opacity-20"
               >
                 <ArrowUp className="w-3.5 h-3.5" />
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full relative min-h-[28px] md:min-h-[36px]">
              <div className="flex-1 min-w-0 relative flex items-center">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  autoFocus
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (inputValue.trim()) {
                        submitQuery(inputValue);
                      }
                    }
                  }}
                  placeholder={typedPlaceholder || "Ask WayaX..."}
                  className="w-full bg-transparent focus:outline-none text-[16px] md:text-[15px] font-sans font-medium min-w-0 text-halo-on-surface placeholder-[var(--color-halo-on-surface-faint)] resize-none custom-scroll overflow-y-auto max-h-36 py-0 min-h-[28px] md:min-h-[36px] leading-[28px] md:leading-[36px]"
                />

                {isListening && (
                  <div className="absolute inset-0 flex items-center justify-between bg-halo-surface border border-[#FF3A5C]/20 z-20 rounded-xl px-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A5C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A5C]"></span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#FF3A5C] animate-pulse">
                        <span className="hidden sm:inline">WAYAX ADVISORY </span>VOICE LISTENING...
                      </span>
                    </div>
                    <div className="flex items-end gap-0.5 h-3.5 pb-0.5">
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-1 h-1.5" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-2 h-3" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-3 h-1.5" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-4 h-3.5" />
                      <div className="w-0.5 bg-[#5B6BFF] rounded-full animate-voice-bar-5 h-2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons inside the Card on the Right */}
              <div className="flex items-center gap-2 flex-shrink-0">


                 {/* Voice input button */}
                 <button
                   type="button"
                   onClick={handleVoiceSearch}
                   className={`w-7 h-7 md:w-8.5 md:h-8.5 rounded-xl active:scale-95 flex items-center justify-center transition-all cursor-pointer border ${
                     isListening
                       ? 'bg-[#FF3A5C]/25 text-[#FF3A5C] border-[#FF3A5C]/40 shadow-[0_0_10px_rgba(255,58,92,0.4)]'
                       : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white'
                   }`}
                   title="Voice Input"
                 >
                   <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" />
                 </button>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (inputValue.trim()) {
                      submitQuery(inputValue);
                    }
                  }}
                  disabled={!inputValue.trim()}
                  className="w-7 h-7 md:w-8.5 md:h-8.5 rounded-xl active:scale-95 flex items-center justify-center transition-all cursor-pointer bg-[#5B6BFF] hover:bg-[#7886FF] text-white disabled:opacity-20 shadow-[0_4px_15px_rgba(91,107,255,0.35)] border border-[#5B6BFF]/30"
                >
                  <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Attached SEBI registered subtitle below the search bar card */}
      <div className="text-center mt-3 select-none flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1 text-[6px] md:text-[7px] text-halo-on-surface-muted opacity-60 max-w-[960px] mx-auto px-2">
        <div className="flex items-center gap-1 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-halo-success flex-shrink-0 animate-pulse" />
          <strong className="font-extrabold text-halo-on-surface uppercase tracking-[0.05em]">SEBI Registered Analyst · RA INH000010876</strong>
        </div>
        <span className="hidden md:inline text-halo-border/30">|</span>
        <span>Investments are subject to market risk. Past performance is not indicative of future results.</span>
      </div>
    </div>
    );
  };

  const renderWelcomePresets = () => {
    return (
      <div className="w-full flex flex-col gap-3.5 animate-fade-in select-none relative">
        {/* Explore Chat Presets (FAQ) Header */}
        <div className="flex items-center gap-3 select-none w-full justify-center opacity-85">
          <div className="h-px w-8 md:w-16 bg-halo-border/25" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase font-mono text-halo-on-surface-faint whitespace-nowrap">
            Explore Presets
          </span>
          <div className="h-px w-8 md:w-16 bg-halo-border/25" />
        </div>

        {/* Presets Row */}
        <div className="flex flex-nowrap items-center md:justify-center gap-2 w-full py-0.5 overflow-x-auto scrollbar-none px-2 md:px-0 max-w-full">
          {/* Stocks to Buy */}
          <div className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'buy' && isQuestionsOpen) {
                  setIsQuestionsOpen(false);
                } else {
                  setActiveTab('buy');
                  setIsQuestionsOpen(true);
                }
                setShowAllQuestions(true);
              }}
              className={`px-3 py-1 md:py-1.5 text-[10.5px] sm:text-[11px] md:text-[11.5px] font-bold rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border active:scale-[0.97] ${
                activeTab === 'buy' && isQuestionsOpen
                  ? 'bg-halo-elevated border-[#5B6BFF] text-white shadow-[0_0_0_3px_rgba(91,107,255,0.2)]'
                  : 'bg-white/[0.04] border-white/10 text-halo-on-surface-muted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
              }`}
            >
              <TrendingUp className="w-3 h-3 text-halo-success" />
              <span>Stocks to Buy</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${activeTab === 'buy' && isQuestionsOpen ? 'rotate-180 text-white' : 'text-halo-on-surface-faint'}`} />
            </button>
          </div>

          {/* Stocks selling */}
          <div className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'short' && isQuestionsOpen) {
                  setIsQuestionsOpen(false);
                } else {
                  setActiveTab('short');
                  setIsQuestionsOpen(true);
                }
                setShowAllQuestions(true);
              }}
              className={`px-3 py-1 md:py-1.5 text-[10.5px] sm:text-[11px] md:text-[11.5px] font-bold rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border active:scale-[0.97] ${
                activeTab === 'short' && isQuestionsOpen
                  ? 'bg-halo-elevated border-[#5B6BFF] text-white shadow-[0_0_0_3px_rgba(91,107,255,0.2)]'
                  : 'bg-white/[0.04] border-white/10 text-halo-on-surface-muted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-halo-error" />
              <span>Stocks selling</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${activeTab === 'short' && isQuestionsOpen ? 'rotate-180 text-white' : 'text-halo-on-surface-faint'}`} />
            </button>
          </div>

          {/* Long Term Picks */}
          <div className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'long' && isQuestionsOpen) {
                  setIsQuestionsOpen(false);
                } else {
                  setActiveTab('long');
                  setIsQuestionsOpen(true);
                }
                setShowAllQuestions(true);
              }}
              className={`px-3 py-1 md:py-1.5 text-[10.5px] sm:text-[11px] md:text-[11.5px] font-bold rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border active:scale-[0.97] ${
                activeTab === 'long' && isQuestionsOpen
                  ? 'bg-halo-elevated border-[#5B6BFF] text-white shadow-[0_0_0_3px_rgba(91,107,255,0.2)]'
                  : 'bg-white/[0.04] border-white/10 text-halo-on-surface-muted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
              }`}
            >
              <Sparkles className="w-3 h-3 text-halo-warning" />
              <span>Long term picks</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${activeTab === 'long' && isQuestionsOpen ? 'rotate-180 text-white' : 'text-halo-on-surface-faint'}`} />
            </button>
          </div>

          {/* Track Record */}
          <div className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'track' && isQuestionsOpen) {
                  setIsQuestionsOpen(false);
                } else {
                  setActiveTab('track');
                  setIsQuestionsOpen(true);
                }
                setShowAllQuestions(true);
              }}
              className={`px-3 py-1 md:py-1.5 text-[10.5px] sm:text-[11px] md:text-[11.5px] font-bold rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border active:scale-[0.97] ${
                activeTab === 'track' && isQuestionsOpen
                  ? 'bg-halo-elevated border-[#5B6BFF] text-white shadow-[0_0_0_3px_rgba(91,107,255,0.2)]'
                  : 'bg-white/[0.04] border-white/10 text-halo-on-surface-muted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
              }`}
            >
              <Search className="w-3 h-3 text-halo-info" />
              <span>Track record</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${activeTab === 'track' && isQuestionsOpen ? 'rotate-180 text-white' : 'text-halo-on-surface-faint'}`} />
            </button>
          </div>

          {/* About Waya */}
          <div className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'about' && isQuestionsOpen) {
                  setIsQuestionsOpen(false);
                } else {
                  setActiveTab('about');
                  setIsQuestionsOpen(true);
                }
                setShowAllQuestions(true);
              }}
              className={`px-3 py-1 md:py-1.5 text-[10.5px] sm:text-[11px] md:text-[11.5px] font-bold rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border active:scale-[0.97] ${
                activeTab === 'about' && isQuestionsOpen
                  ? 'bg-halo-elevated border-[#5B6BFF] text-white shadow-[0_0_0_3px_rgba(91,107,255,0.2)]'
                  : 'bg-white/[0.04] border-white/10 text-halo-on-surface-muted hover:text-white hover:bg-white/[0.08] hover:border-white/15'
              }`}
            >
              <Search className="w-3 h-3 text-halo-on-surface-muted" />
              <span>About Waya</span>
              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${activeTab === 'about' && isQuestionsOpen ? 'rotate-180 text-white' : 'text-halo-on-surface-faint'}`} />
            </button>
          </div>
        </div>

        {/* Emerging Questions Panel - Absolutely positioned */}
        <div className={`w-full absolute left-0 right-0 z-30 ${
          (isFaqOpen || isPortfolioOpen) ? 'bottom-full mb-3.5' : 'top-full mt-2'
        }`}>
          <AnimatePresence>
            {isQuestionsOpen && activeTab && (
              <motion.div
                initial={{ opacity: 0, y: (isFaqOpen || isPortfolioOpen) ? 10 : -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: (isFaqOpen || isPortfolioOpen) ? 10 : -10, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-full rounded-xl p-3 border mt-1 border-halo-border bg-halo-surface text-halo-on-surface overflow-hidden"
              >
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1.5 glass-scrollbar">
                  {(DROPDOWN_QUESTIONS[activeTab] || []).map((q, idx) => (
                    <button
                      key={`${activeTab}-${idx}`}
                      type="button"
                      onClick={() => {
                        handleFaqClick(q);
                      }}
                      className="w-full text-left p-2.5 rounded-xl border border-halo-border bg-halo-elevated hover:bg-halo-elevated/80 hover:border-[#5B6BFF] text-halo-on-surface transition-all duration-150 flex items-center justify-between group cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-3 w-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BFF] group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
                        <span className="font-sans font-medium break-words text-[11px] md:text-[13.5px]">{q}</span>
                      </div>
                      <span className="hidden sm:inline-flex text-[9.5px] group-hover:translate-x-1 transition-all duration-200 select-none items-center gap-1 text-halo-on-surface-faint group-hover:text-[#5B6BFF]">
                        Ask <span>&rarr;</span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen font-sans overflow-hidden relative bg-halo-bg text-halo-on-surface">
      
      {/* GPU-Accelerated Interactive Dotted Grid & Cursor Flame Background Canvas */}
      <canvas 
        id="interactive-bg-canvas" 
        className="absolute inset-0 pointer-events-none z-0" 
      />

      {showSplash ? (
        <Splash theme={theme} onComplete={() => setShowSplash(false)} isMuted={isMuted} setIsMuted={setIsMuted} />
      ) : !userProfile ? (
        <Onboarding onComplete={handleOnboardingComplete} theme={theme} />
      ) : (
        <>








      {/* Unified mobile drawer backdrop overlay — only closes sidebar, not FAQ/Portfolio */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[995] md:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        />
      )}

      {/* 1. Left Chat Panel Drawer */}
      <Sidebar
        chatHistories={chatHistories}
        activeChatId={activeChatId}
        userProfile={userProfile}
        isOpen={isSidebarOpen}
        isRightPanelOpen={isFaqOpen || isPortfolioOpen}
        isPortfolioOpen={isPortfolioOpen}
        isFaqOpen={isFaqOpen}
        onChangeProfile={saveProfileToLocalStorage}
        onSelectChat={handleSelectChat}
        onCreateNewChat={handleCreateNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onTogglePortfolio={() => {
          setIsPortfolioOpen(!isPortfolioOpen);
        }}
        onToggleFaq={() => {
          setIsFaqOpen(!isFaqOpen);
        }}
        theme={theme}
        onSignOut={handleSignOut}
        onGoHome={handleGoHome}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 bg-transparent">

        {/* Mobile Top Bar Menu */}
        <div className="flex md:hidden h-14 w-full items-center justify-between px-3 bg-[#12131a] border-b border-white/5 z-[990] flex-shrink-0">
          {/* Left Side: Sidebar Actions */}
          <div className="flex items-center gap-1.5">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white active:scale-95 cursor-pointer"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Home */}
            <button
              onClick={handleGoHome}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.04] active:scale-95 cursor-pointer"
              title="Go Home"
            >
              <Home className="w-4 h-4" />
            </button>

            {/* New Chat */}
            <button
              onClick={handleCreateNewChat}
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#5B6BFF] hover:bg-[#7886FF] text-white active:scale-95 cursor-pointer shadow-md font-bold"
              title="New Chat"
            >
              <Plus className="w-4 h-4 text-white" strokeWidth={3} />
            </button>

            {/* Portfolio Button */}
            <button
              onClick={() => {
                setIsPortfolioOpen(!isPortfolioOpen);
              }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#2BE08C]/10 active:scale-95 cursor-pointer"
              title="Portfolio"
            >
              <Wallet className="w-4 h-4 text-[#2BE08C]" />
            </button>

            {/* User Profile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.04] active:scale-95 cursor-pointer"
              title="User Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side: FAQ Button */}
          <div className="flex items-center gap-1">
            {/* FAQ Button */}
            <button
              onClick={() => {
                setIsFaqOpen(!isFaqOpen);
              }}
              className="h-8 px-2.5 rounded-xl flex items-center justify-center gap-1 transition-all duration-200 border border-transparent bg-transparent text-slate-400 hover:text-white hover:bg-[#5B6BFF]/10 hover:border-[#5B6BFF]/25 hover:shadow-[0_0_12px_rgba(91,107,255,0.15)] active:scale-95 cursor-pointer"
              title="FAQ"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#5B6BFF]" />
              <span className="hidden min-[370px]:inline text-xs font-bold tracking-wide uppercase font-sans">
                FAQ
              </span>
            </button>
          </div>
        </div>



        {/* Bottom-Right Utility Action Capsule */}
        <div className="hidden md:flex fixed bottom-4 right-4 z-[990] p-1.5 flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#12131a] shadow-2xl">
          {/* Restart Splash Intro Animation */}
          <button
            onClick={() => setShowSplash(true)}
            className="group/refresh w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white"
            title="Restart Intro Animation"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-5 h-px bg-white/10 my-0.5" />

          {/* Testing Reset Button */}
          <button
            onClick={() => {
              localStorage.removeItem('wayax-profile');
              localStorage.removeItem('wayax-chats');
              setUserProfile(null);
              setChatHistories([]);
              setActiveChatId('');
              setActiveSurvey(null);
            }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-[#FF3A5C]/10 hover:border-[#FF3A5C]/35 text-slate-400 hover:text-[#FF3A5C]"
            title="Reset configuration & profiles (Test mode)"
          >
            <RefreshCcw className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

        {/* Workspace dynamic contents */}
        {isEmptyChat ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`transition-all duration-300 flex flex-col items-center justify-center overflow-y-auto scrollbar-none py-[60px] md:py-[76px] px-3 md:px-4 ${
              window.innerWidth >= 768
                ? `fixed z-20 ${(isFaqOpen || isPortfolioOpen) ? 'shadow-lg backdrop-blur-2xl' : 'shadow-none'}`
                : 'flex-1 relative min-h-0 w-full'
            }`}
            style={
              window.innerWidth >= 768
                ? {
                    left: isPortfolioOpen
                      ? (isSidebarOpen ? 'calc(30% + 296px)' : 'calc(30% + 64px)')
                      : (isSidebarOpen ? '288px' : '56px'),
                    right: isFaqOpen ? 'calc(20% + 16px)' : ((isFaqOpen || isPortfolioOpen) ? '8px' : '0px'),
                    top: (isFaqOpen || isPortfolioOpen) ? '8px' : '0px',
                    bottom: (isFaqOpen || isPortfolioOpen) ? '8px' : '0px',
                    height: (isFaqOpen || isPortfolioOpen) ? 'calc(100vh - 16px)' : '100vh',
                    borderRadius: (isFaqOpen || isPortfolioOpen) ? '12px' : '0px',
                    borderWidth: (isFaqOpen || isPortfolioOpen) ? '1px' : '0px',
                    borderColor: (isFaqOpen || isPortfolioOpen) ? 'rgba(255,255,255,0.05)' : 'transparent',
                    backgroundColor: (isFaqOpen || isPortfolioOpen) ? 'rgba(14, 16, 23, 0.65)' : 'transparent',
                  }
                : undefined
            }
          >
            <div className={`w-full max-w-[960px] md:max-w-[1000px] mx-auto z-20 flex flex-col items-center transition-all duration-300 gap-3 md:gap-3.5 relative ${
              (isFaqOpen || isPortfolioOpen)
                ? 'h-full justify-between'
                : 'justify-center my-auto'
            }`}>
              
              {/* Main Titles */}
              <div className={`w-full flex flex-col items-center justify-center text-center transition-all duration-300 ${
                (isFaqOpen || isPortfolioOpen) ? 'scale-90 mt-2' : 'mb-5 md:mb-7'
              }`}>
                <div className="flex flex-col items-center justify-center gap-5 md:gap-7 text-center select-none font-sans w-full">
                  
                  {/* WayaX App Logo */}
                  <div 
                    className="relative group flex items-center justify-center cursor-pointer"
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                  >
                    {/* SVG Liquid Displacement Filter definitions for the organic convective flames warp */}
                    <svg className="absolute w-0 h-0 pointer-events-none">
                      <defs>
                        <filter id="liquid-displacement-filter">
                          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>
                    </svg>

                    {/* Quiet electric indigo core glow behind the logo */}
                    <motion.div 
                       className="absolute pointer-events-none w-[220px] h-[220px] md:w-[360px] md:h-[360px] rounded-full z-0 filter blur-[60px] md:blur-[80px]"
                       style={{
                         background: theme === 'light'
                           ? 'radial-gradient(circle, rgba(91, 107, 255, 0.45) 0%, rgba(223, 89, 180, 0.25) 40%, rgba(223, 89, 180, 0) 70%)'
                           : 'radial-gradient(circle, #5B6BFF 0%, rgba(91, 107, 255, 0.4) 40%, rgba(91, 107, 255, 0) 75%)',
                         top: '50%',
                         left: '50%',
                         x: '-50%',
                         y: '-50%',
                       }}
                       animate={{
                         scale:   [1, 1.07, 0.95, 1.04, 0.97, 1.06, 1],
                         opacity: theme === 'light'
                           ? [0.65, 0.85, 0.50, 0.80, 0.55, 0.82, 0.65]
                           : [0.28, 0.38, 0.22, 0.35, 0.25, 0.36, 0.28],
                         rotate:  [0, 2, -1.5, 1, -2, 0.5, 0],
                       }}
                       transition={{
                         duration: 20,
                         repeat: Infinity,
                         repeatType: "mirror",
                         ease: "easeInOut"
                       }}
                    />

                    {/* Multi-layer Animated Fire Flames System */}
                    <motion.div
                      className="absolute z-0 pointer-events-none w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
                      style={{
                        top: '50%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,0.15) 68%, rgba(0,0,0,0) 78%)',
                        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,0.15) 68%, rgba(0,0,0,0) 78%)',
                      }}
                      animate={{
                        scale: isLogoHovered ? 1.15 : 1,
                        opacity: isLogoHovered ? 1.3 : 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 140,
                        damping: 18
                      }}
                    >
                      {/* Layer 1: Core Flame (Tallest, centered) */}
                      <motion.div
                        className="absolute pointer-events-none z-0 rounded-t-full rounded-b-[45%] origin-bottom w-[45px] h-[62px] md:w-[80px] md:h-[105px]"
                        style={{
                          background: theme === 'light'
                            ? 'linear-gradient(135deg, #5B6BFF 0%, #DF59B4 100%)'
                            : 'linear-gradient(153.76deg, #7065FB 0%, #DF59B4 100%)',
                          bottom: '21%',
                          left: '50%',
                          x: '-50%',
                          filter: 'url(#liquid-displacement-filter) blur(27px)',
                          mixBlendMode: theme === 'light' ? 'normal' : 'screen'
                        }}
                        animate={{
                          scaleX: [1, 0.96, 1.04, 0.98, 1.02, 1],
                          scaleY: [1, 1.05, 0.95, 1.03, 0.97, 1],
                          y: [0, -4, 2, -3, 1, 0],
                          rotate: [0, -1, 1, -0.5, 0.5, 0],
                          opacity: theme === 'light'
                            ? [0.75, 0.90, 0.70, 0.85, 0.78, 0.75]
                            : [0.55, 0.68, 0.50, 0.63, 0.58, 0.55]
                        }}
                        transition={{
                          duration: 10.5,
                          ease: [0.25, 0.8, 0.25, 1],
                          repeat: Infinity
                        }}
                      />

                      {/* Layer 2: Left Flame Tongue (Leans left) */}
                      <motion.div
                        className="absolute pointer-events-none z-0 rounded-t-full rounded-b-[40%] origin-bottom-right w-[35px] h-[45px] md:w-[60px] md:h-[78px]"
                        style={{
                          background: theme === 'light'
                            ? 'linear-gradient(135deg, #7886FF 0%, #E879F9 100%)'
                            : 'linear-gradient(153.76deg, #7065FB 0%, #DF59B4 100%)',
                          bottom: '21%',
                          left: '50%',
                          x: '-65%',
                          filter: 'url(#liquid-displacement-filter) blur(22px)',
                          mixBlendMode: theme === 'light' ? 'normal' : 'screen'
                        }}
                        animate={{
                          scaleX: [1, 0.95, 1.05, 0.97, 1.02, 1],
                          scaleY: [1, 1.04, 0.96, 1.02, 0.98, 1],
                          y: [0, -2, 0.8, -1.5, 0, 0],
                          rotate: [3, 1, 4, 2, 3, 3],
                          opacity: theme === 'light'
                            ? [0.65, 0.78, 0.60, 0.75, 0.68, 0.65]
                            : [0.42, 0.52, 0.38, 0.50, 0.45, 0.42]
                        }}
                        transition={{
                          duration: 9.4,
                          ease: [0.25, 0.8, 0.25, 1],
                          repeat: Infinity,
                          delay: 0.48
                        }}
                      />

                      {/* Layer 3: Right Flame Tongue (Leans right) */}
                      <motion.div
                        className="absolute pointer-events-none z-0 rounded-t-full rounded-b-[40%] origin-bottom-left w-[35px] h-[45px] md:w-[60px] md:h-[78px]"
                        style={{
                          background: theme === 'light'
                            ? 'linear-gradient(135deg, #4A59E6 0%, #C084FC 100%)'
                            : 'linear-gradient(153.76deg, #7065FB 0%, #DF59B4 100%)',
                          bottom: '21%',
                          left: '50%',
                          x: '-35%',
                          filter: 'url(#liquid-displacement-filter) blur(22px)',
                          mixBlendMode: theme === 'light' ? 'normal' : 'screen'
                        }}
                        animate={{
                          scaleX: [1, 0.96, 1.04, 0.98, 1.02, 1],
                          scaleY: [1, 0.96, 1.04, 0.98, 1.02, 1],
                          y: [0, -2, 0.8, -2.5, 0, 0],
                          rotate: [-3, -1, -4, -2, -3, -3],
                          opacity: theme === 'light'
                            ? [0.68, 0.80, 0.62, 0.78, 0.70, 0.68]
                            : [0.44, 0.55, 0.40, 0.52, 0.47, 0.44]
                        }}
                        transition={{
                          duration: 8.8,
                          ease: [0.25, 0.8, 0.25, 1],
                          repeat: Infinity,
                          delay: 0.24
                        }}
                      />

                      {/* Layer 4: Hot Core Spot */}
                      <motion.div
                        className="absolute pointer-events-none z-0 rounded-full w-[40px] h-[40px] md:w-[66px] md:h-[66px] filter blur-[9px] md:blur-[12px]"
                        style={{
                          background: theme === 'light'
                            ? 'radial-gradient(circle, rgba(91, 107, 255, 0.95) 0%, rgba(223, 89, 180, 0.6) 45%, rgba(223, 89, 180, 0) 80%)'
                            : 'radial-gradient(circle, rgba(119, 242, 228, 0.95) 0%, rgba(107, 182, 243, 0.6) 40%, rgba(193, 114, 241, 0.2) 65%, rgba(193, 114, 241, 0) 80%)',
                          top: '50%',
                          left: '50%',
                          x: '-50%',
                          y: '-50%',
                        }}
                        animate={{
                          scale: [1, 1.08, 0.94, 1.06, 0.97, 1],
                          opacity: theme === 'light'
                            ? [0.85, 0.98, 0.78, 0.92, 0.88, 0.85]
                            : [0.70, 0.88, 0.62, 0.82, 0.74, 0.70]
                        }}
                        transition={{
                          duration: 1.6,
                          ease: 'easeInOut',
                          repeat: Infinity
                        }}
                      />

                      {/* Sharp centered Line Grid masked inside the flames container */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-5 transition-all duration-300 bg-line-grid opacity-90"
                        style={{
                          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 62%, rgba(0,0,0,0) 75%)',
                          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 62%, rgba(0,0,0,0) 75%)',
                        }}
                      />
                    </motion.div>

                    {/* Razor-sharp Premium Rotating Gradient Outline Ring (AI Studio Style) */}
                    <div 
                      className="absolute z-0 w-[48px] h-[48px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex items-center justify-center pointer-events-none"
                      style={{
                        background: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                        boxShadow: theme === 'light' ? 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)' : 'inset 0 0 0 1px rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <motion.div
                        className="w-full h-full rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0%, #77F2E4 12%, #5B6BFF 24%, #C172F1 36%, transparent 48%, transparent 100%)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
                      />
                      {/* Inner mask to create a razor-sharp 2px border that matches the background color dynamically */}
                      <div 
                        className="absolute inset-[2px] rounded-full z-10" 
                        style={{ backgroundColor: 'var(--color-halo-bg)' }}
                      />
                    </div>

                    {/* Hazy Organic Gradient Blob floating randomly behind the logo */}
                    <motion.div
                      className="absolute z-0 w-[50px] h-[50px] md:w-[110px] md:h-[110px] pointer-events-none opacity-70"
                      style={{
                        filter: 'blur(10px)',
                      }}
                      animate={{
                        y: [-6, 6, -3, 8, -4, 4, -6],
                        x: [-4, 4, -2, 3, -4, 2, -4],
                        rotate: [0, 120, 240, 360],
                        scale: [0.94, 1.06, 0.92, 1.04, 0.94]
                      }}
                      transition={{
                        duration: 18,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#77F2E4" stopOpacity="0.75" />
                            <stop offset="50%" stopColor="#5B6BFF" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#C172F1" stopOpacity="0.75" />
                          </linearGradient>
                        </defs>
                        {/* Smooth curved organic blob shape */}
                        <path 
                          d="M50 12 C68 10, 88 24, 90 46 C92 68, 74 88, 52 90 C30 92, 12 76, 10 54 C8 32, 32 14, 50 12 Z" 
                          fill="url(#blob-gradient)"
                        />
                      </svg>
                    </motion.div>

                    <img 
                      id="welcome-logo-image"
                      src="https://i.ibb.co/qYKrsTcM/WA-2-2.png" 
                      className="w-[44px] h-[44px] md:w-[96px] md:h-[96px] object-contain brightness-110 active:scale-95 transition-transform relative z-10" 
                      alt="WayaX Logo" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>

                  {/* Header text container */}
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-3">
                    <h2 className="text-[26px] sm:text-[34px] md:text-[50px] font-extrabold tracking-tight font-sans leading-tight text-halo-on-surface">
                      Welcome to WayaX,{' '}
                      <span className="block md:inline-block font-black" style={{ background: 'linear-gradient(135deg, #5B6BFF 0%, #8B5CF6 35%, #C172F1 60%, #F0509E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{userProfile.name}</span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Dynamic Welcome Content Flow */}
              {(isFaqOpen || isPortfolioOpen) ? (
                <div className="w-full max-w-[960px] mx-auto">
                  {renderUnifiedSearchBar(false)}
                </div>
              ) : (
                <div className="w-full flex flex-col gap-6 items-center" style={{ maxWidth: '960px', margin: '0 auto' }}>
                  {/* Glass Container enclosing Search Bar and SEBI subtitle */}
                  <div
                    className="w-full max-w-[1240px] md:max-w-[1200px] mx-auto p-4 md:p-6 rounded-[36px] border border-white/[0.01] relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(91,107,255,0.01) 0%, rgba(193,114,241,0.01) 35%, rgba(119,242,228,0.01) 70%, rgba(14,16,23,0.01) 100%)',
                      backdropFilter: 'blur(32px) saturate(160%) brightness(1.04)',
                      WebkitBackdropFilter: 'blur(32px) saturate(160%) brightness(1.04)',
                    }}
                  >
                    <div className="w-full z-20">
                      {renderUnifiedSearchBar(false)}
                    </div>
                  </div>
                  {/* Explore Presets outside the container */}
                  <div className="w-full max-w-[960px] md:max-w-[1000px] mx-auto">
                    {renderWelcomePresets()}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            id="main-chat-viewport-container"
            className={`transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              window.innerWidth >= 768
                ? `fixed z-20 ${(isFaqOpen || isPortfolioOpen) ? 'shadow-lg backdrop-blur-2xl' : 'shadow-none'}`
                : 'flex-1 relative min-h-0'
            }`}
            style={
              window.innerWidth >= 768
                ? {
                    left: isPortfolioOpen
                      ? (isSidebarOpen ? 'calc(30% + 296px)' : 'calc(30% + 64px)')
                      : (isSidebarOpen ? '288px' : '56px'),
                    right: isFaqOpen ? 'calc(20% + 16px)' : ((isFaqOpen || isPortfolioOpen) ? '8px' : '0px'),
                    top: (isFaqOpen || isPortfolioOpen) ? '8px' : '0px',
                    bottom: (isFaqOpen || isPortfolioOpen) ? '8px' : '0px',
                    height: (isFaqOpen || isPortfolioOpen) ? 'calc(100vh - 16px)' : '100vh',
                    borderRadius: (isFaqOpen || isPortfolioOpen) ? '12px' : '0px',
                    borderWidth: (isFaqOpen || isPortfolioOpen) ? '1px' : '0px',
                    borderColor: (isFaqOpen || isPortfolioOpen) ? 'rgba(255,255,255,0.05)' : 'transparent',
                    backgroundColor: (isFaqOpen || isPortfolioOpen) ? 'rgba(14, 16, 23, 0.65)' : 'transparent',
                  }
                : undefined
            }
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24
            }}
          >
            {/* Scrollable messages and advisory list */}
            <div id="main-chat-viewport" className={`flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-10 ${getChatMobilePaddingBottom(messages)}`}>
              <div className="max-w-[960px] md:max-w-[960px] mx-auto space-y-8 md:space-y-12">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[55vh] w-full py-6 relative">
                    {!(isFaqOpen || isPortfolioOpen) && renderWelcomePresets()}
                  </div>
                ) : (
                  messages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  
                  if (msg.isSurvey) {
                    const activeSurveyMsg = messages.length > 0 && messages[messages.length - 1].isSurvey 
                      ? messages[messages.length - 1] 
                      : null;
                      
                    if (msg.id === activeSurveyMsg?.id) {
                      return null; // Keep active survey animated in the footer only
                    }
                    
                    // Render historical/completed survey inside the viewport
                    const msgIdx = messages.findIndex(m => m.id === msg.id);
                    const nextMsg = msgIdx !== -1 && msgIdx < messages.length - 1 ? messages[msgIdx + 1] : null;
                    const selectedOption = nextMsg && nextMsg.sender === 'user' ? nextMsg.text : null;
                    
                    return (
                      <div 
                        key={msg.id}
                        id={index === messages.length - 1 && !isUser ? 'last-bot-message' : undefined}
                        className="animate-fade-in w-full"
                      >
                        {/* Avatar + Name header row */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="relative w-7 h-7 rounded-xl border border-halo-border bg-halo-surface flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                            <img 
                              src="https://i.ibb.co/PGxQw859/Mask-group-2.png" 
                              className="w-4 h-4 object-contain brightness-110" 
                              alt="Waya" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                          <span className="text-[10px] text-halo-on-surface-muted tracking-wider font-mono uppercase">
                            WayaX
                          </span>
                        </div>
                        
                        {/* Full-width message content */}
                        <div className="flex flex-col w-full gap-4">
                          <div className="rounded-xl font-secondary space-y-3.5 p-5 md:p-6 shadow-sm w-full border border-halo-border bg-halo-surface transition-all duration-300">
                            <div className="text-[14px] font-semibold font-sans leading-relaxed tracking-tight text-white">
                              {msg.text}
                            </div>
                            
                            <div className="space-y-2 mt-3.5">
                              {msg.surveyQuestion?.options.map((option, optIdx) => {
                                const isSelected = selectedOption === option;
                                
                                return (
                                  <div
                                    key={optIdx}
                                    className={`rounded-xl px-4 py-3 flex items-center gap-3 border text-[13px] transition-all duration-300 ${
                                      isSelected
                                        ? 'border-[#5B6BFF] bg-[#5B6BFF]/10 text-white font-semibold'
                                        : 'border-halo-border bg-halo-surface text-halo-on-surface-muted opacity-75'
                                    }`}
                                  >
                                    {isSelected ? (
                                      <span className="w-5.5 h-5.5 flex items-center justify-center rounded-xl bg-[#5B6BFF] text-white shadow-[0_1px_5px_rgba(91,107,255,0.4)] animate-scale-in">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                      </span>
                                    ) : (
                                      <span className="w-5.5 h-5.5 flex items-center justify-center font-mono font-bold text-[10px] rounded-xl bg-halo-elevated border border-halo-border text-halo-on-surface-faint">
                                        {optIdx + 1}
                                      </span>
                                    )}
                                    <span className={isSelected ? 'text-halo-primary font-semibold' : 'text-halo-on-surface-muted'}>
                                      {option}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  

                  return (
                    <div 
                      key={msg.id}
                      id={index === messages.length - 1 && !isUser ? 'last-bot-message' : undefined}
                      className={`w-full ${isUser ? 'flex flex-col items-end' : ''}`}
                    >
                      {/* Avatar + Name header row */}
                      <div className={`flex items-center gap-2 mb-1.5 ${isUser ? 'flex-row-reverse' : ''}`}>
                        {!isUser ? (
                          <div className="w-8 h-8 rounded-xl border border-halo-border bg-halo-surface flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden z-10">
                            <img src="https://i.ibb.co/PGxQw859/Mask-group-2.png" className="w-5 h-5 object-contain brightness-110" alt="Waya" referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl border border-halo-border bg-halo-surface text-[#5B6BFF] flex items-center justify-center flex-shrink-0 font-bold text-[11px] shadow-sm select-none">
                            {userProfile.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-[11px] text-halo-on-surface-muted tracking-wider font-mono uppercase">
                          {isUser ? userProfile.name : 'WayaX'}
                        </span>
                      </div>

                      {/* Msg text block */}
                      <div className={`space-y-2 ${isUser ? 'text-right' : 'text-left w-full'}`}>
                        {isUser ? (
                          <div className="rounded-2xl border border-halo-border bg-halo-elevated text-slate-100 px-5 py-4 text-[13.5px] md:text-[14px] shadow-sm transition-all duration-300 text-left w-fit max-w-full">
                            <div className="whitespace-pre-line leading-relaxed font-sans font-medium">
                              {msg.text}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-transparent border-none p-0 space-y-5 text-[13.5px] md:text-[14px] leading-relaxed font-sans text-slate-300">
                            {msg.customLayout ? (
                              renderCustomLayout(msg, theme)
                            ) : (
                              <>
                                <div className="space-y-2 leading-relaxed font-sans text-slate-300">
                                  {renderFormattedMessageText(msg.text)}
                                </div>

                                {/* Rendering Expanded stock recommendations table inside this specific bubble response */}
                                {msg.stocks && msg.stocks.length > 0 && (
                                  <div className="mt-4">
                                    <StockTable 
                                      stocks={msg.stocks} 
                                      theme={theme} 
                                      onAddToPortfolio={handleAddToPortfolio} 
                                    />
                                  </div>
                                )}
                                
                                {/* Advisory Badge bar below assistant bubbles */}
                                <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t flex-wrap border-white/[0.04]">
                                  <span className="text-[9px] font-extrabold tracking-widest uppercase border px-2 py-0.5 rounded-xl font-mono bg-white/[0.04] text-[#5B6BFF] border-[#5B6BFF]/20">
                                    ANSWER
                                  </span>
                                  <span className="text-[9px] font-extrabold tracking-widest uppercase border px-2 py-0.5 rounded-xl font-mono bg-white/[0.04] text-[#2BE08C] border-[#2BE08C]/20">
                                    ADVISORY
                                  </span>
                                  {msg.latency && (
                                    <span className="text-[9px] font-mono border px-2 py-0.5 rounded-xl bg-white/[0.04] text-slate-400 border-white/05">
                                      {msg.latency}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

                {/* Dynamic typing loader feedback */}
                {isLoading && (
                  <div className="animate-fade-in relative w-full">
                    {/* Avatar + Name header row */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-xl border border-halo-border bg-halo-surface flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-sm">
                        <div className="w-3.5 h-3.5 border-2 border-[#5B6BFF] border-t-transparent rounded-full animate-spin" />
                      </div>
                      <span className="text-[10px] text-halo-on-surface-muted tracking-wider font-mono uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BFF] animate-pulse" /> WayaX • Analyzing Markets
                      </span>
                    </div>
                    {/* Full-width loading content */}
                    <div className="border border-halo-border bg-halo-surface px-4 py-3 rounded-xl font-secondary flex items-center gap-2 text-xs shadow-sm text-left text-halo-on-surface-muted w-full">
                      <div className="flex gap-0.5 mt-1 font-bold text-lg text-[#5B6BFF]">
                        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                      </div>
                      <span className="ml-2">Formulating advisory thesis, auditing guidelines...</span>
                    </div>
                  </div>
                )}

                {/* Warnings and Disclaimers block if stocks listed */}
                {messages.some(m => m.stocks && m.stocks.length > 0) && (
                  <p className="text-[10px] font-secondary tracking-wide leading-relaxed p-4 border border-halo-border rounded-xl text-center font-normal select-none max-w-3xl mx-auto bg-halo-surface text-halo-on-surface-muted">
                    All recommendations are for informational purposes only. Past performance does not guarantee future results. Invest according to your own risk appetite and financial situation. Execute trades through your own SEBI-registered broker. Waya Financial Technologies | SEBI RA: INH00010876 | PMS: INP000008987
                  </p>
                )}

                {/* Handle error notification alerts */}
                {errorText && (
                  <div className="p-3 bg-[#FF3A5C]/10 border border-[#FF3A5C]/25 text-[#FF3A5C] text-xs rounded-xl flex items-center gap-2 select-none mx-auto max-w-xl">
                    <AlertTriangle className="w-4 h-4 text-[#FF3A5C] flex-shrink-0" />
                    <span>{errorText}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <footer className="relative w-full md:max-w-[1100px] mx-auto p-3 md:p-3.5 z-20 select-none pb-[calc(16px+env(safe-area-inset-bottom))] md:pb-3.5 border-t md:border border-white/5 bg-[#0e1017]/65 backdrop-blur-[12px] rounded-none md:rounded-[26px] shadow-[0_-8px_32px_rgba(0,0,0,0.25)] text-halo-on-surface mb-4 md:mb-6">
              <div className="w-full max-w-full mx-auto space-y-4">
                {(() => {
                  const activeSurveyMsg = messages.length > 0 && messages[messages.length - 1].isSurvey 
                    ? messages[messages.length - 1] 
                    : null;
                    
                  return (
                    <AnimatePresence>
                      {activeSurveyMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.99 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="w-full relative z-20 text-left mb-1.5 md:mb-2"
                        >
                          <div className="bg-halo-elevated rounded-xl p-3 md:p-6 lg:p-8 border border-halo-border shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-3xl relative">
                            {/* Header containing text and step indicators */}
                            <div className="flex flex-row justify-between items-center gap-3 pb-2.5 border-b border-halo-border select-none text-left w-full">
                              <div className="flex-1 min-w-0 pr-1">
                                <h3 className="text-[11.5px] md:text-[15px] font-bold text-halo-on-surface font-sans leading-snug tracking-tight whitespace-normal break-words">
                                  {activeSurveyMsg.text}
                                </h3>
                              </div>
                              
                              {/* Navigation & Action Controls on Right */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="flex items-center gap-1.5">
                                  <button 
                                    onClick={() => {
                                      if (activeSurveyMsg.surveyQuestion?.id === 'risk') {
                                        handleSurveyGoBack();
                                      }
                                    }}
                                    disabled={activeSurveyMsg.surveyQuestion?.id === 'horizon'}
                                    className={`w-6 h-6 md:w-7 md:h-7 rounded-xl md:rounded-xl flex items-center justify-center border transition-all ${
                                      activeSurveyMsg.surveyQuestion?.id === 'horizon' 
                                        ? 'opacity-20 border-halo-border text-slate-600 cursor-not-allowed' 
                                        : 'bg-halo-surface border-halo-border hover:bg-halo-elevated text-slate-300 hover:text-white cursor-pointer'
                                    }`}
                                    title="Previous step"
                                  >
                                    <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                                  </button>
                                  
                                  <span className="text-[9px] md:text-[11px] font-mono font-bold text-slate-400 select-none px-0.5 tracking-wider whitespace-nowrap">
                                    {activeSurveyMsg.surveyQuestion?.id === 'horizon' ? '1 / 2' : '2 / 2'}
                                  </span>
                                  
                                  <button 
                                    onClick={() => {
                                      if (activeSurveyMsg.surveyQuestion?.id === 'horizon') {
                                        const opt = tempSelectedOption || 'Short Term — quick wins, under 3 months';
                                        handleSurveyOptionClick('horizon', opt);
                                      }
                                    }}
                                    disabled={activeSurveyMsg.surveyQuestion?.id === 'risk'}
                                    className={`w-6 h-6 md:w-7 md:h-7 rounded-xl md:rounded-xl flex items-center justify-center border transition-all ${
                                      activeSurveyMsg.surveyQuestion?.id === 'risk' 
                                        ? 'opacity-20 border-halo-border text-slate-600 cursor-not-allowed' 
                                        : 'bg-halo-surface border-halo-border hover:bg-halo-elevated text-slate-300 hover:text-white cursor-pointer'
                                    }`}
                                    title="Next step"
                                  >
                                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                                  </button>
                                </div>
                                
                                <div className="w-px h-3.5 bg-[var(--color-halo-border)] hidden md:block" />
                                
                                {/* Close cross X button */}
                                <button 
                                  onClick={() => handleSurveySkip()}
                                  className="w-6 h-6 md:w-7 md:h-7 rounded-xl md:rounded-xl flex items-center justify-center bg-halo-surface border border-halo-border hover:bg-halo-elevated text-slate-400 hover:text-white transition-all cursor-pointer"
                                  title="Dismiss survey"
                                >
                                  <X className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Options List layout matching user sketch vertically stacked with badges */}
                            <div className="mt-2.5 space-y-1.5 md:space-y-2.5">
                              {activeSurveyMsg.surveyQuestion?.options.map((option, optIdx) => {
                                const isSelected = tempSelectedOption === option || (
                                  activeSurveyMsg.surveyQuestion?.id === 'horizon' 
                                    ? surveyResponseProgress.horizon === option 
                                    : surveyResponseProgress.risk === option
                                );

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => {
                                      setTempSelectedOption(option);
                                      setTimeout(() => {
                                        handleSurveyOptionClick(activeSurveyMsg.surveyQuestion!.id, option);
                                      }, 550);
                                    }}
                                    className={`w-full text-left rounded-xl md:rounded-2xl p-2 md:p-3.5 transition-all duration-300 flex items-center gap-2.5 md:gap-4 group cursor-pointer border ${
                                      isSelected 
                                        ? 'border-[#5B6BFF] bg-[#5B6BFF]/10 shadow-[0_4px_24px_rgba(91,107,255,0.15)] font-semibold' 
                                        : 'border-halo-border bg-halo-surface hover:bg-halo-elevated hover:border-halo-border-strong'
                                    }`}
                                  >
                                    {isSelected ? (
                                      <span className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0 flex items-center justify-center rounded-xl md:rounded-xl bg-[#5B6BFF] text-white shadow-[0_2px_10px_rgba(91,107,255,0.5)] transition-all animate-scale-in">
                                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                      </span>
                                    ) : (
                                      <span className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0 flex items-center justify-center font-mono font-bold text-[9px] md:text-[11px] bg-halo-elevated border border-halo-border text-halo-on-surface-muted rounded-xl md:rounded-xl group-hover:bg-[var(--color-halo-border)] group-hover:text-halo-on-surface transition-colors">
                                        {optIdx + 1}
                                      </span>
                                    )}
                                    
                                    <span className={`font-sans font-medium text-[11px] md:text-[13px] transition-colors ${
                                      isSelected ? 'text-halo-on-surface font-semibold' : 'text-halo-on-surface-muted group-hover:text-halo-on-surface'
                                    }`}>
                                      {option}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Something else / Skip text row at bottom */}
                            <div className="mt-3 md:mt-6 pt-2.5 md:pt-5 border-t border-halo-border flex flex-row items-center gap-2 md:gap-4 justify-between w-full">
                              {/* custom input row */}
                              <div className="flex items-center gap-2 md:gap-3 bg-halo-surface border border-halo-border focus-within:border-halo-border-strong px-3 md:px-4 h-8 md:h-11 rounded-xl md:rounded-xl transition-all flex-1 min-w-0">
                                <PenTool className="w-3 h-3 md:w-3.5 md:h-3.5 text-halo-on-surface-muted flex-shrink-0" />
                                <input 
                                  type="text"
                                  placeholder="Something else..."
                                  value={surveyCustomText}
                                  onChange={(e) => setSurveyCustomText(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && surveyCustomText.trim()) {
                                      setTempSelectedOption(surveyCustomText.trim());
                                      setTimeout(() => {
                                        handleSurveyOptionClick(activeSurveyMsg.surveyQuestion!.id, surveyCustomText.trim());
                                        setSurveyCustomText('');
                                      }, 550);
                                    }
                                  }}
                                  className="bg-transparent focus:outline-none text-[10px] md:text-xs font-sans font-medium text-halo-on-surface placeholder-halo-on-surface-faint w-full"
                                />
                              </div>
                              
                              {/* Skip Button */}
                              <button 
                                onClick={() => handleSurveySkip()}
                                className="text-[10px] md:text-xs font-bold px-3 md:px-5 h-8 md:h-11 rounded-xl md:rounded-xl border border-halo-border bg-halo-surface text-halo-on-surface-muted hover:text-halo-on-surface hover:bg-halo-elevated hover:border-halo-border-strong transition-all cursor-pointer shadow-md select-none flex-shrink-0"
                              >
                                Skip
                              </button>
                            </div>
                          </div>
                          
                          {/* Centered label block: "Or reply directly..." */}
                          <div className="hidden sm:flex mt-3 text-center flex-col items-center gap-3 select-none">
                            <span className="text-[10px] uppercase tracking-widest font-extrabold font-mono text-halo-on-surface-muted bg-white/[0.06] px-3 py-1 rounded-full border border-white/10">
                              Or reply directly...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })()}

                {/* Active compact unified search bar with layoutId shared animation */}
                {renderUnifiedSearchBar(true)}

                <div className="text-center text-[9px] text-halo-on-surface-faint mt-2 font-secondary flex items-center justify-center gap-1.5">
                  <span className="hidden md:inline">Enter to send · Shift+Enter for new line</span>
                  <span className="hidden md:inline text-[var(--color-halo-border)] font-mono">|</span>
                  <span className="text-halo-on-surface-faint font-semibold uppercase font-secondary tracking-wide">Advisory only — not direct financial advice</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </div>






      {/* Right FAQ Drawer Panel */}
      <motion.div
        ref={rightPanelRef}
        animate={{
          width: isFaqOpen
            ? (window.innerWidth < 768 ? "100%" : "20%")
            : 0,
          height: isFaqOpen
            ? (window.innerWidth < 768 ? "100vh" : "calc(100vh - 16px)")
            : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 24,
        }}
        className={`fixed z-[1010] flex select-none overflow-hidden transition-all duration-300 ${
          isFaqOpen
            ? 'bg-[#12131a] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex-col top-0 right-0 bottom-0 h-screen rounded-none border-y-0 border-r-0 md:top-2 md:right-2 md:bottom-2 md:h-[calc(100vh-16px)] md:rounded-xl md:border'
            : 'hidden'
        }`}
        style={{
          backdropFilter: isFaqOpen ? 'blur(32px) saturate(180%)' : undefined,
          WebkitBackdropFilter: isFaqOpen ? 'blur(32px) saturate(180%)' : undefined,
        }}
      >
        {isFaqOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <FAQDrawer
              isOpen={isFaqOpen}
              onToggle={() => setIsFaqOpen(false)}
              onQuestionClick={handleFaqClick}
              theme={theme}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Left Portfolio Drawer Panel */}
      <motion.div
        animate={{
          width: isPortfolioOpen
            ? (window.innerWidth < 768 ? "100%" : "30%")
            : 0,
          height: isPortfolioOpen
            ? (window.innerWidth < 768 ? "100vh" : "calc(100vh - 16px)")
            : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 24,
        }}
        className={`fixed z-[1010] flex select-none overflow-hidden transition-all duration-300 ${
          isPortfolioOpen
            ? 'bg-[#12131a] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex-col top-0 left-0 bottom-0 h-screen rounded-none border-y-0 border-l-0 md:top-2 md:bottom-2 md:h-[calc(100vh-16px)] md:rounded-xl md:border'
            : 'hidden'
        }`}
        style={{
          left: window.innerWidth >= 768
            ? (isSidebarOpen ? '288px' : '56px')
            : '0px',
          backdropFilter: isPortfolioOpen ? 'blur(32px) saturate(180%)' : undefined,
          WebkitBackdropFilter: isPortfolioOpen ? 'blur(32px) saturate(180%)' : undefined,
        }}
      >
        {isPortfolioOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PortfolioPanel
              isOpen={isPortfolioOpen}
              onClose={() => setIsPortfolioOpen(false)}
              stocks={portfolioStocks}
              onRemoveStock={handleRemovePortfolioStock}
              onAddStockManual={handleManualAddStock}
            />
          </motion.div>


        )}
      </motion.div>

      {/* Floating FAQ Trigger Button (Icon + Text) */}
      {!isFaqOpen && (
        <motion.div
          key="collapsed-faq-trigger"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="hidden md:flex fixed top-3 right-0 z-[990] p-1.5 items-center justify-center rounded-l-xl border border-r-0 border-white/5 bg-[#12131a]/85 backdrop-blur-md shadow-2xl hover:bg-[#12131a] transition-all hover:scale-105 active:scale-95"
        >
          <button
            onClick={() => {
              setIsFaqOpen(true);
            }}
            className="h-8 px-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-slate-400 hover:text-white hover:bg-[#5B6BFF]/10 border border-transparent hover:border-[#5B6BFF]/25 hover:shadow-[0_0_12px_rgba(91,107,255,0.15)] cursor-pointer"
            title="Open FAQ Panel"
          >
            <HelpCircle className="w-4 h-4 text-[#5B6BFF]" />
            <span className="text-[11px] font-bold tracking-wide uppercase font-sans">FAQ</span>
          </button>
        </motion.div>
      )}


      </>
      )}
    </div>
  );
}
