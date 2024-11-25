import { getPrismaClient } from '../../db';

export async function onRequestPost(context) {
  const { id } = context.params;
  const updateData = await context.request.json();
  const prisma = getPrismaClient(context.env.DATABASE_URL);

  try {
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedCampaign), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update campaign details' }), { status: 500 });
  }
}