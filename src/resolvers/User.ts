import { Context } from '../index';

interface UserParentType {
  id: number;
}

export const User = {
  posts: (parent: UserParentType, __: any, { prisma, userInfo }: Context) => {
    const isOwnProfile = parent.id === userInfo?.userId;

    // If own profile show all posts
    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: parent.id },
        orderBy: [{ createdAt: 'desc' }],
      });
    }

    // Otherwise show only published posts
    return prisma.post.findMany({
      where: { authorId: parent.id, published: true },
      orderBy: [{ createdAt: 'desc' }],
    });
  },
};
