import mongoose from 'mongoose';

const { Schema } = mongoose;
const OrganizationSchema = new Schema({
  organization_name: { type: String },
  // class_id: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'classes',
  //   },
  // ],
});

export default mongoose.model('organizations', OrganizationSchema);


// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.password;
//         delete ret.__v;
//       }
//     }
//   }
// );