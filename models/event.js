const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    minlength: 1
  },
  day:{
    type: Date,
    
  },
  startDate:{
      type:Date,
      
  },
  endDate:{
      type:Date,
    
  }
});


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
