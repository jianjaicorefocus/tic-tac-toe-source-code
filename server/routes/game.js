const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

var jsonParser = bodyParser.json();

const Game = require("../models/game_model");

router.get("/", (req, res) => {
  Game.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((games) => res.json(games))
    .catch((err) => res.status(404).json({ err: "No Game Found" }));
});

router.post("/create-game", jsonParser, (req, res) => {
  Game.create(req.body)
    .then((game) =>
      res.json({ msg: "Game is successfully created", gameid: game._id })
    )
    .catch((err) =>
      res.status(400).json({
        error: "Unable to add this game session",
        errormsg: err.message,
      })
    );
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(404).json({ err: "No Game found" }));
});

router.put("/:id", jsonParser, (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then((game) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});
module.exports = router;
