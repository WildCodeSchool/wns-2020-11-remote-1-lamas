import mongoose from 'mongoose';

const { Schema } = mongoose;
const RoomSchema = new Schema({
  name: { type: String, required: true },
  user_count: { type: Number },
  emojis_list: {
    Happy: { type: Number },
    Dead: { type: Number },
    Thinking: { type: Number },
    Break: { type: Number },
    SlowDown: { type: Number },
  },
  users_list: [
    {
      user_id: String,
      socket_id: String,
      firstname: String,
      lastname: String,
      mood: String,
      action: Array,
    },
  ],
  chat: [
    {
      firstname: String,
      lastname: String,
      message: String,
      sent_time_message: Date,
    },
  ],
  start_time_video: Date,
});

export default mongoose.model('rooms', RoomSchema);
