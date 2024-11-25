import { format } from 'date-fns';
import { getPrismaClient } from '../../../../db';

export async function onRequestGet(context) {
  const { id } = context.params;
  const prisma = getPrismaClient(context.env.DATABASE_URL);

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
    posts: {
          include: {
            dailyStats: { orderBy: { date: 'asc' } }
          },
          orderBy: { timePosted: 'desc' }
        }
      }
    });

    if (!campaign) {
      return new Response(JSON.stringify({ error: 'Campaign not found' }), { status: 404 });
    }

    const dailyStats = campaign.posts.reduce((acc, post) => {
      post.dailyStats.forEach(stat => {
        const dateStr = format(stat.date, 'yyyy-MM-dd');
        if (!acc[dateStr]) {
          acc[dateStr] = {
            date: stat.date,
            engagements: 0,
            parentEngagements: 0,
            newPosts: 0
          };
        }
        acc[dateStr].engagements += stat.engagements;
        acc[dateStr].parentEngagements += stat.parentEngagements;
        acc[dateStr].newPosts += stat.newPosts;
      });
      return acc;
    }, {});

    const dailyStatsArray = Object.values(dailyStats).sort((a, b) => new Date(a.date) - new Date(b.date));

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

    const response = {
      ...campaign,
      stats,
      dailyStats: dailyStatsArray,
      postCount: campaign.posts.length,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch campaign details' }), { status: 500 });
  }
}