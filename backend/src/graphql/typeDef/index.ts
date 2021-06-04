import { mergeTypeDefs } from '@graphql-tools/merge';
import OrganizationType from './organization.type';
import RoomType from './room.type';
import TodoType from './todo.type';
import UserType from './user.type';

export default mergeTypeDefs([OrganizationType, UserType, TodoType, RoomType]);
