import { Schema, model, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;

const AdminSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      select: false,
    },
    password: {
      type: String,
      trim: true,
      minLength: 8,
      required: true,
      select: false,
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret.password;
    //     return ret;
    //   },
    // },
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

type Admin = InferSchemaType<typeof AdminSchema>;

export default model<Admin>("Admin", AdminSchema);
