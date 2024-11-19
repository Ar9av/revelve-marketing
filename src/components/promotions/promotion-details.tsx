import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ThumbsUp, MessageSquare, TrendingUp, ArrowUpCircle, Clock } from 'lucide-react';
import { PromotionBoostDialog } from './promotion-boost-dialog';
import { useEffect, useState } from 'react';
import { Campaign, getCampaignDetails } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function PromotionDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaign() {
      if (!id) return;

      try {
        const data = await getCampaignDetails(id);
        setCampaign(data);
      } catch (error) {
        console.error('Failed to load campaign:', error);
        toast({
          title: "Error",
          description: "Failed to load campaign details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    loadCampaign();
  }, [id, toast]);

  if (loading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Promotion not found</p>
      </div>
    );
  }

  // Transform posts data for the chart
  const engagementData = campaign.posts?.map(post => ({
    date: format(new Date(post.timePosted), 'MM/dd'),
    value: post.totalLikes + post.totalReplies
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{campaign.title}</h2>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">{campaign.subreddits.join(', ')}</p>
            <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
              {campaign.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-4">
          {campaign.status === 'active' && (
            <PromotionBoostDialog promotionId={campaign.id} />
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
            <p className="text-2xl font-bold mt-2">{campaign.stats?.totalUpvotes || 0}</p>
            <p className="text-xs text-muted-foreground">Across all posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Comments</p>
              </div>
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{campaign.stats?.totalReplies || 0}</p>
            <p className="text-xs text-muted-foreground">Across all posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Posts</p>
              </div>
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{campaign.postCount || 0}</p>
            <p className="text-xs text-muted-foreground">Active promotions</p>
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
            <AreaChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaign.posts?.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <a 
                    href={post.postUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    r/{post.subreddit}
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {format(new Date(post.timePosted), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{post.upvotes}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{post.totalLikes} likes</span>
                  <span>{post.totalReplies} replies</span>
                </div>
              </div>
            ))}

            {(!campaign.posts || campaign.posts.length === 0) && (
              <p className="text-center text-muted-foreground py-4">
                No posts yet for this campaign.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}