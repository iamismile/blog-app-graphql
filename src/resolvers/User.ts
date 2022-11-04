import { Context } from '../index';

interface UserParentType {
  id: number;
}

export const User = {
  posts: (
    parent: UserParentType,
    { take, skip }: { take: number; skip: number },
    { prisma, userInfo }: Context
  ) => {
    const isOwnProfile = parent.id === userInfo?.userId;

    // If own profile show all posts
    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: parent.id },
        orderBy: [{ createdAt: 'desc' }],
        take,
        skip,
      });
    }

    // Otherwise show only published posts
    return prisma.post.findMany({
      where: { authorId: parent.id, published: true },
      orderBy: [{ createdAt: 'desc' }],
      take,
      skip,
    });
  },
};
