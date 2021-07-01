export interface IRoom {
  _id: string;
  name: string;
  owner: string;
}

export interface IParams {
  id: string;
  roomId: string;
}
