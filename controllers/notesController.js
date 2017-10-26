const db = require("../models");

// Defining methods for the NotesController
module.exports = {
  findAll: function (req, res) {
    if (req.user) {
      const username = req.params.id;
      db.Note
        .find( {user: username})
        .sort({ date: -1 })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  findById: function (req, res) {
    if (req.user) {
      const username = req.params.id;
      db.Note
        .findById({user: username})
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));

    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  create: function (req, res) {
    if (req.user) {
      const person = req.body.username; 
      const newNote = new db.Note(req.body);
      newNote.save(function(err, doc){
        if(err){
          res.send(err);
        }else{
          db.User
          .findOneAndUpdate(
            { username: person }, 
            { $push: { note: doc._id } }, 
            { new: true }
          )
          .then(dbModel => res.json({results: dbModel, sess: req.session}))
          .catch(err => res.status(422).json(err));
        };
      });
    }else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  update: function (req, res) {
    if (req.user) {
      db.Note
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));

    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  remove: function (req, res) {
    if (req.user) {
      db.Note
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  }
};
