import Organization from '../database/models/Organization';

exports.addOrganization = ({ organization_name }) => {
    try {
        const newOrganization = new Organization({
            organization_name: organization_name
        })
        return newOrganization.save()
    } catch (error) {
      throw error
    }
  }


// query addOrganization($courseID: Int!) {
//     course(id: $courseID) {
//         title
//         author
//         description
//         topic
//         url
//     }
// }