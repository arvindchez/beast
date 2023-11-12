import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bookings", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table
      .integer("bike_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("bikes");
    table.date("start_at");
    table.date("end_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bookings");
}
