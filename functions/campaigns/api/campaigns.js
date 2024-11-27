import { getPrismaClient } from '../../db';

export async function onRequestPost(context) {
  const { userId } = await context.request.json();
  const prisma = getPrismaClient(context.env.DATABASE_URL);

  try {
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
        ...await context.request.json(),
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
    console.error('Failed to create campaign:', error);
    return new Response(JSON.stringify({ error: 'Failed to create campaign' }), { status: 500 });
  }
}