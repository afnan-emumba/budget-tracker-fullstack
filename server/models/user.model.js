import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
    },
    gender: {
      type: String,
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/,
        "Please fill a valid website URL",
      ],
    },
    phoneNumber: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"],
    },
    education: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
      match: [/^\d{5}(-\d{4})?$/, "Please fill a valid zip code"],
    },
    dateOfBirth: {
      type: String,
    },
    budgetLimit: {
      type: Number,
      required: true,
      min: 1,
      max: 99999999,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
