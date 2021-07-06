// import { gql } from 'apollo-server';
// import Todo from '../../../database/models/Todo';

// const CREATE_TODO = gql`
//   mutation(
//     $todo_name: String!
//     $isChecked: Boolean!
//     $timeWork: DateTime!
//     $timeBreak: DateTime!
//   ) {
//     createTodo(
//       todo_name: $todo_name
//       isChecked: $isChecked
//       timeWork: $timeWork
//       timeBreak: $timeBreak
//     ) {
//       todos_list
//     }
//   }
// `;

// const GET_TODOS = gql`
//   query {
//     getTodos {
//       _id
//       todo_name
//       isChecked
//       timeWork
//       timeBreak
//     }
//   }
// `;

// const UPDATE_TODO = gql`
//   mutation(
//     $_id: ID!
//     $todo_name: String!
//     $isChecked: Boolean!
//     $timeWork: DateTime!
//     $timeBreak: DateTime!
//   ) {
//     updateTodo(
//       _id: $_id
//       todo_name: $todo_name
//       isChecked: $isChecked
//       timeBreak: $timeBreak
//       timeWork: $timeWork
//     ) {
//       _id
//       todo_name
//       isChecked
//       timeWork
//       timeBreak
//     }
//   }
// `;

// const DELETE_TODO = gql`
//   mutation($_id: ID!) {
//     deleteTodo(_id: $_id) {
//       _id
//       todo_name
//       isChecked
//       timeWork
//       timeBreak
//     }
//   }
// `;

// describe('todos resolver', () => {
//   it('create todo => return user todos_list', async (done) => {
//     const { mutate } = await global.signin();

//     const res = await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     const todoList = res.data.createTodo.todos_list;

//     expect(res.data.createTodo).toHaveProperty('todos_list');
//     expect(typeof res.data.createTodo).toBe('object');
//     expect(todoList).toHaveLength(1);

//     done();
//   }, 30000);

//   it('create todo => return data of one todo', async (done) => {
//     const { mutate } = await global.signin();

//     const res = await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     const todoList = res.data.createTodo.todos_list;
//     const todo = await Todo.findById(todoList[0]);

//     expect(todo).toHaveProperty('_id');
//     expect(todo).toHaveProperty('isChecked', false);
//     expect(todo).toHaveProperty('timeWork');
//     expect(todo).toHaveProperty('timeBreak');
//     expect(todo).toHaveProperty('todo_name', 'testing todo');

//     done();
//   }, 30000);

//   it('get todos', async (done) => {
//     const { mutate, query } = await global.signin();

//     await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo 002',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     const res = await query({
//       query: GET_TODOS,
//     });

//     expect(res.data).toHaveProperty('getTodos');
//     expect(res.data.getTodos).toHaveLength(2);
//     expect(res.data.getTodos[0]).toHaveProperty('_id');
//     expect(res.data.getTodos[0]).toHaveProperty('todo_name', 'testing todo');
//     expect(res.data.getTodos[0]).toHaveProperty('isChecked', false);
//     expect(res.data.getTodos[0]).toHaveProperty('timeWork');
//     expect(res.data.getTodos[0]).toHaveProperty('timeBreak');
//     expect(res.data.getTodos[1]).toHaveProperty('_id');
//     expect(res.data.getTodos[1]).toHaveProperty(
//       'todo_name',
//       'testing todo 002'
//     );
//     expect(res.data.getTodos[1]).toHaveProperty('isChecked', false);
//     expect(res.data.getTodos[1]).toHaveProperty('timeWork');
//     expect(res.data.getTodos[1]).toHaveProperty('timeBreak');
//     done();
//   }, 30000);

//   it('update todo => return todo updated', async (done) => {
//     const { mutate, query } = await global.signin();

//     const todo = await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo 002',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     const res = await query({
//       query: UPDATE_TODO,
//       variables: {
//         _id: todo.data.createTodo.todos_list[0],
//         todo_name: 'updated todo',
//         isChecked: true,
//         timeBreak: Date.now(),
//         timeWork: Date.now(),
//       },
//     });

//     expect(res.data).toHaveProperty('updateTodo');
//     expect(typeof res.data.updateTodo).toBe('object');
//     expect(res.data.updateTodo).toHaveProperty(
//       '_id',
//       todo.data.createTodo.todos_list[0]
//     );
//     expect(res.data.updateTodo).toHaveProperty('todo_name', 'updated todo');
//     expect(res.data.updateTodo).toHaveProperty('isChecked', true);
//     expect(res.data.updateTodo).toHaveProperty('timeWork');
//     expect(res.data.updateTodo).toHaveProperty('timeBreak');
//     done();
//   }, 30000);

//   it('delete todo => deleted todo', async (done) => {
//     const { mutate, query } = await global.signin();

//     const todo = await mutate({
//       mutation: CREATE_TODO,
//       variables: {
//         todo_name: 'testing todo',
//         isChecked: false,
//         timeWork: Date.now(),
//         timeBreak: Date.now(),
//       },
//     });

//     const res = await query({
//       query: DELETE_TODO,
//       variables: {
//         _id: todo.data.createTodo.todos_list[0],
//       },
//     });

//     const deletedTodo = await query({
//       query: GET_TODOS,
//     });

//     expect(res.data).toHaveProperty('deleteTodo');
//     expect(typeof res.data.deleteTodo).toBe('object');
//     expect(res.data.deleteTodo).toHaveProperty(
//       '_id',
//       todo.data.createTodo.todos_list[0]
//     );
//     expect(res.data.deleteTodo).toHaveProperty('todo_name', 'testing todo');
//     expect(res.data.deleteTodo).toHaveProperty('isChecked', false);
//     expect(res.data.deleteTodo).toHaveProperty('timeWork');
//     expect(res.data.deleteTodo).toHaveProperty('timeBreak');
//     expect(deletedTodo.data.getTodos).toHaveLength(0);
//     done();
//   }, 30000);
// });
