const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
},
  { timestamps: true }
)

const AuthModel = mongoose.model("newuserdata", userSchema)


module.exports = AuthModel