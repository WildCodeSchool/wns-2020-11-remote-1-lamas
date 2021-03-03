import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../graphql/typeDef';
import resolvers from '../graphql/resolvers';
import { IcreateUserData } from '../graphql/resolvers/types/user.type';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const createApolloServer = (user: IcreateUserData): ApolloServer => {
  return new ApolloServer({
    schema,
    context: () => {
      return { user };
    },
  });
};

export default createApolloServer;
