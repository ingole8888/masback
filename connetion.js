const { default: mongoose } = require("mongoose")

const connection = async()=>{
   await mongoose.connect('mongodb+srv://sunil:sunil@cluster0.g6orjd8.mongodb.net/raj')
   //mongodb+srv://sunil:sunil@cluster0.g6orjd8.mongodb.net/raj
   console.log('connected successfully')

}

module.exports = connection;