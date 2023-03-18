import mongoose from "mongoose";

// export class User {
//   email: string;
//   password: string;
// }

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: { type: String, select: false },
  name: String,
  id: Number,
  username: String,
  street: String,
  suite: String,
  city: String,
  zip: String,
  phone: String,
  website: String,
  company: String, 
});

export interface IUser {
  email: string,
  password?: string,
  name: string,
  id: number,
  username: string,
  street: string,
  suite: string,
  city: string,
  zip: string,
  phone: string,
  website: string,
  company: string, 
}

export const User = mongoose.model<IUser>("Users", UserSchema);