import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  password: string;
  room_list?: ID[];
  todos_list?: ID[];
  organization_id?: ID[];
}

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  room_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rooms',
    },
  ],
  todos_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'todos',
    },
  ],
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations',
    required: true,
  },
});

export default mongoose.model<IUser>('users', UserSchema);
