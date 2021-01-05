import mongoose from 'mongoose';

const { Schema } = mongoose;
const ClassSchema = new Schema({
  class_name: { type: String },
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
});

export default mongoose.model('classes', ClassSchema);
