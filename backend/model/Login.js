const { mongoose } = require("./mongoose");



const LoginSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    trim: true
  },
  FirstName: {
    type: String,
    required: true,
    trim: true
  },
  LastName: {
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
  Gender: {
    type: String,
    required: true,
    trim: true
  }
});

LoginSchema.methods.toJSON = function() {
  const data = this;
  const obj = data.toObject();

  return {
    obj,
    User: obj.UserName.toString(),
    _id: undefined,
    __v: undefined
  };
};



const Login = mongoose.model("login", LoginSchema);

module.exports = Login;
