
import {makeExecutableSchema} from 'apollo-server'
import {OrganizationType} from "./typeDef"
import {organizationResolver} from './resolvers'
import {ApolloServer} from 'apollo-server-express'

const schema = makeExecutableSchema({
    typeDefs:[OrganizationType],
    resolvers:[organizationResolver],
  });


const serverApollo = new ApolloServer({
    schema: schema
  });


  export default serverApollo