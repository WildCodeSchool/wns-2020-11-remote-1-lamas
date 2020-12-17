import mongoose from 'mongoose';

const { Schema } = mongoose;
const OrganizationSchema = new Schema({
  organization_name: { type: String },
  class_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classes',
    },
  ],
});

export default mongoose.model('organizations', OrganizationSchema);
