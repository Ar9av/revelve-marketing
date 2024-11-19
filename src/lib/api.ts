const API_URL = 'http://localhost:3001/api';

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