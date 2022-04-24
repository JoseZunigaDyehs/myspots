import mongoose from "mongoose";

const pointSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    isPublic: { type: Boolean, trim: true, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "PointState" },
    usersShared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

pointSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.pointStateId;
  },
});

export default mongoose.model("Point", pointSchema);
