import { mergeTypeDefs } from '@graphql-tools/merge';
import RoomType from './room.type';
import TodoType from './todo.type';
import UserType from './user.type';

export default mergeTypeDefs([UserType, TodoType, RoomType]);
