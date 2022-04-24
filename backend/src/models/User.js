import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    crews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crew" }],
    points: [{ type: mongoose.Schema.Types.ObjectId, ref: "Point" }],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.createdAt;
  },
});

export default mongoose.model("User", userSchema);
