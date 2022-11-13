import mongoose, { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");

let today = Date();
let ObjectId = Schema.ObjectId;
const UserSchema = new Schema(
  {
    data: {
      type: Object,
      names: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
      },
      lastNames: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      phone: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        // match: /^([\w\.\-_]+){4,30}?\w+@uniguajira.edu.co$/gm,
      },
      user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 15,
      },
      pass: {
        type: String,
        required: true,
        trim: true,
        maxlength: 16,
      },
      role: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 3,
      },
    },
    posts: [
      {
        ObjectId,
        user: { type: String },
        body: {
          type: String,
          trim: true,
          maxlength: 222,
        },
        comments: [
          {
            ObjectId,
            user: { type: String },
            comment: { type: String },
            fecha: { type: String },
            postId: { type: Object },
          },
        ],
        likes: 0,
        fecha: { type: String },
      },
    ],

    follows: { type: Array },
    followers: { type: Array },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("data.pass")) return next();
  bcrypt.hash(this.data.pass, 10, (err, passHash) => {
    if (err) return next(err);
    this.data.pass = passHash;
    next();
  });
});

UserSchema.method.comparePass = function (pass, cb) {
  bcrypt.compare(pass, this.data.pass, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

export default models.userModel || model("userModel", UserSchema);
