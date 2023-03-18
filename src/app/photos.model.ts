import mongoose from "mongoose";

// export class User {
//   email: string;
//   password: string;
// }

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  path: String,
  id: Number,
});

export interface IPhotos {
  name: string;
  path: string;
  id: number;
}

export const Photos = mongoose.model<IPhotos>("Photos", PhotoSchema);
