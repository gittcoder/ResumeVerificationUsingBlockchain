const { mongoose } = require("./mongoose");



const OrgSchema = new mongoose.Schema({
  OrgName: {
    type: String,
    required: true,
    trim: true
  },
  RegNo: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    trim: true
  },
  Phone: {
    type: String,
    required: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    trim: true
  }
});

OrgSchema.methods.toJSON = function() {
  const data = this;
  const obj = data.toObject();

  return {
    obj,
    User: obj.UserName.toString(),
    _id: undefined,
    __v: undefined
  };
};



const OrgReg = mongoose.model("organizations", OrgSchema);

module.exports = OrgReg;
