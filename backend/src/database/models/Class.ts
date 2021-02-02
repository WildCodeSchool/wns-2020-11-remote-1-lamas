import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IClass extends mongoose.Document {
  class_name: string;
  user_id?: ID[];
}

const ClassSchema = new Schema({
  class_name: { type: String, required: true },
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
});

export default mongoose.model<IClass>('classes', ClassSchema);
