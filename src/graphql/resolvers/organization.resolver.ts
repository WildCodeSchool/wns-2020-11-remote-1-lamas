import Organizations from '../../database/models/Organization';

export default {
    Query:{
        async getOrganization(_:any, _id:String) {
            const organization = await Organizations.find({ _id });
            console.log(organization)
            return {
                organization
            }
        }
    },
    Mutation: {
      async createOrganization(_:any, organization_name:String ) {
        const organization = await new Organizations(organization_name);
       
        organization.save()
        return {
            organization
        };
      },
    }
  };


//   query {
//     getOrganization(_id:"5fdbf69849792c27dcadfa75") {
//         organization_name
//     }
//   }
  