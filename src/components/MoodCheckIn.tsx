import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { moodEmojis } from '@/data/productivityData';
import { Heart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [moodHistory] = useState([3, 4, 2, 4, 5, 3, 4]); // Last 7 days mock data

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getMoodTrend = () => {
    const recent = moodHistory.slice(-3);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    return avg >= 3.5 ? 'positive' : avg >= 2.5 ? 'neutral' : 'negative';
  };

  const trend = getMoodTrend();

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-accent" />
        <h3 className="text-xl font-bold text-foreground">Mood Check-in</h3>
        <TrendingUp className={cn(
          "w-5 h-5",
          trend === 'positive' ? 'text-success' : 
          trend === 'neutral' ? 'text-warning' : 'text-destructive'
        )} />
      </div>

      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">
            {moodEmojis.find(m => m.value === selectedMood)?.emoji}
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">Thanks for sharing!</p>
          <p className="text-muted-foreground">Your mood has been recorded.</p>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground mb-4">How are you feeling today?</p>
          
          <div className="grid grid-cols-5 gap-2 mb-6">
            {moodEmojis.map((mood) => (
              <Button
                key={mood.value}
                variant="ghost"
                size="lg"
                onClick={() => handleMoodSelect(mood.value)}
                className={cn(
                  "h-16 flex-col space-y-1 hover:scale-105 transition-transform",
                  selectedMood === mood.value && "bg-primary/20 border-2 border-primary"
                )}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-muted-foreground">{mood.label}</span>
              </Button>
            ))}
          </div>
        </>
      )}

      {/* Mood History */}
      <div className="border-t border-border pt-4">
        <p className="text-sm text-muted-foreground mb-3">Last 7 days</p>
        <div className="flex items-end space-x-1">
          {moodHistory.map((mood, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={cn(
                  "w-full rounded-t bg-gradient-to-t transition-all duration-300",
                  mood >= 4 ? "from-success/30 to-success" :
                  mood >= 3 ? "from-warning/30 to-warning" :
                  "from-destructive/30 to-destructive"
                )}
                style={{ height: `${mood * 12}px` }}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {index === 6 ? 'Today' : `${7-index}d ago`}
              </div>
            </div>
          ))}
        </div>
        <p className={cn(
          "text-center text-sm mt-3 font-medium",
          trend === 'positive' ? 'text-success' : 
          trend === 'neutral' ? 'text-warning' : 'text-destructive'
        )}>
          {trend === 'positive' ? '📈 Great trend!' : 
           trend === 'neutral' ? '➡️ Steady mood' : '📉 Hang in there'}
        </p>
      </div>
    </div>
  );
};