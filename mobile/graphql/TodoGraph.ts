import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation(
    $todo_name: String!
    $isChecked: Boolean!
    $timeWork: DateTime
    $timeBreak: DateTime
  ) {
    createTodo(
      todo_name: $todo_name
      isChecked: $isChecked
      timeWork: $timeWork
      timeBreak: $timeBreak
    ) {
      todos_list
    }
  }
`;

export const GET_TODOS = gql`
  query {
    getTodos {
      _id
      todo_name
      isChecked
      timeWork
      timeBreak
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation(
    $_id: ID!
    $todo_name: String
    $isChecked: Boolean
    $timeWork: DateTime
    $timeBreak: DateTime
  ) {
    updateTodo(
      _id: $_id
      todo_name: $todo_name
      isChecked: $isChecked
      timeBreak: $timeBreak
      timeWork: $timeWork
    ) {
      _id
      todo_name
      isChecked
      timeWork
      timeBreak
    }
  }
`;

export const DELETE_TODO = gql`
  mutation($_id: ID!) {
    deleteTodo(_id: $_id) {
      _id
      todo_name
      isChecked
      timeWork
      timeBreak
    }
  }
`;
