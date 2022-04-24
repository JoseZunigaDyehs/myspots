import mongoose from "mongoose";

const pointStateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

pointStateSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

export default mongoose.model("PointState", pointStateSchema);
