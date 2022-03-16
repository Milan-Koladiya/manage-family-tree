const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
},{
  timestamps:true
});

const Parent = mongoose.model("parent", ParentSchema);
module.exports = Parent;