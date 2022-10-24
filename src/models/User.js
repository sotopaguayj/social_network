import { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlength: 20,
    },
    pass: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
    },
    role: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      maxlength: 3,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("pass")) return next();
  bcrypt.hash(this.pass, 10, (err, passHash) => {
    if (err) return next(err);
    this.pass = passHash;
    next();
  });
});

UserSchema.method.comparePass = function (pass, cb) {
  bcrypt.compare(pass, this.pass, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

export default models.userModel || model("userModel", UserSchema);
