const router = require("express").Router();
const financeController = require("../../controllers/financeController");

// Matches with "/api/finance"
router.route("/")
.post(financeController.create)
  .get(financeController.findAll);
  

// Matches with "/api/finance/:id"
router
  .route("/:id")
  .post(financeController.create)
  .get(financeController.findById)
  .put(financeController.update)
  .delete(financeController.remove);

module.exports = router;
