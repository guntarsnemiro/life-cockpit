import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Check, Lightbulb, Target, Calendar, Zap, BarChart3, TrendingUp, DollarSign, Activity, Edit2, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from 'recharts';
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
  const [newGoal, setNewGoal] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [expandedGoals, setExpandedGoals] = useState<number[]>([1]);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [goals, setGoals] = useState([
    {
      id: 1,
      text: section.goal,
      isMainGoal: true,
      priority: 'high',
      subGoals: [
        {
          id: 11,
          text: 'Establish consistent daily routine',
          priority: 'high',
          tasks: [
            { id: 111, text: section.currentTask, completed: false, priority: 'high' },
            { id: 112, text: 'Track progress weekly', completed: false, priority: 'medium' }
          ]
        },
        {
          id: 12,
          text: 'Set measurable targets',
          priority: 'medium',
          tasks: [
            { id: 121, text: 'Define specific metrics', completed: true, priority: 'high' },
            { id: 122, text: 'Create milestone timeline', completed: false, priority: 'low' }
          ]
        }
      ]
    }
  ]);

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

  const addSubGoal = (parentGoalId: number) => {
    if (newGoal.trim()) {
      setGoals(goals.map(goal => 
        goal.id === parentGoalId 
          ? {
              ...goal,
              subGoals: [...goal.subGoals, {
                id: Date.now(),
                text: newGoal,
                priority: 'medium',
                tasks: []
              }]
            }
          : goal
      ));
      setNewGoal('');
    }
  };

  const addTask = (goalId: number, subGoalId: number) => {
    if (newTask.trim()) {
      setGoals(goals.map(goal => 
        goal.id === goalId 
          ? {
              ...goal,
              subGoals: goal.subGoals.map(subGoal =>
                subGoal.id === subGoalId
                  ? {
                      ...subGoal,
                      tasks: [...subGoal.tasks, {
                        id: Date.now(),
                        text: newTask,
                        completed: false,
                        priority: 'medium'
                      }]
                    }
                  : subGoal
              )
            }
          : goal
      ));
      setNewTask('');
    }
  };

  const toggleTask = (goalId: number, subGoalId: number, taskId: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            subGoals: goal.subGoals.map(subGoal =>
              subGoal.id === subGoalId
                ? {
                    ...subGoal,
                    tasks: subGoal.tasks.map(task =>
                      task.id === taskId ? { ...task, completed: !task.completed } : task
                    )
                  }
                : subGoal
            )
          }
        : goal
    ));
    if (onTaskComplete) onTaskComplete();
  };

  const toggleGoalExpansion = (goalId: number) => {
    setExpandedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const updatePriority = (goalId: number, subGoalId: number, taskId: number, priority: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            subGoals: goal.subGoals.map(subGoal =>
              subGoal.id === subGoalId
                ? {
                    ...subGoal,
                    tasks: subGoal.tasks.map(task =>
                      task.id === taskId ? { ...task, priority } : task
                    )
                  }
                : subGoal
            )
          }
        : goal
    ));
  };

  const getNewIdea = () => {
    setCurrentIdeaIndex((prev) => (prev + 1) % section.ideas.length);
  };

  const getDashboardData = () => {
    switch (section.id) {
      case 'health-fitness':
        return {
          weeklyWorkouts: [
            { day: 'Mon', workouts: 1, calories: 450 },
            { day: 'Tue', workouts: 0, calories: 0 },
            { day: 'Wed', workouts: 1, calories: 380 },
            { day: 'Thu', workouts: 1, calories: 520 },
            { day: 'Fri', workouts: 0, calories: 0 },
            { day: 'Sat', workouts: 2, calories: 680 },
            { day: 'Sun', workouts: 1, calories: 400 }
          ],
          healthMetrics: [
            { metric: 'Sleep', value: 85, color: 'hsl(var(--chart-1))' },
            { metric: 'Energy', value: 78, color: 'hsl(var(--chart-2))' },
            { metric: 'Nutrition', value: 92, color: 'hsl(var(--chart-3))' },
            { metric: 'Fitness', value: 73, color: 'hsl(var(--chart-4))' }
          ],
          weightTrend: [
            { month: 'Jan', weight: 75 },
            { month: 'Feb', weight: 74.5 },
            { month: 'Mar', weight: 74 },
            { month: 'Apr', weight: 73.8 },
            { month: 'May', weight: 73.5 },
            { month: 'Jun', weight: 73.2 }
          ]
        };
      
      case 'family-relationships':
        return {
          socialInteractions: [
            { week: 'W1', family: 8, friends: 5, partner: 14 },
            { week: 'W2', family: 6, friends: 7, partner: 12 },
            { week: 'W3', family: 10, friends: 4, partner: 16 },
            { week: 'W4', family: 7, friends: 8, partner: 13 }
          ],
          relationshipHealth: [
            { relationship: 'Partner', satisfaction: 88, color: 'hsl(var(--chart-1))' },
            { relationship: 'Family', satisfaction: 82, color: 'hsl(var(--chart-2))' },
            { relationship: 'Friends', satisfaction: 75, color: 'hsl(var(--chart-3))' },
            { relationship: 'Social', satisfaction: 70, color: 'hsl(var(--chart-4))' }
          ],
          qualityTime: [
            { activity: 'Date Nights', hours: 8 },
            { activity: 'Family Time', hours: 12 },
            { activity: 'Friend Meetups', hours: 6 },
            { activity: 'Social Events', hours: 4 }
          ]
        };
      
      case 'finances':
        return {
          netWorth: [
            { month: 'Jan', assets: 85000, liabilities: 25000, netWorth: 60000 },
            { month: 'Feb', assets: 87500, liabilities: 24500, netWorth: 63000 },
            { month: 'Mar', assets: 89200, liabilities: 24000, netWorth: 65200 },
            { month: 'Apr', assets: 91800, liabilities: 23500, netWorth: 68300 },
            { month: 'May', assets: 94500, liabilities: 23000, netWorth: 71500 },
            { month: 'Jun', assets: 97200, liabilities: 22500, netWorth: 74700 }
          ],
          incomeStreams: [
            { source: 'Salary', amount: 6500, color: 'hsl(var(--chart-1))' },
            { source: 'Investments', amount: 850, color: 'hsl(var(--chart-2))' },
            { source: 'Side Business', amount: 1200, color: 'hsl(var(--chart-3))' },
            { source: 'Rental Income', amount: 800, color: 'hsl(var(--chart-4))' }
          ],
          investmentPortfolio: [
            { category: 'Stocks', value: 45000, color: 'hsl(var(--chart-1))' },
            { category: 'Bonds', value: 15000, color: 'hsl(var(--chart-2))' },
            { category: 'Real Estate', value: 25000, color: 'hsl(var(--chart-3))' },
            { category: 'Crypto', value: 8000, color: 'hsl(var(--chart-4))' },
            { category: 'Cash', value: 12000, color: 'hsl(var(--chart-5))' }
          ]
        };
      
      case 'work-career':
        return {
          skillProgress: [
            { skill: 'Leadership', current: 85, target: 90, color: 'hsl(var(--chart-1))' },
            { skill: 'Technical', current: 78, target: 85, color: 'hsl(var(--chart-2))' },
            { skill: 'Communication', current: 82, target: 88, color: 'hsl(var(--chart-3))' },
            { skill: 'Strategy', current: 75, target: 82, color: 'hsl(var(--chart-4))' }
          ],
          performanceMetrics: [
            { month: 'Jan', productivity: 78, satisfaction: 75, growth: 70 },
            { month: 'Feb', productivity: 82, satisfaction: 78, growth: 75 },
            { month: 'Mar', productivity: 85, satisfaction: 80, growth: 78 },
            { month: 'Apr', productivity: 88, satisfaction: 82, growth: 82 },
            { month: 'May', productivity: 90, satisfaction: 85, growth: 85 },
            { month: 'Jun', productivity: 92, satisfaction: 87, growth: 88 }
          ],
          networkingActivities: [
            { activity: 'Conferences', count: 3 },
            { activity: 'Meetings', count: 12 },
            { activity: 'Workshops', count: 5 },
            { activity: 'Online Events', count: 8 }
          ]
        };
      
      case 'personal-growth':
        return {
          learningProgress: [
            { week: 'W1', books: 2, courses: 1, podcasts: 5, articles: 8 },
            { week: 'W2', books: 1.5, courses: 2, podcasts: 7, articles: 12 },
            { week: 'W3', books: 2.5, courses: 1, podcasts: 6, articles: 10 },
            { week: 'W4', books: 3, courses: 1.5, podcasts: 8, articles: 15 }
          ],
          skillAcquisition: [
            { skill: 'Mindfulness', level: 75, color: 'hsl(var(--chart-1))' },
            { skill: 'Languages', level: 60, color: 'hsl(var(--chart-2))' },
            { skill: 'Creativity', level: 85, color: 'hsl(var(--chart-3))' },
            { skill: 'Critical Thinking', level: 78, color: 'hsl(var(--chart-4))' }
          ],
          habitTracking: [
            { habit: 'Meditation', streak: 45 },
            { habit: 'Reading', streak: 32 },
            { habit: 'Journaling', streak: 28 },
            { habit: 'Learning', streak: 38 }
          ]
        };
      
      case 'leisure-lifestyle':
        return {
          hobbyTime: [
            { month: 'Jan', creative: 12, sports: 8, travel: 4, social: 16 },
            { month: 'Feb', creative: 15, sports: 6, travel: 0, social: 18 },
            { month: 'Mar', creative: 18, sports: 10, travel: 8, social: 14 },
            { month: 'Apr', creative: 16, sports: 12, travel: 12, social: 20 },
            { month: 'May', creative: 20, sports: 14, travel: 16, social: 22 },
            { month: 'Jun', creative: 22, sports: 16, travel: 20, social: 18 }
          ],
          experienceTypes: [
            { type: 'Cultural', count: 8, color: 'hsl(var(--chart-1))' },
            { type: 'Adventure', count: 5, color: 'hsl(var(--chart-2))' },
            { type: 'Relaxation', count: 12, color: 'hsl(var(--chart-3))' },
            { type: 'Social', count: 15, color: 'hsl(var(--chart-4))' }
          ],
          satisfactionLevels: [
            { area: 'Hobbies', satisfaction: 88 },
            { area: 'Travel', satisfaction: 82 },
            { area: 'Entertainment', satisfaction: 75 },
            { area: 'Rest & Recovery', satisfaction: 85 }
          ]
        };
      
      default:
        return null;
    }
  };

  const dashboardData = getDashboardData();

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
                  <div className="text-sm text-muted-foreground">Section Time Left</div>
                </div>
              )}
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="goals" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="goals" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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

                  {/* Yesterday's Wins */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Yesterday's Wins</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {yesterdayCompletions.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-xs">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Quick Add */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Quick Add</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="New sub-goal..."
                          value={newGoal}
                          onChange={(e) => setNewGoal(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSubGoal(goals[0]?.id)}
                        />
                        <Button size="sm" onClick={() => addSubGoal(goals[0]?.id)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Goals Hierarchy */}
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleGoalExpansion(goal.id)}
                            >
                              {expandedGoals.includes(goal.id) ? 
                                <ChevronDown className="w-4 h-4" /> : 
                                <ChevronRight className="w-4 h-4" />
                              }
                            </Button>
                            <Target className="w-5 h-5 text-primary" />
                            <div>
                              <h3 className="font-semibold text-foreground">{goal.text}</h3>
                              <Badge variant="outline" className={`mt-1 ${
                                goal.priority === 'high' ? 'border-red-500 text-red-500' :
                                goal.priority === 'medium' ? 'border-yellow-500 text-yellow-500' :
                                'border-green-500 text-green-500'
                              }`}>
                                {goal.priority} priority
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      {expandedGoals.includes(goal.id) && (
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            {goal.subGoals.map((subGoal) => (
                              <div key={subGoal.id} className="border-l-2 border-muted pl-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span className="font-medium text-sm">{subGoal.text}</span>
                                    <Badge variant="secondary">
                                      {subGoal.priority}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Tasks for this sub-goal */}
                                <div className="space-y-2 ml-4">
                                  {subGoal.tasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                                      <div className="flex items-center space-x-3">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => toggleTask(goal.id, subGoal.id, task.id)}
                                          className={task.completed ? "text-success" : ""}
                                        >
                                          <Check className={`w-4 h-4 ${task.completed ? "opacity-100" : "opacity-30"}`} />
                                        </Button>
                                        <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                          {task.text}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Select
                                          value={task.priority}
                                          onValueChange={(value) => updatePriority(goal.id, subGoal.id, task.id, value)}
                                        >
                                          <SelectTrigger className="w-20 h-7 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  {/* Add new task */}
                                  <div className="flex space-x-2 ml-6">
                                    <Input
                                      placeholder="Add task..."
                                      value={newTask}
                                      onChange={(e) => setNewTask(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addTask(goal.id, subGoal.id)}
                                      className="text-sm"
                                    />
                                    <Button size="sm" onClick={() => addTask(goal.id, subGoal.id)}>
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dashboard" className="space-y-6 mt-6">
                {dashboardData && (
                  <div className="space-y-6">
                    {/* Section-specific Dashboard Content */}
                    {section.id === 'health-fitness' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Activity className="w-5 h-5" />
                                <span>Weekly Workout Activity</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  workouts: { label: "Workouts", color: "hsl(var(--chart-1))" },
                                  calories: { label: "Calories", color: "hsl(var(--chart-2))" }
                                }}
                                className="h-[250px]"
                              >
                                <BarChart data={dashboardData.weeklyWorkouts}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="day" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="workouts" fill="hsl(var(--chart-1))" />
                                </BarChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Health Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  value: { label: "Score", color: "hsl(var(--chart-1))" }
                                }}
                                className="h-[250px]"
                              >
                                <PieChart>
                                  <Pie
                                    data={dashboardData.healthMetrics}
                                    dataKey="value"
                                    nameKey="metric"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                  >
                                    {dashboardData.healthMetrics.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Weight Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                weight: { label: "Weight (kg)", color: "hsl(var(--chart-3))" }
                              }}
                              className="h-[200px]"
                            >
                              <LineChart data={dashboardData.weightTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="weight" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                              </LineChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {section.id === 'family-relationships' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Social Interactions (Weekly)</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  family: { label: "Family", color: "hsl(var(--chart-1))" },
                                  friends: { label: "Friends", color: "hsl(var(--chart-2))" },
                                  partner: { label: "Partner", color: "hsl(var(--chart-3))" }
                                }}
                                className="h-[250px]"
                              >
                                <AreaChart data={dashboardData.socialInteractions}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="week" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Area type="monotone" dataKey="family" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                                  <Area type="monotone" dataKey="friends" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                                  <Area type="monotone" dataKey="partner" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                                </AreaChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Relationship Health</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  satisfaction: { label: "Satisfaction %", color: "hsl(var(--chart-1))" }
                                }}
                                className="h-[250px]"
                              >
                                <BarChart data={dashboardData.relationshipHealth}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="relationship" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="satisfaction" fill="hsl(var(--chart-2))" />
                                </BarChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}

                    {section.id === 'finances' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5" />
                                <span>Net Worth Growth</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  netWorth: { label: "Net Worth", color: "hsl(var(--chart-1))" },
                                  assets: { label: "Assets", color: "hsl(var(--chart-2))" },
                                  liabilities: { label: "Liabilities", color: "hsl(var(--chart-3))" }
                                }}
                                className="h-[250px]"
                              >
                                <LineChart data={dashboardData.netWorth}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line type="monotone" dataKey="assets" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                  <Line type="monotone" dataKey="liabilities" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                                  <Line type="monotone" dataKey="netWorth" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                                </LineChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5" />
                                <span>Monthly Income Streams</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  amount: { label: "Amount", color: "hsl(var(--chart-1))" }
                                }}
                                className="h-[250px]"
                              >
                                <PieChart>
                                  <Pie
                                    data={dashboardData.incomeStreams}
                                    dataKey="amount"
                                    nameKey="source"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                  >
                                    {dashboardData.incomeStreams.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Investment Portfolio</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                value: { label: "Value", color: "hsl(var(--chart-1))" }
                              }}
                              className="h-[200px]"
                            >
                              <PieChart>
                                <Pie
                                  data={dashboardData.investmentPortfolio}
                                  dataKey="value"
                                  nameKey="category"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                >
                                  {dashboardData.investmentPortfolio.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                              </PieChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {section.id === 'work-career' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Skill Development Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  current: { label: "Current", color: "hsl(var(--chart-1))" },
                                  target: { label: "Target", color: "hsl(var(--chart-2))" }
                                }}
                                className="h-[250px]"
                              >
                                <BarChart data={dashboardData.skillProgress}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="skill" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="current" fill="hsl(var(--chart-1))" />
                                  <Bar dataKey="target" fill="hsl(var(--chart-2))" opacity={0.5} />
                                </BarChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  productivity: { label: "Productivity", color: "hsl(var(--chart-1))" },
                                  satisfaction: { label: "Satisfaction", color: "hsl(var(--chart-2))" },
                                  growth: { label: "Growth", color: "hsl(var(--chart-3))" }
                                }}
                                className="h-[250px]"
                              >
                                <LineChart data={dashboardData.performanceMetrics}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line type="monotone" dataKey="productivity" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                                  <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                  <Line type="monotone" dataKey="growth" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                                </LineChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}

                    {section.id === 'personal-growth' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Learning Activities</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  books: { label: "Books", color: "hsl(var(--chart-1))" },
                                  courses: { label: "Courses", color: "hsl(var(--chart-2))" },
                                  podcasts: { label: "Podcasts", color: "hsl(var(--chart-3))" },
                                  articles: { label: "Articles", color: "hsl(var(--chart-4))" }
                                }}
                                className="h-[250px]"
                              >
                                <AreaChart data={dashboardData.learningProgress}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="week" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Area type="monotone" dataKey="books" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                                  <Area type="monotone" dataKey="courses" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                                  <Area type="monotone" dataKey="podcasts" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                                  <Area type="monotone" dataKey="articles" stackId="1" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" />
                                </AreaChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Skill Acquisition</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  level: { label: "Level", color: "hsl(var(--chart-1))" }
                                }}
                                className="h-[250px]"
                              >
                                <BarChart data={dashboardData.skillAcquisition}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="skill" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="level" fill="hsl(var(--chart-2))" />
                                </BarChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}

                    {section.id === 'leisure-lifestyle' && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Hobby Time Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  creative: { label: "Creative", color: "hsl(var(--chart-1))" },
                                  sports: { label: "Sports", color: "hsl(var(--chart-2))" },
                                  travel: { label: "Travel", color: "hsl(var(--chart-3))" },
                                  social: { label: "Social", color: "hsl(var(--chart-4))" }
                                }}
                                className="h-[250px]"
                              >
                                <AreaChart data={dashboardData.hobbyTime}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Area type="monotone" dataKey="creative" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                                  <Area type="monotone" dataKey="sports" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                                  <Area type="monotone" dataKey="travel" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                                  <Area type="monotone" dataKey="social" stackId="1" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" />
                                </AreaChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Experience Types</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  count: { label: "Count", color: "hsl(var(--chart-1))" }
                                }}
                                className="h-[250px]"
                              >
                                <PieChart>
                                  <Pie
                                    data={dashboardData.experienceTypes}
                                    dataKey="count"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                  >
                                    {dashboardData.experienceTypes.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                )}
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
                          <span>Daily Goals</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Weekly Targets</span>
                          <span>72%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{width: '72%'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write your thoughts, reflections, and observations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[300px]"
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
