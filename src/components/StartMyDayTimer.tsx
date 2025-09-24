import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { lifeSections } from '@/data/productivityData';
import { cn } from '@/lib/utils';

interface StartMyDayTimerProps {
  onComplete: () => void;
}

export const StartMyDayTimer = ({ onComplete }: StartMyDayTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [currentBlock, setCurrentBlock] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalBlocks = 6;
  const blockDuration = 5 * 60; // 5 minutes per block
  const progress = ((30 * 60 - timeLeft) / (30 * 60)) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          
          // Check if we've completed a block (every 5 minutes)
          const newBlock = Math.floor((30 * 60 - newTime) / blockDuration);
          if (newBlock > currentBlock) {
            setCurrentBlock(newBlock);
          }
          
          if (newTime === 0) {
            setIsRunning(false);
            setIsCompleted(true);
            onComplete();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentBlock, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(30 * 60);
    setCurrentBlock(0);
    setIsCompleted(false);
  };

  const getCurrentSection = () => {
    return lifeSections[Math.min(currentBlock, lifeSections.length - 1)];
  };

  if (isCompleted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Congratulations!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          You've completed your 30-minute life review session!
        </p>
        <div className="space-y-4">
          <Button onClick={reset} className="w-full">
            Start Another Session
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Timer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Start My Day</h2>
        <p className="text-muted-foreground mb-6">
          30 minutes across 6 life areas • 5 minutes each
        </p>
        
        <div className="text-6xl font-mono text-primary mb-4">
          {formatTime(timeLeft)}
        </div>
        
        <Progress value={progress} className="w-full mb-6 h-3" />
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
            className="px-8"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                {timeLeft === 30 * 60 ? 'Start' : 'Resume'}
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Current Block Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-center mb-4">Current Focus</h3>
        <div className="grid grid-cols-6 gap-2 mb-4">
          {lifeSections.map((section, index) => (
            <div
              key={section.id}
              className={cn(
                "p-3 rounded-lg text-center border-2 transition-all duration-300",
                index < currentBlock 
                  ? "bg-success/20 border-success text-success" 
                  : index === currentBlock && isRunning
                    ? "bg-primary/20 border-primary text-primary animate-pulse"
                    : "bg-muted/20 border-border text-muted-foreground"
              )}
            >
              <div className="text-2xl mb-1">{section.emoji}</div>
              <div className="text-xs font-medium">{section.title}</div>
            </div>
          ))}
        </div>
        
        {timeLeft < 30 * 60 && (
          <div className="text-center">
            <div className="text-2xl mb-2">{getCurrentSection().emoji}</div>
            <h4 className="text-xl font-semibold text-foreground">
              {getCurrentSection().title}
            </h4>
            <p className="text-sm text-muted-foreground mt-2">
              Reflect on: {getCurrentSection().goal}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};