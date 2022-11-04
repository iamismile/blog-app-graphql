import { Context } from '../index';

export const Query = {
  posts: (_: any, { take, skip }: { take: number; skip: number }, { prisma }: Context) => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    });
  },

  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({ where: { id: userInfo.userId } });
  },

  profile: (_: any, { userId }: { userId: string }, { prisma }: Context) => {
    return prisma.profile.findUnique({ where: { userId: Number(userId) } });
  },
};
