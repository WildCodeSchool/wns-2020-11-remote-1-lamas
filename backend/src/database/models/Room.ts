import mongoose from 'mongoose';

const { Schema } = mongoose;
export interface IRoom extends mongoose.Document {
  name: string;
  owner: string;
}

const RoomSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
});

export default mongoose.model<IRoom>('rooms', RoomSchema);
