import { Post } from './post';
import { User } from './user';

export interface Event {
  usersJoined: string[];
  _id: string;
  name: string;
  date: Date;
  time: string;
  place: string;
  description: string;
  ownerId: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface EventDetails {
  name: string;
  date: Date | null;
  time: string;
  place: string;
  description: string;
}
