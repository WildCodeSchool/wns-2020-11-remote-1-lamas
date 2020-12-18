import Organizations from '../../database/models/Organization';

// type
// id : String
// organization_name : String

export default {
    Query:{
        async getOrganization(_:any, _id:String) {
            const organization:any = await Organizations.findOne({ _id });
            return {
              id: organization._id,
              ...organization._doc
            }
        }
    },
    Mutation: {
      async createOrganization(_:any, organization_name:String ) {
        const organization:any = new Organizations(organization_name);
        organization.save()
        return {
          id: organization._id,
          ...organization._doc
        };
      },
    }
  };


//   query {
//     getOrganization(_id:"5fdbf69849792c27dcadfa75") {
//         organization_name
//     }
//   }


//   mutation {
//     createOrganization(organization_name:"salut") {
//         organization_name
//     }
//   }
  