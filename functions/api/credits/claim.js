import { prisma } from '../../../src/lib/db';

export async function onRequestPost(context) {
  const reqBody = await context.request.json();

  try {
    const { userId, code } = reqBody;

    const existingClaim = await prisma.credit.findFirst({
      where: {
        userId,
        type: 'claim-code',
        description: code
      }
    });

    if (existingClaim) {
      return new Response(JSON.stringify({ error: 'Code already claimed' }), { status: 400 });
    }

    if (code === 'REVELVEDUP') {
      await prisma.credit.create({
        data: {
          userId,
          expenseType: 'credit',
          creditsValue: 500,
          type: 'claim-code',
          description: code
        }
      });
      return new Response(JSON.stringify({ success: true, credits: 500 }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Invalid code' }), { status: 400 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to claim code' }), { status: 500 });
  }
}