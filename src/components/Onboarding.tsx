import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Sun, Moon } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
}

export default function Onboarding({ onComplete, theme = 'dark', setTheme }: OnboardingProps) {
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [riskTolerance, setRiskTolerance] = useState<UserProfile['riskTolerance']>('Moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState<UserProfile['investmentHorizon']>('Short-Term');
  const [step, setStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 0) {
      if (loginMethod === 'otp') {
        if (!phone.trim()) return;
        if (!otpSent) {
          setOtpSent(true);
          return;
        }
        if (!otp.trim()) return;
      } else {
        if (!phone.trim() || !password.trim()) return;
      }
      setStep(1);
    } else {
      if (!name.trim()) return;
      onComplete({
        name: name.trim(),
        riskTolerance,
        investmentHorizon,
        targetUpside: '30%+',
        preferredSectors: ['Technology', 'FMCG'],
        hasSetPreferences: true
      });
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans select-none w-full overflow-hidden relative bg-halo-bg text-halo-on-surface">

      {/* Background is clean and solid as requested */}


      {/* Left Half: Aesthetic Container displaying the Brand Mark */}
      <div className="flex-1 min-h-[28vh] sm:min-h-[40vh] md:min-h-screen relative flex items-center justify-center z-10 bg-transparent mb-[-33px] md:mb-0">
        
        {/* Sharp High-End Brand Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-25 select-none cursor-default group flex flex-col items-center justify-center p-4 sm:p-8 active:scale-[0.98] transition-transform duration-300 animate-float"
        >
          {/* Ambient premium horizontal glow reproducing the welcome screen with radial gradient */}
          <motion.div 
            className="absolute w-[360px] sm:w-[600px] md:w-[780px] h-[180px] sm:h-[280px] md:h-[360px] pointer-events-none z-0 filter blur-[65px] md:blur-[95px] rounded-[50%]" 
            style={{
              background: isLight 
                ? 'radial-gradient(circle, rgba(223, 89, 180, 0.75) 0%, rgba(223, 89, 180, 0.45) 30%, rgba(223, 89, 180, 0.15) 55%, rgba(223, 89, 180, 0) 75%)'
                : 'radial-gradient(circle at center, rgba(91, 107, 255, 0.44) 0%, rgba(91, 107, 255, 0) 70%), radial-gradient(circle at 75% 75%, rgba(223, 89, 180, 0.11) 0%, rgba(223, 89, 180, 0) 45%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1.03, 1.07, 0.97, 1.05, 1.03],
            }}
            transition={{
              rotate: {
                duration: 22,
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



          <img 
            src="https://i.ibb.co/PGxQw859/Mask-group-2.png" 
            alt="WayaX Logo Large" 
            className="w-18 h-18 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-3 sm:mb-5 object-contain animate-logo-pulse opacity-95 drop-shadow-[0_10px_30px_rgba(91,107,255,0.2)] filter brightness-[1.02] contrast-[1.02] transition-transform duration-1000 ease-out group-hover:scale-[1.02] mix-blend-normal relative z-10"
            referrerPolicy="no-referrer"
          />
          <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-[20px] sm:text-[31px] font-bold tracking-tight mt-2 sm:mt-3 relative z-10 text-halo-on-surface">
            WayaX
          </p>
          <div className="text-[10px] sm:text-[11px] font-sans text-center leading-relaxed mt-4 animate-fade-in text-halo-on-surface-muted" style={{ animationDelay: '0.6s' }}>
            SEBI-compliant AI research assistant<br />
            RA: INH000010876
          </div>
        </motion.div>
      </div>

      {/* Right Half: Interactive Onboarding Panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-12 md:p-16 relative bg-transparent z-10 mt-[-20px] md:mt-0">
        {/* Subtle background aura on the right pane */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-halo-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-sm relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            id="onboarding-card"
            className="w-full bg-white/[0.06] border border-white/10 rounded-2xl p-4.5 sm:p-8 relative z-10 shadow-2xl backdrop-blur-3xl transition-all duration-300"
          >
            {step === 0 ? (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-halo-on-surface font-sans">
                    Get Started
                  </h2>
                  <p className="text-xs md:text-sm text-halo-on-surface-muted">
                    Access your personalized advisory.
                  </p>
                  <p className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-halo-primary">
                    Sign in with Waya Account
                  </p>
                </div>
 
                <div className="space-y-2.5 md:space-y-3">
                  <div className="relative">
                    <input
                      autoFocus
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full halo-input px-3.5 md:px-4 py-2.5 md:py-3.5 text-[16px] md:text-sm transition-all focus:outline-none"
                    />
                  </div>
                  {loginMethod === 'password' && (
                    <div className="relative">
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full halo-input px-3.5 md:px-4 py-2.5 md:py-3.5 text-[16px] md:text-sm transition-all focus:outline-none"
                      />
                    </div>
                  )}
                  {loginMethod === 'otp' && otpSent && (
                    <div className="relative">
                      <input
                        autoFocus
                        required
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full halo-input px-3.5 md:px-4 py-2.5 md:py-3.5 text-[16px] md:text-sm transition-all focus:outline-none"
                      />
                    </div>
                  )}
                </div>
 
                <div className="flex flex-col gap-2.5 md:gap-3">
                  <button
                    type="submit"
                    disabled={loginMethod === 'otp' ? (!phone.trim() || (otpSent && !otp.trim())) : (!phone.trim() || !password.trim())}
                    className="w-full halo-btn-primary py-2.5 md:py-3.5 text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg animate-smooth-reveal"
                  >
                    {loginMethod === 'otp' ? (otpSent ? 'Verify OTP & Continue' : 'Send OTP') : 'Continue with Waya account'}
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod(loginMethod === 'otp' ? 'password' : 'otp');
                      setOtpSent(false);
                      setOtp('');
                    }}
                    className="text-[11px] md:text-xs text-center transition-colors cursor-pointer block w-full text-halo-on-surface-muted hover:text-halo-on-surface"
                  >
                    {loginMethod === 'otp' ? 'Sign in with Password instead' : 'Sign in with OTP instead'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (phone.trim() && (loginMethod === 'otp' ? (otpSent && otp.trim()) : password.trim())) setStep(1);
                    }}
                    disabled={loginMethod === 'otp' ? (!phone.trim() || (otpSent && !otp.trim())) : (!phone.trim() || !password.trim())}
                    className="w-full halo-btn-secondary py-2.5 md:py-3.5 text-xs md:text-sm font-semibold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shadow-lg"
                  >
                    Register
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h2 id="onboarding-title" className="text-xl md:text-2xl font-bold tracking-tight text-halo-on-surface font-sans">
                    What should I call you?
                  </h2>
                  <p className="text-xs md:text-sm text-halo-on-surface-muted">
                    This helps me personalize your investment experience.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      autoFocus
                      required
                      id="onboarding-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full halo-input px-3.5 md:px-4 py-2.5 md:py-3.5 text-[16px] md:text-sm transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  id="onboarding-continue-button"
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full halo-btn-primary py-2.5 md:py-3.5 text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  Access Dashboard
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </button>
              </form>
            )}
          </motion.div>
          {step > 0 && (
            <div className="mt-4 md:mt-6 text-center">
              <button 
                type="button" 
                onClick={() => setStep(step - 1)} 
                className="text-[11px] md:text-xs transition-colors cursor-pointer text-halo-on-surface-muted hover:text-halo-on-surface"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
