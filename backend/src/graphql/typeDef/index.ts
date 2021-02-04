import { mergeTypeDefs } from '@graphql-tools/merge';
import OrganizationType from './organization.type';
import UserType from './user.type';

export default mergeTypeDefs([OrganizationType, UserType]);
