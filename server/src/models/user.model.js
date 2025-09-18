import { model, Schema } from "mongoose";
import { hash } from "bcryptjs";

const nameSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "User first name (name.first_name) is required"],
    minlength: [1, "User firstname (name.first_name) must be at least 1 character long"],
    maxlength: [100, "User firstname (name.first_name) cannot be more than 100 characters long"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "User last name (name.last_name) is required"],
    minlength: [1, "User lastname (name.last_name) must be at least 1 character long"],
    maxlength: [100, "User lastname (name.last_name) cannot be more than 100 characters long"],
    trim: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: nameSchema,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      minlength: [5, "User email must be at least 5 characters long"],
      maxlength: [254, "User email cannot be more than 254 characters long"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "User email must be a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [8, "User password must be at least 8 characters long"],
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 12);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await hash(update.password, 12);
    this.setUpdate(update);
  }

  next();
});

export default model("User", userSchema);
