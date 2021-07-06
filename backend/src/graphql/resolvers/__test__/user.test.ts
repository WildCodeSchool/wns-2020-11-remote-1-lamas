// import { gql } from 'apollo-server';

// const CREATE_USER = gql`
//   mutation(
//     $firstname: String
//     $lastname: String
//     $email: String
//     $password: String
//   ) {
//     createUser(
//       firstname: $firstname
//       lastname: $lastname
//       email: $email
//       password: $password
//     ) {
//       token
//       user {
//         _id
//         firstname
//         lastname
//         email
//         password
//       }
//     }
//   }
// `;

// const FIND_USER = gql`
//   query($userId: ID!) {
//     getUser(_id: $userId) {
//       _id
//       firstname
//       lastname
//       email
//     }
//   }
// `;

// const LOGIN_USER = gql`
//   mutation($email: String, $password: String) {
//     loginUser(email: $email, password: $password) {
//       token
//       user {
//         _id
//         firstname
//         lastname
//         email
//       }
//     }
//   }
// `;

// describe('user test', () => {
//   it('create a new user', async (done) => {
//     const { mutate } = await global.signin();

//     const res = await mutate({
//       mutation: CREATE_USER,
//       variables: {
//         firstname: 'Auguste',
//         lastname: 'Patoune',
//         email: 'patoune@hotmail.fr',
//         password: 'M!dpsuper@72320',
//       },
//     });

//     expect(res.data.createUser).toHaveProperty('user');
//     expect(res.data.createUser).toHaveProperty('token');
//     expect(typeof res.data.createUser.user).toBe('object');
//     expect(res.data.createUser.user).toHaveProperty('_id');
//     expect(res.data.createUser.user).toHaveProperty('firstname', 'Auguste');
//     expect(res.data.createUser.user).toHaveProperty('lastname', 'Patoune');
//     expect(res.data.createUser.user).toHaveProperty(
//       'email',
//       'patoune@hotmail.fr'
//     );
//     expect(res.data.createUser.user).toHaveProperty('password');
//     done();
//   });

//   it('get user', async (done) => {
//     const { mutate, query } = await global.signin();

//     const user = await mutate({
//       mutation: CREATE_USER,
//       variables: {
//         firstname: 'Auguste',
//         lastname: 'Patoune',
//         email: 'patoune@hotmail.fr',
//         password: 'M!dpsuper@72320',
//       },
//     });

//     const userId = user.data.createUser.user._id;

//     const res = await query({
//       query: FIND_USER,
//       variables: { userId },
//     });

//     expect(res.data).toHaveProperty('getUser');
//     expect(typeof res.data.getUser).toBe('object');
//     expect(res.data.getUser).toHaveProperty('_id');
//     expect(res.data.getUser).toHaveProperty('firstname', 'Auguste');
//     expect(res.data.getUser).toHaveProperty('lastname', 'Patoune');
//     expect(res.data.getUser).toHaveProperty('email', 'patoune@hotmail.fr');
//     done();
//   });

//   it('login user => return user with token', async (done) => {
//     const { mutate, query } = await global.signin();

//     await mutate({
//       mutation: CREATE_USER,
//       variables: {
//         firstname: 'Auguste',
//         lastname: 'Patoune',
//         email: 'patoune@hotmail.fr',
//         password: 'M!dpsuper@72320',
//       },
//     });

//     const res = await mutate({
//       query: LOGIN_USER,
//       variables: {
//         email: 'patoune@hotmail.fr',
//         password: 'M!dpsuper@72320',
//       },
//     });

//     expect(res.data).toHaveProperty('loginUser');
//     expect(typeof res.data.loginUser).toBe('object');
//     expect(res.data.loginUser).toHaveProperty('token');
//     expect(res.data.loginUser.user).toHaveProperty('_id');
//     expect(res.data.loginUser.user).toHaveProperty('firstname', 'Auguste');
//     expect(res.data.loginUser.user).toHaveProperty('lastname', 'Patoune');
//     expect(res.data.loginUser.user).toHaveProperty(
//       'email',
//       'patoune@hotmail.fr'
//     );
//     done();
//   });
// });
