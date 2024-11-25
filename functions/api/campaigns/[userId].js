import { getPrismaClient } from '../../db';

export async function onRequestGet(context, env) {
  const { userId } = context.params;
  const prisma = getPrismaClient(env.DATABASE_URL);
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: userId
      },
      include: {
        _count: {
          select: { posts: true }
        },
        posts: {
          select: {
            totalLikes: true,
            totalReplies: true,
            upvotes: true,
            positive: true,
            negative: true,
            neutral: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate aggregates for each campaign
    const campaignsWithStats = campaigns.map(campaign => {
      const stats = campaign.posts.reduce((acc, post) => ({
        totalLikes: acc.totalLikes + post.totalLikes,
        totalReplies: acc.totalReplies + post.totalReplies,
        totalUpvotes: acc.totalUpvotes + post.upvotes,
        positive: acc.positive + post.positive,
        negative: acc.negative + post.negative,
        neutral: acc.neutral + post.neutral,
      }), { 
        totalLikes: 0, 
        totalReplies: 0, 
        totalUpvotes: 0,
        positive: 0,
        negative: 0,
        neutral: 0
      });

      return {
        ...campaign,
        stats,
        postCount: campaign._count.posts,
      };
    });

    return new Response(JSON.stringify(campaignsWithStats), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch campaigns' }), { status: 500 });
  }
}