exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "ares", password: "yoyoma" },
        { username: "hades", password: "hotinhere" },
        { username: "athena", password: "im smart" },
      ]);
    });
};
