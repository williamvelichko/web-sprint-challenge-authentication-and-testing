exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "jerry",
          password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6IndpbGxpYW0iLCJpYXQiOjE2NDU4MTE3NzIsImV4cCI6MTY0NTg5ODE3Mn0.rHGKvgrCYh57GXKzAJzo-Kwb6ak6M3m1e4HAYstgcG4",
        },
      ]);
    });
};
