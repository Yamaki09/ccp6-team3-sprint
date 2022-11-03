/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("lists").del();
  await knex("lists").insert([
    { list_name: "butternut squash soup", list_owner: 1 },
    { list_name: "creamy", list_owner: 1 },
  ]);
};
