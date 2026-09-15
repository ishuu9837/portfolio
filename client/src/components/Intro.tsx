import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sequences = [
  { text: "HELLO", lang: "en" },
  { text: "NAMASTE", lang: "en" },
  { text: "నమస్తే", lang: "te" },
  { text: "Y ESWAR", lang: "en" },
  { text: "నేను ఈశ్వర్", lang: "te" },
  { text: "Data Scientist / AI / Builder / Designer", lang: "en", sub: true }
];

export const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < sequences.length) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, index === sequences.length - 1 ? 1500 : 800);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [index, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F0E8] dark:bg-[#121212]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center px-6"
        >
          <h2 className={`text-4xl md:text-6xl font-display text-[#24211E] dark:text-[#F4F0E8] ${sequences[index]?.sub ? 'text-2xl md:text-4xl font-sans uppercase tracking-widest' : ''}`}>
            {sequences[index]?.text}
          </h2>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={onComplete}
        className="absolute bottom-12 text-[10px] tracking-[0.2em] text-[#B74E35] uppercase font-sans hover:opacity-70 transition-opacity"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
};
