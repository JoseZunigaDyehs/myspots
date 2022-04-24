import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: true,
    },
    roleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  },
  {
    timestamps: true,
  }
);

permissionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.pointStateId;
  },
});

export default mongoose.model("Permission", permissionSchema);
