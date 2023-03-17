const db = require("../../data/db-config");

function getAll() {
  return db("users").select("user_id", "name", "surname", "email");
}

async function getById(id) {
  const insertedId = await db("users").where({ user_id: id }).first();
  let newObje = {
    user_id: insertedId.user_id,
    name: insertedId.name,
    surname: insertedId.surname,
    email: insertedId.email,
  };
  return newObje;
}

function getByFilter(filter) {
  return db("users").where(filter).first();
}

async function create(payload) {
  const insertedId = await db("users").insert(payload);
  return getById(insertedId[0]);
}

async function updateUser(id, user) {
  await db("users").where({ user_id: id }).update(user);
  return getById(id);
}
async function deleteById(id) {
  const deletedUser = await getById(id);
  await db("users").where({ user_id: id }).del();
  return deletedUser;
}

module.exports = {
  getAll,
  getById,
  getByFilter,
  create,
  updateUser,
  deleteById,
};
