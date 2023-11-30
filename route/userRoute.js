const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

router.route("/")
    .post(user.createUser)
    .put(user.updateUser)
    .delete(user.deleteUser)

router.route("/:userId")
    .get(user.getUser)

router.route("/recover")
    .post(user.recoverAccount)

module.exports = router;
