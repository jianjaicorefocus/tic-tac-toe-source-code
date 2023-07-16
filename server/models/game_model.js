const mongoose = require("mongoose");

const game_schema = new mongoose.Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  player1wins: {
    type: Number,
    default: 0,
  },
  player2wins: {
    type: Number,
    default: 0,
  },
  draw: {
    type: Number,
    default: 0,
  },
});

module.exports = Game = mongoose.model("game", game_schema);
