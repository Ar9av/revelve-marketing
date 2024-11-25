import { getPrismaClient } from '../../db';

export async function onRequestPost({context, env}) {
  const reqBody = await context.request.json();
  const prisma = getPrismaClient(env.DATABASE_URL);

  try {
    const { userId } = reqBody;

    const existingCredits = await prisma.credit.findFirst({
      where: { userId }
    });

    if (!existingCredits) {
      await prisma.credit.create({
        data: {
          userId,
          expenseType: 'credit',
          creditsValue: 500,
          type: 'new-login',
          description: 'Welcome gift from Revelve'
        }
      });
      return new Response(JSON.stringify({ isNewUser: true, credits: 500 }), { status: 200 });
    }

    return new Response(JSON.stringify({ isNewUser: false }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to check new user' }), { status: 500 });
  }
}