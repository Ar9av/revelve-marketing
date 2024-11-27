// import { prisma } from '../../src/lib/db';
import { getPrismaClient } from '../db';

export async function onRequestPost(context) {
  try {
    const req = await context.request.json();
    const { userId } = req;
    const prisma = getPrismaClient(context.env.DATABASE_URL);

    // Check user credits
    const credits = await prisma.credit.findMany({
      where: { userId }
    });

    const totalCredits = credits.reduce((total, credit) => {
      return total + (credit.expenseType === 'credit' ? credit.creditsValue : -credit.creditsValue);
    }, 0);

    if (totalCredits < 100) { // Campaign creation cost
      return new Response(JSON.stringify({ error: 'Insufficient credits' }), { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        ...req,
        status: 'active'
      }
    });

    // Deduct initial campaign credits
    await prisma.credit.create({
      data: {
        userId,
        campaignId: campaign.id,
        expenseType: 'debit',
        creditsValue: 100,
        type: 'new-campaign',
        description: 'Campaign creation cost'
      }
    });

    return new Response(JSON.stringify(campaign), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create campaign' }), { status: 500 });
  }
}