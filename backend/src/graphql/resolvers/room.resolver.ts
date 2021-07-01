import { Types } from 'mongoose';
import Rooms, { IRoom } from '../../database/models/Room';
import CreationError from '../../errors/CreationError';
import NotFoundError from '../../errors/NotFoundError';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { Icontext } from './types/user.type';


type ID = Types.ObjectId;

interface ICreateRoom {
  name: string;
  owner: ID;
}



export default {
  Query: {
    async getRoom(_: void, roomId: string): Promise<IRoom | null> {
      const room = await Rooms.findById(roomId);

      if (!room) {
        throw new NotFoundError();
      }
      return room;
    },
    async getRooms(_: void): Promise<IRoom[] | null> {
      const room = await Rooms.find();

      if (!room) {
        throw new NotFoundError();
      }
      return room;
    },
  },
  Mutation: {
    async createRoom(
      _: void,
      data: { name: string },
      context: Icontext
    ): Promise<IRoom> {
      if (!context.user.id) throw new UnauthorizedError();

      const newRoom: ICreateRoom = { name: data.name, owner: context.user.id };

      const room = new Rooms(newRoom);

      if (room) {
        await room.save();
        return room;
      }
      throw new CreationError();
    },
  },
};
