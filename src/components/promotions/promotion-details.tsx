import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ThumbsUp, MessageSquare, TrendingUp, ArrowUpCircle, Clock } from 'lucide-react';
import { PromotionBoostDialog } from './promotion-boost-dialog';

const mockEngagementData = [
  { date: '03/01', value: 120 },
  { date: '03/02', value: 150 },
  { date: '03/03', value: 180 },
  { date: '03/04', value: 250 },
  { date: '03/05', value: 280 },
  { date: '03/06', value: 300 },
  { date: '03/07', value: 280 },
];

const mockComments = [
  {
    id: 1,
    author: 'techEnthusiast',
    content: 'This looks really promising! How does it handle concurrent requests?',
    upvotes: 15,
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'devGuru',
    content: 'Great implementation. The documentation is very clear.',
    upvotes: 12,
    time: '3 hours ago'
  },
  {
    id: 3,
    author: 'codeReviewer',
    content: 'The performance improvements are impressive.',
    upvotes: 8,
    time: '5 hours ago'
  }
];

const mockPromotions = {
  '1': {
    id: '1',
    title: 'New Developer Tool Launch',
    subreddit: 'r/programming',
    status: 'active',
    stats: {
      upvotes: 245,
      comments: 32,
      engagement: '24.3%'
    },
    lastActive: '2 hours ago'
  },
  '2': {
    id: '2',
    title: 'AI Platform Release',
    subreddit: 'r/artificial',
    status: 'active',
    stats: {
      upvotes: 189,
      comments: 28,
      engagement: '18.7%'
    },
    lastActive: '5 hours ago'
  },
  '3': {
    id: '3',
    title: 'Mobile App Launch',
    subreddit: 'r/androiddev',
    status: 'completed',
    stats: {
      upvotes: 567,
      comments: 89,
      engagement: '32.1%'
    },
    lastActive: '2 days ago'
  }
};

export function PromotionDetails() {
  const { id } = useParams();
  const promotion = id ? mockPromotions[id as keyof typeof mockPromotions] : null;

  if (!promotion) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Promotion not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{promotion.title}</h2>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">{promotion.subreddit}</p>
            <Badge variant={promotion.status === 'active' ? 'default' : 'secondary'}>
              {promotion.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-4">
          {promotion.status === 'active' && (
            <PromotionBoostDialog promotionId={promotion.id} />
          )}
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Upvotes</p>
              </div>
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{promotion.stats.upvotes}</p>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Comments</p>
              </div>
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{promotion.stats.comments}</p>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Engagement Rate</p>
              </div>
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{promotion.stats.engagement}</p>
            <p className="text-xs text-muted-foreground">+2.4% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockEngagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="url(#gradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{comment.author}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {comment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{comment.upvotes}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}