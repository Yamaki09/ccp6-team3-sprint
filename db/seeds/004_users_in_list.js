/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users_in_list").del();
  await knex("users_in_list").insert([
    { list_id: 1, user_id: 1 },
    { list_id: 2, user_id: 1 },
  ]);
};
