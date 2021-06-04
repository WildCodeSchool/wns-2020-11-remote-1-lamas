import { mergeResolvers } from '@graphql-tools/merge';
import { GraphQLScalarType, Kind } from 'graphql';
import organizationResolver from './organization.resolver';
import todoResolver from './todo.resolver';
import userResolver from './user.resolver';
import roomResolver from './room.resolver';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export default mergeResolvers([
  organizationResolver,
  userResolver,
  todoResolver,
  roomResolver,
  { DateTime: dateScalar },
]);
