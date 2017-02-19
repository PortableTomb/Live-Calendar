'user strict';

exports.up = function(knex) {
  return knex.schema.createTable('user_events', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.boolean('going').notNullable().defaultTo('false');
    table.boolean('maybe').notNullable().defaultTo('false');
    table.string('artist_name').notNullable().defaultTo('');
    table.string('venue_name').notNullable().defaultTo('');
    table.string('event_date').notNullable().defaultTo('');
    table.integer('event_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_events');
};
