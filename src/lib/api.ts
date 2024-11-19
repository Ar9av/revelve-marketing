const API_URL = 'http://localhost:3001/api';

export interface Post {
  id: string;
  postUrl: string;
  totalLikes: number;
  totalReplies: number;
  upvotes: number;
  subreddit: string;
  timePosted: string;
  data?: any;
  campaignId: string;
}

export interface CampaignStats {
  totalLikes: number;
  totalReplies: number;
  totalUpvotes: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  tone: number;
  subreddits: string[];
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  stats?: CampaignStats;
  postCount?: number;
  posts?: Post[];
}

export interface CreateCampaignInput {
  title: string;
  description: string;
  keywords: string[];
  tone: number;
  subreddits: string[];
  userId: string;
}

export async function createCampaign(data: CreateCampaignInput): Promise<Campaign> {
  const response = await fetch(`${API_URL}/campaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }

  return response.json();
}

export async function getCampaigns(userId: string): Promise<Campaign[]> {
  const response = await fetch(`${API_URL}/campaigns/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }

  return response.json();
}

export async function getCampaignDetails(id: string): Promise<Campaign> {
  const response = await fetch(`${API_URL}/campaigns/details/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch campaign details');
  }

  return response.json();
}