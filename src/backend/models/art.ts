import { Schema, model, Document } from "mongoose";
import "./admin";

export interface Art {
  title: string;
  art: string; // url to image
  description: string;
}

export interface ArtModel extends Art, Document {}

const ArtSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    art: { type: String, required: true },
    description: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

export default model<ArtModel>("Art", ArtSchema);
