const dbconn = require("../config/dbconn");
const bcrypt = require('bcrypt');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const createUser = async (req, res) => {
  const { username, password } = req.query;
  
  const sql = "INSERT INTO tbl_user(username, password, recovery) VALUES(?,?, ?)";
  const hashedPwd = await bcrypt.hash(password, 10);
  const randomString = generateRandomString(10);
  await dbconn.query(sql, [username, hashedPwd, randomString], (err, result) => {
    if(err) return res.status(500).json({msg: "Server error"});
    res.status(200).json({id: result.insertId, PIN: randomString});
  })
};

const getUser = async (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT * FROM tbl_user WHERE id=?";
    await dbconn.query(sql, [userId], (err, result) => {
      if(err) return res.status(500).json({msg: "Server error"});
      res.status(200).json(result);
    })
}

const updateUser = async (req, res) => {
  const { username, password, id } = req.query;

  const sql = "UPDATE tbl_user SET username=?, password=? WHERE id=?";
  const hashedPwd = await bcrypt.hash(password, 10);
    await dbconn.query(sql, [username, hashedPwd, id], (err, result) => {
      if(err) {
        console.log(err)
        return res.status(500).json({msg: "Server error"});
      }
      res.status(200).json({msg: "Updated succesfully"});
    })
}

const deleteUser = async (req, res) => {
  const { id } = req.query;

  const sql = "DELETE FROM tbl_user WHERE id=?";
    await dbconn.query(sql, [id], (err, result) => {
      if(err) {
        console.log(err)
        return res.status(500).json({msg: "Server error"});
      }
      res.status(200).json({msg: "Account Deleted Succesfully"});
    })
}



module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};
