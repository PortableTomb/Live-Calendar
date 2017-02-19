'user strict';

exports.seed = function(knex) {
  return knex('user_events').del()
    .then(() => {
      return knex('user_events').insert([{
        id: 1,
        user_id: 2,
        going: true,
        maybe: false,
        artist_name: "Louis The Child",
        venue_name: "Showbox at the Market",
        event_date: ('2016-12-01T00:00:00'),
        event_id: 2856468,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 2,
        user_id: 2,
        going: false,
        maybe: true,
        artist_name: "State Champs",
        venue_name: "Showbox SoDo",
        event_date: ("2016-12-01T00:00:00"),
        event_id: 2831614,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM user_events));"
      );
    });
};
