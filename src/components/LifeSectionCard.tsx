import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, CheckSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LifeSectionCardProps {
  section: {
    id: string;
    title: string;
    emoji: string;
    color: string;
    goal: string;
    currentTask: string;
    level: number;
    streak: number;
    points: number;
    ideas: string[];
  };
  onTaskComplete: () => void;
}

export const LifeSectionCard = ({ section, onTaskComplete }: LifeSectionCardProps) => {
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const getNewIdea = () => {
    setCurrentIdeaIndex((prev) => (prev + 1) % section.ideas.length);
  };

  const completeTask = () => {
    setIsTaskCompleted(true);
    onTaskComplete();
    setTimeout(() => setIsTaskCompleted(false), 2000);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'chart-1': 'text-chart-1 border-chart-1/30',
      'chart-2': 'text-chart-2 border-chart-2/30',
      'chart-3': 'text-chart-3 border-chart-3/30',
      'chart-4': 'text-chart-4 border-chart-4/30',
      'chart-5': 'text-chart-5 border-chart-5/30',
      'success': 'text-success border-success/30',
      'warning': 'text-warning border-warning/30',
      'accent': 'text-accent border-accent/30'
    };
    return colorMap[color] || 'text-primary border-primary/30';
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
      isTaskCompleted && "animate-pulse"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card/80"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{section.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
              <Badge variant="outline" className={getColorClass(section.color)}>
                Level {section.level}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Streak</div>
            <div className="text-2xl font-bold text-primary">{section.streak}</div>
          </div>
        </div>

        {/* Goal */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground uppercase tracking-wide">Goal</span>
          </div>
          <p className="text-foreground font-medium">{section.goal}</p>
        </div>

        {/* Current Task */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground uppercase tracking-wide">Today's Challenge</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-foreground">{section.currentTask}</p>
            <Button 
              size="sm" 
              onClick={completeTask}
              disabled={isTaskCompleted}
              className={cn(
                "ml-2",
                isTaskCompleted && "bg-success hover:bg-success"
              )}
            >
              {isTaskCompleted ? '✓' : 'Done'}
            </Button>
          </div>
        </div>

        {/* Daily Idea */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground uppercase tracking-wide">Daily Idea</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground flex-1 mr-2">
              {section.ideas[currentIdeaIndex]}
            </p>
            <Button variant="outline" size="sm" onClick={getNewIdea}>
              New Idea
            </Button>
          </div>
        </div>

        {/* Points */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-muted-foreground">Points:</span>
            <span className="font-bold text-warning">{section.points}</span>
          </div>
        </div>
      </div>
    </div>
  );
};