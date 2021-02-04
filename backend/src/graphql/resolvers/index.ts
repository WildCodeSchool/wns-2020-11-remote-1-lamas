import { mergeResolvers } from '@graphql-tools/merge';
import organizationResolver from './organization.resolver';
import userResolver from './user.resolver';

export default mergeResolvers([organizationResolver, userResolver]);
