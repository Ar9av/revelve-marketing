import express from 'express';
import cors from 'cors';
import { prisma } from '../src/lib/db';

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
      }), { totalLikes: 0, totalReplies: 0, totalUpvotes: 0 });

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

// Get campaign details with posts
app.get('/api/campaigns/details/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: req.params.id },
      include: {
        posts: {
          orderBy: { timePosted: 'desc' }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Calculate aggregate stats
    const stats = campaign.posts.reduce((acc, post) => ({
      totalLikes: acc.totalLikes + post.totalLikes,
      totalReplies: acc.totalReplies + post.totalReplies,
      totalUpvotes: acc.totalUpvotes + post.upvotes,
    }), { totalLikes: 0, totalReplies: 0, totalUpvotes: 0 });

    res.json({
      ...campaign,
      stats,
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