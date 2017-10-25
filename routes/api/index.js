const router = require("express").Router();
const authRoutes = require("./auth");
const noteRoutes = require("./notes");

// Auth routes
router.use("/auth", authRoutes);
// note routes
router.use("/notes", noteRoutes);

module.exports = router;
