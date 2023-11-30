const dbconn = require("../config/dbconn");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { username, password } = req.query;

    // Use parameterized query to prevent SQL injection
    const checkUsername = "SELECT * FROM tbl_user WHERE BINARY username = ?";
    dbconn.query(checkUsername, [username], async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ msg: "Server error" });
      }

      if (result.length > 0) {
        const user = result[0];

        const match = await bcrypt.compare(password, user?.password);

        if (!match)return res.status(401).json({ msg: "Incorrect password" });
          return res.status(200).json({ msg: user });
      } else {
        return res.status(401).json({ msg: "Username not found" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  login,
};
