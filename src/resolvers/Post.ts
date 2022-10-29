import { Context } from '../index';
import { userLoader } from '../loaders/userLoader';

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: (parent: PostParentType, __: any, ___: Context) => {
    return userLoader.load(parent.authorId);
  },
};
