const { SchemaComposer } = require('graphql-compose');
const { orgMutation } = require('./testgraph');



const SchemaComposerExemple = new SchemaComposer();

// capaSchemaComposer.Query.addFields(
//     {...userQuery, ...photoQuery}
//   );
  

  capaSchemaComposer.Mutation.addFields(
    {...orgMutation}
  );

  const graphqlSchema = capaSchemaComposer.buildSchema();

  export {graphqlSchema}