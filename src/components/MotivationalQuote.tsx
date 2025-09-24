import { useState } from 'react';
import { motivationalQuotes } from '@/data/productivityData';
import { Sparkles } from 'lucide-react';

export const MotivationalQuote = () => {
  const [quoteIndex] = useState(() => Math.floor(Math.random() * motivationalQuotes.length));
  const quote = motivationalQuotes[quoteIndex];

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      <div className="relative z-10">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
        <blockquote className="text-xl font-medium text-foreground leading-relaxed">
          "{quote}"
        </blockquote>
        <p className="text-sm text-muted-foreground mt-3">Daily Motivation</p>
      </div>
    </div>
  );
};