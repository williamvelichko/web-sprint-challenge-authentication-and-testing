const db = require("../../data/dbConfig");

async function get() {
  return db("users");
}

async function getById(id) {
  return db("users").where("id", id).first();
}

function getBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  let [id] = await db("users").insert(user);

  return getById(id);
}

module.exports = {
  get,
  getBy,
  getById,
  add,
};
