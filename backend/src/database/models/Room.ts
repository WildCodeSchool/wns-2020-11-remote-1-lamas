import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

type UserListType = {
  user_id: ID;
  socket_id: string;
  firstname: string;
  lastname: string;
  mood?: string;
  action?: string[];
};

type ChatType = {
  firstname: string;
  lastname: string;
  message: string;
  sent_time_message: Date;
  user_id: ID;
};

export interface IRoom extends mongoose.Document {
  name: string;
  user_count: number;
  emojis_list: {
    Happy: number;
    Dead: number;
    Thinking: number;
    Break: number;
    SlowDown: number;
  };
  users_list?: UserListType[];
  chat?: ChatType[];
  start_time_video?: Date;
}

const RoomSchema = new Schema({
  name: { type: String, required: true },
  user_count: { type: Number, default: 0, required: true },
  emojis_list: {
    Happy: { type: Number, default: 0, required: true },
    Dead: { type: Number, default: 0, required: true },
    Thinking: { type: Number, default: 0, required: true },
    Break: { type: Number, default: 0, required: true },
    SlowDown: { type: Number, default: 0, required: true },
  },
  users_list: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      socket_id: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      mood: String,
      actions: Array,
    },
  ],
  chat: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      message: { type: String, required: true },
      sent_time_message: { type: Date, default: Date.now(), required: true },
    },
  ],
  start_time_video: { type: Date },
});

export default mongoose.model<IRoom>('rooms', RoomSchema);
