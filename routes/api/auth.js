const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/api/auth"
router.route("/login")
  .post(authController.doLogin);

  router.route("/register")
  .post(authController.doRegister);

  router.route("/logout")
  .get(authController.logout)
  
module.exports = router;
