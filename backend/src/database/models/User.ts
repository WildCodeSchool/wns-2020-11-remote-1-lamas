import mongoose from 'mongoose';

const { Schema } = mongoose;
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

export default mongoose.model('users', UserSchema);
