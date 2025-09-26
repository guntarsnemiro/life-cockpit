import { useState } from 'react';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { LifeSectionCard } from '@/components/LifeSectionCard';
import { StartMyDayTimer } from '@/components/StartMyDayTimer';
import { MoodCheckIn } from '@/components/MoodCheckIn';
import { DetailedSectionView } from '@/components/DetailedSectionView';
import { lifeSections } from '@/data/productivityData';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Trophy } from 'lucide-react';
const Index = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(lifeSections.reduce((sum, section) => sum + section.points, 0));
  const [selectedSection, setSelectedSection] = useState<typeof lifeSections[0] | null>(null);
  const handleTaskComplete = () => {
    setCompletedTasks(prev => prev + 1);
    setTotalPoints(prev => prev + 50);
  };
  const handleTimerComplete = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setShowTimer(false);
    }, 5000);
  };
  if (showTimer) {
    return <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <StartMyDayTimer onComplete={handleTimerComplete} onGoHome={() => setShowTimer(false)} />
          
          {showCelebration && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🎉</div>
                <h2 className="text-4xl font-bold text-foreground mb-4">Amazing Work!</h2>
                <p className="text-xl text-muted-foreground">
                  You've completed your daily life review session!
                </p>
              </div>
            </div>}
        </div>
      </div>;
  }
  return <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Stats */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Productivity Stopwatch</h1>
            <p className="text-muted-foreground">
              Your complete life management system
            </p>
          </div>
          <div className="flex space-x-6 text-right">
            <div>
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                Total Points
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{completedTasks}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Tasks Today
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <MotivationalQuote />

        {/* Start My Day Button */}
        <div className="mb-8 text-center">
          <Button size="lg" onClick={() => setShowTimer(true)} className="px-12 py-6 text-lg gradient-primary border-0 hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 mr-3" />
            Start My Day (30 min)
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            30-minute focused session across all life areas
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Life Section Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lifeSections.map(section => <LifeSectionCard key={section.id} section={section} onTaskComplete={handleTaskComplete} onSectionClick={() => setSelectedSection(section)} />)}
            </div>
          </div>

          {/* Sidebar with Mood Check-in */}
          <div className="lg:col-span-1">
            <MoodCheckIn />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            "The secret to getting ahead is getting started." - Mark Twain
          </p>
        </div>

        {/* Detailed Section View */}
        {selectedSection && <DetailedSectionView section={selectedSection} onClose={() => setSelectedSection(null)} onTaskComplete={handleTaskComplete} />}
      </div>
    </div>;
};
export default Index;