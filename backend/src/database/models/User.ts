import mongoose, { HookNextFunction, Types } from 'mongoose';
import bcrypt from 'bcrypt';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  todos_list?: ID[];
}

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'todos',
    },
  ],
});

// eslint-disable-next-line func-names
UserSchema.pre<IUser>('save', async function (next: HookNextFunction) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export default mongoose.model<IUser>('users', UserSchema);
