const db = require("../db/index.js");

async function getUserByUsername(username) {
  const { rows } = await db.query("SELECT * FROM current_users WHERE username = $1", [username]);
  return rows;
}

module.exports = {
  getUserByUsername,
};
