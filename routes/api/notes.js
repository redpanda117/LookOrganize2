const router = require("express").Router();
const notesController = require("../../controllers/notesController");

// Matches with "/api/notes"
router.route("/")
.post(notesController.create)
  .get(notesController.findAll);
  

// Matches with "/api/notes/:id"
router
  .route("/:id")
  .post(notesController.create)
  .get(notesController.findById)
  .put(notesController.update)
  .delete(notesController.remove);

module.exports = router;
