import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Mutation, Query } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: { userId: number } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: async ({ req }): Promise<Context> => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return {
        prisma,
        userInfo: null,
      };
    }

    const token = authorizationHeader.substring(7);
    const userInfo = await getUserFromToken(token);
    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready on ${url}`);
});
