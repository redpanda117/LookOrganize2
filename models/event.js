const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  body: {
    type: String,
    minlength: 1
  },
  day:{
    type: String,
    required: true
  },
  start:{
      type: String,
      required: true
  },
  end:{
      type:String,
      require: true
  }
});


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
