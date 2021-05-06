import Rooms, { IRoom } from '../../database/models/Room';

export default {
  Query: {
    async getRoom(_: void, roomId: string): Promise<IRoom | null> {
      const room = await Rooms.findById(roomId);
      return room;
    },
  },
  Mutation: {
    async createRoom(_: void, roomName: string): Promise<IRoom> {
      const room = new Rooms(roomName);
      await room.save();
      return room;
    },
  },
};
