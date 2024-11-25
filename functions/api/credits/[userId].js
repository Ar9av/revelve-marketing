import { getPrismaClient } from '../../db';

export async function onRequestGet({context, env}) {
  const { userId } = context.params;
  const prisma = getPrismaClient(env.DATABASE_URL);
  try {
    const credits = await prisma.credit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const totalCredits = credits.reduce((total, credit) => {
      return total + (credit.expenseType === 'credit' ? credit.creditsValue : -credit.creditsValue);
    }, 0);

    return new Response(JSON.stringify({ credits, totalCredits }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch credits' }), { status: 500 });
  }
}