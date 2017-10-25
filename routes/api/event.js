const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/events"
router.route("/")
.post(eventsController.create)
  .get(eventsController.findAll);
  

// Matches with "/api/events/:id"
router
  .route("/:id")
  .post(eventsController.create)
  .get(eventsController.findById)
  .put(eventsController.update)
  .delete(eventsController.remove);

module.exports = router;
