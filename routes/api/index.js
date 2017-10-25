const router = require("express").Router();
const authRoutes = require("./auth");
const noteRoutes = require("./notes");
const eventRoutes = require("./event");

// Auth routes
router.use("/auth", authRoutes);
// note routes
router.use("/notes", noteRoutes);

router.use("/schedule", eventRoutes);

module.exports = router;
