import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IOrganization extends mongoose.Document {
  organization_name: string;
  class_id?: ID[];
}

const OrganizationSchema = new Schema({
  organization_name: { type: String, required: true },
  class_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classes',
    },
  ],
});

export default mongoose.model<IOrganization>(
  'organizations',
  OrganizationSchema
);
