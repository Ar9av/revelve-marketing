import { getPrismaClient } from '../../db';

export async function onRequestPost({context, env}) {
  const prisma = getPrismaClient(env.DATABASE_URL);
  try {
    const req = await context.request.json();
    const { userId, campaignId, amount, type } = req;

    // Check current credits
    const credits = await prisma.credit.findMany({
      where: { userId }
    });

    const totalCredits = credits.reduce((total, credit) => {
      return total + (credit.expenseType === 'credit' ? credit.creditsValue : -credit.creditsValue);
    }, 0);

    if (totalCredits < amount) {
      return new Response(JSON.stringify({ error: 'Insufficient credits' }), { status: 400 });
    }

    // Create debit transaction
    await prisma.credit.create({
      data: {
        userId,
        campaignId,
        expenseType: 'debit',
        creditsValue: amount,
        type,
        description: `${type} cost`
      }
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to deduct credits' }), { status: 500 });
  }
}