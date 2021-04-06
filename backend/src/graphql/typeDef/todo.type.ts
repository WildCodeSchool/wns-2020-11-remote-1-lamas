import { gql } from 'apollo-server';

const TodoType = gql`
  scalar DateTime

  type todoList {
    _id: ID!
  }

  type Todo {
    _id: ID!
    todo_name: String!
    isChecked: Boolean!
    timeWork: DateTime
    timeBreak: DateTime
  }

  type UserTodoList {
    todos_list: [ID]
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(
      todo_name: String
      isChecked: Boolean
      timeWork: DateTime
      timeBreak: DateTime
    ): UserTodoList
    updateTodo(
      _id: ID!
      todo_name: String!
      isChecked: Boolean!
      timeWork: DateTime!
      timeBreak: DateTime!
    ): Todo
    deleteTodo(_id: ID!): Todo
  }
`;

export default TodoType;
