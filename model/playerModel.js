const { default: mongoose } = require("mongoose");

const playerSchema = new mongoose.Schema({
    username: String,
    ratingHistory:[{}]
});

  const Player = mongoose.model('Player', playerSchema);

  module.exports = Player;