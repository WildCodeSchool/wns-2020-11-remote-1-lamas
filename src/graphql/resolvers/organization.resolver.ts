import Organizations from '../../database/models/Organization';

// type
// id : String
// organization_name : String

// typegraphQL typegoose

export default {
    Query:{
        async getOrganization(_:any,  _id ) {
            const organization = await Organizations.findOne({ _id }); // find by id

            if (!organization) throw new Error()
            return organization
        }
    },
    Mutation: {
      async createOrganization(_:any, organization_name:String ) {
        const organization:any = new Organizations(organization_name);
        organization.save()
        if (!organization) throw new Error()
        return organization
      },
    }
  };


  // query {
  //   getOrganization(_id:"5fdbf69849792c27dcadfa75") {
  //       organization_name
  //   }
  // }


//   mutation {
//     createOrganization(organization_name:"salut") {
//         organization_name
//     }
//   }
