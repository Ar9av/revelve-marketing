import { getPrismaClient } from '../../../db';

export async function onRequestPost(context, env) {
  const prisma = getPrismaClient(env.DATABASE_URL);
  const { id } = context.params;
  const reqBody = await context.request.json();

  try {
    const campaign = await prisma.campaign.findUnique({ where: { id } });

    if (!campaign) {
      return new Response(JSON.stringify({ error: 'Campaign not found' }), { status: 404 });
    }

    if (campaign.superboost) {
      return new Response(JSON.stringify({ error: 'Campaign is already boosted' }), { status: 400 });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: { superboost: true, ...reqBody.superboostParams }
    });

    return new Response(JSON.stringify(updatedCampaign), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to activate superboost' }), { status: 500 });
  }
}