import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, MessageSquare, ThumbsUp, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockPromotions = [
  {
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
  {
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
  {
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
];

export function PromotionsList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
        <Button onClick={() => navigate('/campaigns/new')}>Create Promotion</Button>
      </div>

      <div className="grid gap-4">
        {mockPromotions.map((promotion) => (
          <Card key={promotion.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{promotion.title}</h3>
                  <Badge variant={promotion.status === 'active' ? 'default' : 'secondary'}>
                    {promotion.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{promotion.subreddit}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{promotion.stats.upvotes} upvotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{promotion.stats.comments} comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{promotion.stats.engagement} engagement</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">{promotion.lastActive}</p>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/promotions/${promotion.id}`)}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}