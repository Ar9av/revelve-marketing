import { prisma } from './db';

export interface CreateCampaignInput {
  title: string;
  description: string;
  keywords: string[];
  tone: number;
  links: string[];
  userId: string;
  productName: string;
}

export async function createCampaign(data: CreateCampaignInput) {
  return prisma.campaign.create({
    data: {
      ...data,
      status: 'active'
    }
  });
}

export async function getCampaigns(userId: string) {
  return prisma.campaign.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getCampaign(id: string) {
  return prisma.campaign.findUnique({
    where: { id }
  });
}

export async function updateCampaign(id: string, data: Partial<CreateCampaignInput>) {
  return prisma.campaign.update({
    where: { id },
    data
  });
}

export async function deleteCampaign(id: string) {
  return prisma.campaign.delete({
    where: { id }
  });
}