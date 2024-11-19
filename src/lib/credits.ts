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
  promotionId?: string,
  description?: string
) {
  return prisma.credit.create({
    data: {
      userId,
      promotionId,
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
  promotionId?: string,
  description?: string
) {
  return prisma.credit.create({
    data: {
      userId,
      promotionId,
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

export async function claimCode(userId: string, code: string): Promise<boolean> {
  // Check if code has been used before by this user
  const existingClaim = await prisma.credit.findFirst({
    where: {
      userId,
      type: 'claim-code',
      description: code
    }
  });

  if (existingClaim) {
    return false;
  }

  if (code === 'REVELVEDUP') {
    await addCredits(userId, 500, 'claim-code', undefined, code);
    return true;
  }

  return false;
}