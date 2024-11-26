import { getPrismaClient } from '../../../../db';

export async function onRequestPatch(context) {
  const prisma = getPrismaClient(context.env.DATABASE_URL);
  const { id } = context.params;
  const reqBody = await context.request.json();

  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { status: reqBody.status }
    });
    return new Response(JSON.stringify(campaign), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update campaign status' }), { status: 500 });
  }
}