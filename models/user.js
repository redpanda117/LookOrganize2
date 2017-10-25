const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String },
  email:{ type: String},
  password: { type: String },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
 }],
  finance: [{
    type: Schema.Types.ObjectId,
    ref: "Finance"
}],
  event: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
}],
});

userSchema.plugin(passLocalMon);

const User = mongoose.model("User", userSchema);

module.exports = User;
