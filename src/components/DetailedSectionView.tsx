import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Check, Lightbulb, Target, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailedSectionViewProps {
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
  isTimerMode?: boolean;
  timeRemaining?: string;
  onClose: () => void;
  onTaskComplete?: () => void;
}

export const DetailedSectionView = ({ 
  section, 
  isTimerMode = false, 
  timeRemaining,
  onClose,
  onTaskComplete 
}: DetailedSectionViewProps) => {
  const [notes, setNotes] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: section.currentTask, completed: false, priority: 'high' },
    { id: 2, text: 'Review progress from last week', completed: true, priority: 'medium' },
    { id: 3, text: 'Set specific measurable targets', completed: false, priority: 'low' }
  ]);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'chart-1': 'text-chart-1 border-chart-1/30 bg-chart-1/10',
      'chart-2': 'text-chart-2 border-chart-2/30 bg-chart-2/10',
      'chart-3': 'text-chart-3 border-chart-3/30 bg-chart-3/10',
      'chart-4': 'text-chart-4 border-chart-4/30 bg-chart-4/10',
      'chart-5': 'text-chart-5 border-chart-5/30 bg-chart-5/10',
      'success': 'text-success border-success/30 bg-success/10',
      'warning': 'text-warning border-warning/30 bg-warning/10',
      'accent': 'text-accent border-accent/30 bg-accent/10'
    };
    return colorMap[color] || 'text-primary border-primary/30 bg-primary/10';
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        priority: 'medium' 
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    if (onTaskComplete) onTaskComplete();
  };

  const getNewIdea = () => {
    setCurrentIdeaIndex((prev) => (prev + 1) % section.ideas.length);
  };

  const yesterdayCompletions = [
    'Completed morning workout routine',
    'Read 15 pages of industry book',
    'Had productive team meeting'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container h-full py-6">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{section.emoji}</span>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{section.title}</h1>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge variant="outline" className={getColorClass(section.color)}>
                    Level {section.level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-warning" />
                    <span className="font-bold text-warning">{section.points} pts</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🔥 {section.streak} day streak
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isTimerMode && timeRemaining && (
                <div className="text-center">
                  <div className="text-2xl font-mono text-primary">{timeRemaining}</div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                </div>
              )}
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="focus" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="focus">Focus</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="focus" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Goal & Current Focus */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Current Goal</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-4">{section.goal}</p>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Today's Priority:</label>
                        <p className="text-sm text-muted-foreground">{section.currentTask}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>AI Suggestions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-4">
                        {section.ideas[currentIdeaIndex]}
                      </p>
                      <Button variant="outline" size="sm" onClick={getNewIdea}>
                        Get New Suggestion
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Yesterday's Wins */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Yesterday's Accomplishments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {yesterdayCompletions.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-6">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Add a new task..." 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card key={task.id} className={cn(
                      "transition-all duration-200",
                      task.completed && "opacity-60"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant={task.completed ? "default" : "outline"}
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                              "min-w-[60px]",
                              task.completed && "bg-success hover:bg-success"
                            )}
                          >
                            {task.completed ? <Check className="w-4 h-4" /> : 'Do'}
                          </Button>
                          <span className={cn(
                            "flex-1",
                            task.completed && "line-through"
                          )}>
                            {task.text}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              task.priority === 'high' && 'border-red-500/30 text-red-500',
                              task.priority === 'medium' && 'border-yellow-500/30 text-yellow-500',
                              task.priority === 'low' && 'border-green-500/30 text-green-500'
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Tasks Completed</span>
                          <span>7/10</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Goal Progress</span>
                          <span>4/7 days</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '57%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Personal Notes & Reflections</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full">
                    <Textarea
                      placeholder="Write your thoughts, reflections, or plans here..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[300px] resize-none"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};