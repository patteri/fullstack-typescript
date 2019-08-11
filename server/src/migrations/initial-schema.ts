import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('item', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('value').notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTableIfExists('item');
};
