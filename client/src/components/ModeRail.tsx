import { usePortfolio } from '@/contexts/PortfolioContext';
import { motion } from 'framer-motion';

export const ModeRail = () => {
  const { theme, language, toggleTheme, setLanguage } = usePortfolio();

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-12 mix-blend-difference">
      <div className="flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.2em] text-[#B74E35] uppercase rotate-180 [writing-mode:vertical-lr]">MODE</span>
        <div className="w-[1px] h-12 bg-[#B74E35]/30" />
        <button 
          onClick={toggleTheme}
          className="relative w-6 h-12 rounded-full border border-[#B74E35]/30 p-1 flex flex-col justify-between"
        >
          <motion.div 
            animate={{ y: theme === 'light' ? 0 : 20 }}
            className="w-4 h-4 rounded-full bg-[#B74E35]"
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.2em] text-[#B74E35] uppercase rotate-180 [writing-mode:vertical-lr]">LANG</span>
        <div className="w-[1px] h-12 bg-[#B74E35]/30" />
        <div className="flex flex-col gap-2 font-sans text-[10px] font-bold">
          <button 
            onClick={() => setLanguage('en')}
            className={`${language === 'en' ? 'text-[#B74E35]' : 'text-[#B74E35]/40'} transition-colors`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('te')}
            className={`${language === 'te' ? 'text-[#B74E35]' : 'text-[#B74E35]/40'} transition-colors`}
          >
            తెలుగు
          </button>
        </div>
      </div>
    </div>
  );
};
