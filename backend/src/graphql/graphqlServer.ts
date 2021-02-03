import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import typeDefs from './typeDef';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const serverApollo = new ApolloServer({
  schema,
});

export default serverApollo;
