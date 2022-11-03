/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      user_name: "test user",
      user_email: "abc@ccp6team3.com",
      user_password: "0123456789",
    },
  ]);
};
