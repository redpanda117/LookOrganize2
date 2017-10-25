const router = require("express").Router();
const authRoutes = require("./auth");
const noteRoutes = require("./notes");
const eventRoutes = require("./event");
const financeRoutes = require("./finance");

// Auth routes
router.use("/auth", authRoutes);
// note routes
router.use("/notes", noteRoutes);
//event routes
router.use("/schedule", eventRoutes);
//finance routes
router.use("/finance", financeRoutes);

module.exports = router;
