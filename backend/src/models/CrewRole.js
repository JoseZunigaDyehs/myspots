import mongoose from "mongoose";

const crewRolesSchema = new mongoose.Schema({
  crewId: { type: mongoose.Schema.Types.ObjectId, ref: "Crew" },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

crewRolesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

export default mongoose.model("CrewRoles", crewRolesSchema);
