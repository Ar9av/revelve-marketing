import { prisma } from '../../../lib/db';

export async function onRequestPatch(context) {
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