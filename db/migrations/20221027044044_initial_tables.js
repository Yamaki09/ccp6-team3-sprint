/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("user_name", 32);
    table.string("user_email", 32);
    table.binary("user_pro_pic");
    table.string("user_password", 64);
  });
  await knex.schema.createTable("lists", (table) => {
    table.increments("id").primary();
    table.string("list_name", 64);
    table.integer("list_owner").references("id").inTable("users");
  });
  await knex.schema.createTable("items_in_list", (table) => {
    table.integer("list_id").references("id").inTable("lists");
    table.string("item_name", 32);
    table.integer("quantity").notNullable();
    table.boolean("purchased");
  });
  await knex.schema.createTable("users_in_list", (table) => {
    table.integer("list_id").references("id").inTable("lists");
    table.integer("user_id").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("items_in_list");
  await knex.schema.dropTable("users_in_list");
  await knex.schema.dropTable("lists");
  await knex.schema.dropTable("users");
};
