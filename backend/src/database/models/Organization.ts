import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IOrganization extends mongoose.Document {
  organization_name: string;
}

const OrganizationSchema = new Schema({
  organization_name: { type: String },
  // class_id: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'classes',
  //   },
  // ],
});

export default mongoose.model<IOrganization>(
  'organizations',
  OrganizationSchema
);
