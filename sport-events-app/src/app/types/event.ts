import { Post } from './post';
import { User } from './user';

export interface Event {
  usersJoined: [];
  _id: string;
  name: string;
  date: Date;
  time: string;
  place: string;
  ownerId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
