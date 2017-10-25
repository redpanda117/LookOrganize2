const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String },
  email:{ type: String},
  password: { type: String },
  book: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
 }]
});

userSchema.plugin(passLocalMon);

const User = mongoose.model("User", userSchema);

module.exports = User;
