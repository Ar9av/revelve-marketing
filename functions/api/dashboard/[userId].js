import { prisma } from '../../../lib/db';

export async function onRequestGet(context) {
  const { userId } = context.params;

  try {
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      include: { posts: true }
    });

    const stats = campaigns.reduce((acc, campaign) => {
      return campaign.posts.reduce((postAcc, post) => ({
        totalLikes: postAcc.totalLikes + post.totalLikes,
        totalReplies: postAcc.totalReplies + post.totalReplies,
        totalUpvotes: postAcc.totalUpvotes + post.upvotes,
        positive: postAcc.positive + post.positive,
        negative: postAcc.negative + post.negative,
        neutral: postAcc.neutral + post.neutral,
      }), acc);
    }, {
      totalLikes: 0,
      totalReplies: 0,
      totalUpvotes: 0,
      positive: 0,
      negative: 0,
      neutral: 0
    });

    const posts = campaigns.flatMap(c => c.posts);
    const engagementData = posts.slice(-7).sort((a, b) => new Date(a.timePosted) - new Date(b.timePosted)).map(post => ({
      date: post.timePosted,
      value: post.totalLikes + post.totalReplies
    }));

    const recentPosts = posts.slice(0, 4).sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted)).map(post => ({
      id: post.id,
      subreddit: post.subreddit,
      upvotes: post.upvotes,
      timePosted: post.timePosted,
      postUrl: post.postUrl
    }));

    const response = {
      stats,
      engagementData,
      recentPosts,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalCampaigns: campaigns.length,
      totalPosts: posts.length
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch dashboard data' }), { status: 500 });
  }
}