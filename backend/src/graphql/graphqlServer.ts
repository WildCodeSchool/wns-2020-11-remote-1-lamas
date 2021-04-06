import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDef';
import resolvers from './resolvers';
import verifyToken from './utils/verifyToken';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const serverApollo = new ApolloServer({
  schema,

  context: ({ req, res }) => {
    const token = req.get('Authorization') || '';

    return { res, user: verifyToken(token.replace('Bearer ', '')) };
  },
});

export default serverApollo;
