import express from 'express';
import cors from 'cors';
import { prisma } from '../src/lib/db';
import { format } from 'date-fns';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create campaign
app.post('/api/campaigns', async (req, res) => {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        ...req.body,
        status: 'active'
      }
    });
    res.json(campaign);
  } catch (error) {
    console.error('Failed to create campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Update campaign status
app.patch('/api/campaigns/:id/status', async (req, res) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(campaign);
  } catch (error) {
    console.error('Failed to update campaign status:', error);
    res.status(500).json({ error: 'Failed to update campaign status' });
  }
});

// Update campaign details
app.put('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(campaign);
  } catch (error) {
    console.error('Failed to update campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Get user's campaigns with aggregated post data
app.get('/api/campaigns/:userId', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: req.params.userId
      },
      include: {
        _count: {
          select: { posts: true }
        },
        posts: {
          select: {
            totalLikes: true,
            totalReplies: true,
            upvotes: true,
            positive: true,
            negative: true,
            neutral: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate aggregates for each campaign
    const campaignsWithStats = campaigns.map(campaign => {
      const stats = campaign.posts.reduce((acc, post) => ({
        totalLikes: acc.totalLikes + post.totalLikes,
        totalReplies: acc.totalReplies + post.totalReplies,
        totalUpvotes: acc.totalUpvotes + post.upvotes,
        positive: acc.positive + post.positive,
        negative: acc.negative + post.negative,
        neutral: acc.neutral + post.neutral,
      }), { 
        totalLikes: 0, 
        totalReplies: 0, 
        totalUpvotes: 0,
        positive: 0,
        negative: 0,
        neutral: 0
      });

      return {
        ...campaign,
        stats,
        postCount: campaign._count.posts,
      };
    });

    res.json(campaignsWithStats);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Get user's dashboard stats
app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: req.params.userId
      },
      include: {
        posts: true
      }
    });

    // Calculate overall stats
    const stats = campaigns.reduce((acc, campaign) => {
      const campaignStats = campaign.posts.reduce((postAcc, post) => ({
        totalLikes: postAcc.totalLikes + post.totalLikes,
        totalReplies: postAcc.totalReplies + post.totalReplies,
        totalUpvotes: postAcc.totalUpvotes + post.upvotes,
        positive: postAcc.positive + post.positive,
        negative: postAcc.negative + post.negative,
        neutral: postAcc.neutral + post.neutral,
      }), acc);

      return campaignStats;
    }, {
      totalLikes: 0,
      totalReplies: 0,
      totalUpvotes: 0,
      positive: 0,
      negative: 0,
      neutral: 0
    });

    // Get engagement data for chart
    const posts = campaigns.flatMap(c => c.posts);
    const engagementData = posts
      .sort((a, b) => new Date(a.timePosted).getTime() - new Date(b.timePosted).getTime())
      .slice(-7) // Last 7 posts
      .map(post => ({
        date: post.timePosted,
        value: post.totalLikes + post.totalReplies
      }));

    // Get recent activity
    const recentPosts = posts
      .sort((a, b) => new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime())
      .slice(0, 4)
      .map(post => ({
        id: post.id,
        subreddit: post.subreddit,
        upvotes: post.upvotes,
        timePosted: post.timePosted,
        postUrl: post.postUrl
      }));

    res.json({
      stats,
      engagementData,
      recentPosts,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalCampaigns: campaigns.length,
      totalPosts: posts.length
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

app.get('/api/campaigns/details/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: req.params.id },
      include: {
        posts: {
          include: {
            dailyStats: {
              orderBy: { date: 'asc' }
            }
          },
          orderBy: { timePosted: 'desc' }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Aggregate daily stats across all posts
    const dailyStats = campaign.posts.reduce((acc, post) => {
      post.dailyStats.forEach(stat => {
        const dateStr = format(stat.date, 'yyyy-MM-dd');
        if (!acc[dateStr]) {
          acc[dateStr] = {
            date: stat.date,
            engagements: 0,
            parentEngagements: 0,
            newPosts: 0
          };
        }
        acc[dateStr].engagements += stat.engagements;
        acc[dateStr].parentEngagements += stat.parentEngagements;
        acc[dateStr].newPosts += stat.newPosts;
      });
      return acc;
    }, {} as Record<string, any>);

    // Convert to array and sort by date
    const dailyStatsArray = Object.values(dailyStats).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate aggregate stats
    const stats = campaign.posts.reduce((acc, post) => ({
      totalLikes: acc.totalLikes + post.totalLikes,
      totalReplies: acc.totalReplies + post.totalReplies,
      totalUpvotes: acc.totalUpvotes + post.upvotes,
      positive: acc.positive + post.positive,
      negative: acc.negative + post.negative,
      neutral: acc.neutral + post.neutral,
    }), { 
      totalLikes: 0, 
      totalReplies: 0, 
      totalUpvotes: 0,
      positive: 0,
      negative: 0,
      neutral: 0
    });

    res.json({
      ...campaign,
      stats,
      dailyStats: dailyStatsArray,
      postCount: campaign.posts.length,
    });
  } catch (error) {
    console.error('Failed to fetch campaign details:', error);
    res.status(500).json({ error: 'Failed to fetch campaign details' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});