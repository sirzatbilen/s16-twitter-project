/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").truncate();
  await knex("tweets").truncate();
  await knex("users").truncate();

  await knex("users").insert([
    {
      name: "şirzat",
      surname: "bilen",
      email: "sirzatbilen@gmail.com",
      password: "$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi",
    },
  ]);
  await knex("tweets").insert([{ user_id: 1, text: "merhaba dünya" }]);
  await knex("comments").insert([
    {
      content: "hello word",
      user_id: 1,
      tweet_id: 1,
    },
  ]);
};
