const { mongoose } = require("./mongoose");



const ReqSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    trim: true
  },
  ReqTo: {
    type: String,
    required: true,
    trim: true
  },
  Message: {
    type: String,
    required: true,
    trim: true
  },
  Shared: {
    type: String,
    required: true,
    trim: true
  },
  Status: {
    type: String,
    required: true,
    trim: true
  }

  
});

ReqSchema.methods.toJSON = function() {
  const data = this;
  const obj = data.toObject();

  return {
    obj,
    User: obj.UserName.toString(),
    _id: undefined,
    __v: undefined
  };
};



const Requests = mongoose.model("requests", ReqSchema);

module.exports = Requests;
