import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../graphql/typeDef';
import resolvers from '../graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const createApolloServer = (user: any) => {
  return new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return { user };
    },
  });
};

export default createApolloServer;
