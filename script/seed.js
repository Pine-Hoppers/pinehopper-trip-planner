"use strict";
import { faker } from "@faker-js/faker";

const {
  db,
  models: { User },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users

  // ** Boilerplate format
  const randomUsers = [];

  randomUsers.push(
    User.create({
      email: "nadia.khristean@gmail.com",
      password: "123",
      firstName: "Nadia",
      lastName: "Harris",
    })
  );

  randomUsers.push(
    User.create({
      email: "christine@gmail.com",
      password: "321",
      firstName: "Christine",
      lastName: "Zheng",
    })
  );

  randomUsers.push(
    User.create({
      email: "lu@gmail.com",
      password: "111",
      firstName: "Lu",
      lastName: "Miao",
    })
  );

  Array.from({ length: 10 }).forEach(() => {
    randomUsers.push(
      User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      })
    );
  });

  const users = await Promise.all(randomUsers);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
