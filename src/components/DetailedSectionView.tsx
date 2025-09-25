import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Check, Lightbulb, Target, Calendar, Zap, BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="focus">Focus</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
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
                                      <Cell key={index} fill={entry.color} />
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
                            <CardTitle className="flex items-center space-x-2">
                              <TrendingUp className="w-5 h-5" />
                              <span>Weight Trend</span>
                            </CardTitle>
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
                                <Line type="monotone" dataKey="weight" stroke="hsl(var(--chart-3))" />
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
                              <CardTitle>Social Interactions</CardTitle>
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
                              <CardTitle>Relationship Satisfaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {dashboardData.relationshipHealth.map((item, index) => (
                                  <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>{item.relationship}</span>
                                      <span>{item.satisfaction}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div 
                                        className="h-2 rounded-full" 
                                        style={{ 
                                          width: `${item.satisfaction}%`,
                                          backgroundColor: item.color
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
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
                                <span>Net Worth Trend</span>
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
                                  <Line type="monotone" dataKey="netWorth" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                                  <Line type="monotone" dataKey="assets" stroke="hsl(var(--chart-2))" />
                                  <Line type="monotone" dataKey="liabilities" stroke="hsl(var(--chart-3))" />
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
                                  amount: { label: "Amount ($)", color: "hsl(var(--chart-1))" }
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
                                      <Cell key={index} fill={entry.color} />
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
                            <CardTitle className="flex items-center space-x-2">
                              <BarChart3 className="w-5 h-5" />
                              <span>Investment Portfolio</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                value: { label: "Value ($)", color: "hsl(var(--chart-1))" }
                              }}
                              className="h-[200px]"
                            >
                              <BarChart data={dashboardData.investmentPortfolio}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="value">
                                  {dashboardData.investmentPortfolio.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                  ))}
                                </Bar>
                              </BarChart>
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
                              <div className="space-y-4">
                                {dashboardData.skillProgress.map((skill, index) => (
                                  <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>{skill.skill}</span>
                                      <span>{skill.current}% / {skill.target}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div 
                                        className="h-2 rounded-full" 
                                        style={{ 
                                          width: `${(skill.current / skill.target) * 100}%`,
                                          backgroundColor: skill.color
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
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
                                  satisfaction: { label: "Job Satisfaction", color: "hsl(var(--chart-2))" },
                                  growth: { label: "Growth", color: "hsl(var(--chart-3))" }
                                }}
                                className="h-[250px]"
                              >
                                <LineChart data={dashboardData.performanceMetrics}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line type="monotone" dataKey="productivity" stroke="hsl(var(--chart-1))" />
                                  <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-2))" />
                                  <Line type="monotone" dataKey="growth" stroke="hsl(var(--chart-3))" />
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
                              <CardTitle>Skill Acquisition Levels</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {dashboardData.skillAcquisition.map((skill, index) => (
                                  <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>{skill.skill}</span>
                                      <span>{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div 
                                        className="h-2 rounded-full" 
                                        style={{ 
                                          width: `${skill.level}%`,
                                          backgroundColor: skill.color
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
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
                              <CardTitle>Monthly Hobby Time</CardTitle>
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
                                <BarChart data={dashboardData.hobbyTime}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="creative" fill="hsl(var(--chart-1))" />
                                  <Bar dataKey="sports" fill="hsl(var(--chart-2))" />
                                  <Bar dataKey="travel" fill="hsl(var(--chart-3))" />
                                  <Bar dataKey="social" fill="hsl(var(--chart-4))" />
                                </BarChart>
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
                                      <Cell key={index} fill={entry.color} />
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