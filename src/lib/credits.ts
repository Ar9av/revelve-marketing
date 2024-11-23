import { prisma } from './db';

export async function getUserCredits(userId: string): Promise<number> {
  const credits = await prisma.credit.findMany({
    where: { userId }
  });

  return credits.reduce((total, credit) => {
    return total + (credit.expenseType === 'credit' ? credit.creditsValue : -credit.creditsValue);
  }, 0);
}

export async function addCredits(
  userId: string, 
  creditsValue: number, 
  type: string, 
  campaignId?: string,
  description?: string
) {
  return prisma.credit.create({
    data: {
      userId,
      campaignId,
      expenseType: 'credit',
      creditsValue,
      type,
      description
    }
  });
}

export async function deductCredits(
  userId: string, 
  creditsValue: number, 
  type: string, 
  campaignId?: string,
  description?: string
) {
  const currentCredits = await getUserCredits(userId);
  
  if (currentCredits < creditsValue) {
    throw new Error('Insufficient credits');
  }

  return prisma.credit.create({
    data: {
      userId,
      campaignId,
      expenseType: 'debit',
      creditsValue,
      type,
      description
    }
  });
}

export async function checkAndDeactivateUserCampaigns(userId: string) {
  const balance = await getUserCredits(userId);
  
  if (balance < 0) {
    await prisma.campaign.updateMany({
      where: { 
        userId,
        status: 'active'
      },
      data: { status: 'inactive' }
    });
    return true;
  }
  return false;
}