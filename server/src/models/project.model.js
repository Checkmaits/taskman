import { model, Schema } from "mongoose";

const collaboratorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Collaborator user (collaborator.user) is required"],
  },
  role: {
    type: String,
    enum: {
      values: ["editor", "viewer"],
      message: 'Collaborator role (collaborator.role) must be either "editor" or "viewer"',
    },
    default: "viewer",
  },
});

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    minlength: [2, "Project name must be at least 2 character long"],
    maxlength: [255, "Project name cannot be more than 255 characters long"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    minlength: [3, "Project description must be at least 3 character long"],
    maxlength: [500, "Project description cannot be more than 500 characters long"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Project owner is required"],
  },
  collaborators: [{ type: collaboratorSchema }],
});

export default model("Project", projectSchema);
