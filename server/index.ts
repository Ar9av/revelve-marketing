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

// Get user's campaigns
app.get('/api/campaigns/:userId', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: req.params.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(campaigns);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});