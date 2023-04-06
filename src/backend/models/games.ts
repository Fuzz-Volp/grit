import { Schema, model, Document } from "mongoose";
import "./admin";

export interface Game {
  title: string;
  game: string; // url to pdf
  description: string;
  content: string;
}

export interface GameModel extends Game, Document {}

const GameSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    game: { type: String, required: true },
    description: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

export default model<GameModel>("Game", GameSchema);
