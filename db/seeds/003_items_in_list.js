/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items_in_list").del();
  await knex("items_in_list").insert([
    { list_id: 1, item_name: "onions", quantity: 5, purchased: false },
    { list_id: 1, item_name: "garlic", quantity: 3, purchased: true },
    {
      list_id: 1,
      item_name: "butternut squash",
      quantity: 2,
      purchased: false,
    },
    { list_id: 2, item_name: "butter", quantity: 1, purchased: false },
    { list_id: 2, item_name: "heavy cream", quantity: 1, purchased: true },
    { list_id: 2, item_name: "sour cream", quantity: 2, purchased: false },
  ]);
};
