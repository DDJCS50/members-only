const db = require("../db/index.js");

async function getUserByUsername(username) {
  const { rows } = await db.query("SELECT * FROM current_users WHERE username LIKE ($1)", [`%${username}%`]);
  return rows;
}

async function getUserById(searchedId) {
  const { rows } = await db.query("SELECT * FROM current_users WHERE id=($1)", [searchedId]);
  return rows;
}

async function insertUser(firstName, lastName, username, hashedPassword, adminStatus) {
  await db.query("INSERT INTO current_users (first_name, last_name, username, password, admin_status, membership_status) VALUES ($1, $2, $3, $4, $5, FALSE)", [firstName, lastName, username, hashedPassword, adminStatus]);
}

async function updateUserById(id) {
  await db.query("UPDATE current_users SET membership_status = TRUE WHERE id=($1)", [id]);
}

async function insertMessageById(id, title, message, date) {
  await db.query("INSERT INTO messages (user_id, title, description, date_created) VALUES ($1, $2, $3, $4)", [id, title, message, date]);
}

async function getMessages() {
  const { rows } = await db.query("SELECT * FROM messages");
  return rows;
}

module.exports = {
  getUserByUsername,
  getUserById,
  insertUser,
  updateUserById,
  insertMessageById,
  getMessages,
};
