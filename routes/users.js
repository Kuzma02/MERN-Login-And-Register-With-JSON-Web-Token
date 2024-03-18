const express = require("express");
const router = express.Router();

const { dashboard, getAllUsers } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/all").get(authMiddleware, getAllUsers);


module.exports = router;