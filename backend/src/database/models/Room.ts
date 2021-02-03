import mongoose from 'mongoose';

const { Schema } = mongoose;
const RoomSchema = new Schema({
  name: { type: String, required: true },
  user_count: { type: Number },
  emojis_list: {
    happy: { type: Number },
    dead: { type: Number },
    thinking: { type: Number },
    coffee: { type: Number },
    slowDown: { type: Number },
    question: { type: Number },
  },
  users_list: [
    {
      user_id: String,
      socket_id: String,
      firstname: String,
      lastname: String,
      mood: String,
      actions: Array,
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
