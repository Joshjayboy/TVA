import mongoose from "mongoose";

const User2Schema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add a full name"],
    },
    lastname: {
      type: String,
      required: [true, "Please add a full name"],
    },
    middlename: {
      type: String,
      required: [true, "Please add a full name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User2", User2Schema);
