import { getPrismaClient } from '../../db';
// import {prisma} from '../../src/lib/db';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const userId = url.searchParams.get('userId');
  const prisma = getPrismaClient(context.env.DATABASE_URL);

  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId query parameter is required' }), { status: 400 });
  }

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
    return new Response(JSON.stringify({ error: 'Failed to fetch credits, ' + error }), { status: 500 });
  }
}