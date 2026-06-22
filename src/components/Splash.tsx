import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
  theme?: 'dark' | 'light';
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const words = ["Equity", "FnO", "McX", "PMS", "X"];
const intervals = [450, 400, 350, 350, 1000]; 

export default function Splash({ onComplete, theme = 'dark', isMuted, setIsMuted }: SplashProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    if (!isPlaying) return;

    if (index < words.length - 1) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, intervals[index]);
      return () => clearTimeout(timer);
    } else {
      // Last word (X.ai) - auto-completes and fades out after delay
      const timer = setTimeout(() => {
        setIsFinishing(true);
      }, intervals[index]);
      return () => clearTimeout(timer);
    }
  }, [index, isPlaying]);

  useEffect(() => {
    if (isFinishing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 600); // match fade-out dur
      return () => clearTimeout(timer);
    }
  }, [isFinishing, onComplete]);

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-halo-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Cinematic electric indigo radial wash breathing behind the logo */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[700px] md:w-[880px] h-[220px] sm:h-[360px] md:h-[440px] pointer-events-none z-0 filter blur-[80px] sm:blur-[115px] md:blur-[140px] rounded-[50%]" 
            style={{
              background: isLight 
                ? 'radial-gradient(circle, rgba(223, 89, 180, 0.45) 0%, rgba(223, 89, 180, 0.25) 30%, rgba(223, 89, 180, 0.1) 55%, rgba(223, 89, 180, 0) 75%)' 
                : 'radial-gradient(circle at center, rgba(91, 107, 255, 0.32) 0%, rgba(91, 107, 255, 0) 70%), radial-gradient(circle at 75% 75%, rgba(223, 89, 180, 0.11) 0%, rgba(223, 89, 180, 0) 45%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1.02, 1.06, 0.98, 1.04, 1.02],
            }}
            transition={{
              rotate: {
                duration: 26,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
              }
            }}
          />

          {/* Premium Animated Suffix Title */}
          <div 
            className="w-full flex items-center select-none z-10 mt-8 sm:mt-12"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Left half ending exactly at the center of the viewport */}
            <div className="w-[50vw] flex justify-end pr-0.5 sm:pr-1">
              <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-right text-halo-on-surface">
                Waya
              </span>
            </div>

             {/* Right half starting exactly at the center of the viewport */}
            <div className="w-[50vw] flex justify-start pl-0">
              <div 
                className="relative w-full overflow-visible flex items-center h-16 sm:h-20 md:h-24"
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                    transition={{ 
                      duration: 0.35, 
                      ease: [0.2, 0.6, 0.2, 1] 
                    }}
                    className={`absolute left-0 text-4xl sm:text-5xl md:text-6xl flex items-center whitespace-nowrap font-black ${
                      index === words.length - 1 
                        ? '' 
                        : 'text-halo-on-surface-muted font-bold'
                    }`}
                    style={index === words.length - 1 ? {
                      background: 'linear-gradient(135deg, #5B6BFF 0%, #8B5CF6 35%, #C172F1 60%, #F0509E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } : {}}
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Premium Controller Panel in the Bottom Right */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 rounded-full border border-halo-border bg-halo-surface shadow-2xl backdrop-blur-md select-none text-halo-on-surface"
          >
            {/* Play / Pause Micro Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-halo-border-strong bg-halo-elevated text-halo-on-surface hover:border-halo-primary hover:bg-halo-elevated"
              title={isPlaying ? "Pause timeline" : "Resume timeline"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current text-halo-on-surface" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current text-halo-on-surface ml-0.5" />
              )}
            </button>

            {/* Music Mute / Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-halo-border-strong bg-halo-elevated text-halo-on-surface hover:border-halo-primary hover:bg-halo-elevated"
              title={isMuted ? "Unmute music" : "Mute music"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-halo-on-surface-muted" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-halo-on-surface" />
              )}
            </button>

            {/* Timeline expanded track - only opens up when paused */}
            <AnimatePresence initial={false}>
              {!isPlaying && (
                <motion.div
                  initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                  animate={{ width: 'auto', opacity: 1, marginLeft: 4 }}
                  exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-center gap-2 overflow-hidden px-1"
                >
                  <div className="h-1 w-24 bg-halo-border rounded-full relative">
                    <input
                      type="range"
                      min={0}
                      max={words.length - 1}
                      value={index}
                      onChange={(e) => {
                        setIndex(parseInt(e.target.value, 10));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="h-full rounded-full transition-all duration-150"
                      style={{ 
                        width: `${(index / (words.length - 1)) * 100}%`,
                        backgroundColor: 'var(--color-halo-primary)'
                      }}
                    />
                    <div 
                      className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md border border-halo-primary -translate-y-1/2 pointer-events-none"
                      style={{ left: `calc(${(index / (words.length - 1)) * 100}% - 5px)` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider ml-1 w-6 text-halo-on-surface-muted">
                    {index + 1}/{words.length}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Skip button */}
            <button
              onClick={() => setIsFinishing(true)}
              className="h-8 px-3 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer border border-halo-border-strong bg-halo-elevated text-halo-on-surface-muted hover:text-halo-on-surface hover:border-halo-primary"
              title="Skip intro animation"
            >
              Skip
              <SkipForward className="w-2.5 h-2.5 ml-1" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
