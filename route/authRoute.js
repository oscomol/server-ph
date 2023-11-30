const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/authenticationController");

router.route("/")
    .post(loginUser.login);

module.exports = router;