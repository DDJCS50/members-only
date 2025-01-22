const db = require("../db/index.js");

async function getAllCategories() {
  const { rows } = await db.query("SELECT * FROM categories");
  return rows;
}

module.exports = {
  getAllCategories,
};
