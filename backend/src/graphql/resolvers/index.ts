import { mergeResolvers } from '@graphql-tools/merge';
import organizationResolver from './organization.resolver';

export default mergeResolvers([organizationResolver]);
