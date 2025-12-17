import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { lifeSections } from '@/data/productivityData';
import { Target, RotateCcw } from 'lucide-react';

interface WheelRating {
  area: string;
  fullMark: number;
  rating: number;
  color: string;
}

export const WheelOfLife = () => {
  const initialRatings: WheelRating[] = lifeSections.map(section => ({
    area: section.title.split(' ')[0], // Shortened name for radar chart
    fullMark: 10,
    rating: 5,
    color: section.color
  }));

  const [ratings, setRatings] = useState<WheelRating[]>(initialRatings);
  const [showSliders, setShowSliders] = useState(false);

  const updateRating = (index: number, value: number) => {
    setRatings(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rating: value };
      return updated;
    });
  };

  const resetRatings = () => {
    setRatings(initialRatings.map(r => ({ ...r, rating: 5 })));
  };

  const averageScore = (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1);
  
  const getBalanceStatus = () => {
    const avg = parseFloat(averageScore);
    const variance = ratings.reduce((sum, r) => sum + Math.pow(r.rating - avg, 2), 0) / ratings.length;
    const stdDev = Math.sqrt(variance);
    
    if (stdDev < 1) return { text: 'Well Balanced', color: 'text-success' };
    if (stdDev < 2) return { text: 'Slightly Imbalanced', color: 'text-warning' };
    return { text: 'Needs Attention', color: 'text-destructive' };
  };

  const balance = getBalanceStatus();

  // Find lowest and highest areas
  const sortedRatings = [...ratings].sort((a, b) => a.rating - b.rating);
  const lowestArea = sortedRatings[0];
  const highestArea = sortedRatings[sortedRatings.length - 1];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Wheel of Life</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSliders(!showSliders)}
            >
              {showSliders ? 'Hide' : 'Edit'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetRatings}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Rate your satisfaction (0-10) in each life area
        </p>
      </CardHeader>
      <CardContent>
        {/* Radar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={ratings} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.5}
              />
              <PolarAngleAxis 
                dataKey="area" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Life Balance"
                dataKey="rating"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
          <div className="text-center p-2 bg-secondary/30 rounded-lg">
            <div className="text-xl font-bold text-primary">{averageScore}</div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          <div className="text-center p-2 bg-secondary/30 rounded-lg">
            <div className={`text-sm font-semibold ${balance.color}`}>{balance.text}</div>
            <div className="text-xs text-muted-foreground">Status</div>
          </div>
          <div className="text-center p-2 bg-secondary/30 rounded-lg">
            <div className="text-sm font-semibold text-destructive">{lowestArea.area}</div>
            <div className="text-xs text-muted-foreground">Focus Area</div>
          </div>
        </div>

        {/* Sliders for Rating */}
        {showSliders && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            {lifeSections.map((section, index) => (
              <div key={section.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <span>{section.emoji}</span>
                    <span>{section.title}</span>
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {ratings[index].rating}
                  </span>
                </div>
                <Slider
                  value={[ratings[index].rating]}
                  onValueChange={(value) => updateRating(index, value[0])}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

        {/* Insights */}
        <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Insight:</span> Your strongest area is{' '}
            <span className="text-success font-medium">{highestArea.area}</span> ({highestArea.rating}/10). 
            Consider focusing on <span className="text-warning font-medium">{lowestArea.area}</span> ({lowestArea.rating}/10) 
            to improve overall life balance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
