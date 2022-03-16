const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'parent'
  }
},{
  timestamps:true
});

const Child = mongoose.model("child", ChildSchema);
module.exports = Child;