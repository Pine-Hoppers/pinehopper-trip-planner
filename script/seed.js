'use strict';

import { faker } from '@faker-js/faker';

const {
  db,
  models: { User, Activity },


} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users


  const activities = await Promise.all([
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        `{
          credit: "",
          crops: [
            {
              aspectratio: "3",
              url: "https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg",
            },
            {
              aspectratio: "1",
              url: "https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg",
            },
          ],
          altText: "The Bannock Trail is a mostly flat through mature forest.",
          title: "",
          caption: "",
          url: "https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg",
        }`,
      ],
      park_fullName: 'Yellowstone National Park',
      park_url: 'https://www.nps.gov/yell/index.htm',
      parkCode: 'yell',
      isReservationRequired: 'false',

      feeDescription: '',
      doFeesApply: 'false',
      arePetsPermittedWithRestrictions: 'false',
      petsDescription:
        'Qualified service animals are welcome throughout the park and in all park facilities. However, they must be leashed and under your control at all times. This trail requires a backcountry access pass for service animals.<br />\n<br />\n<br />\n ',
      activity_category: 'Skiing',
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: 'Trails',
      duration: '1-2 Hours',
      accessibilityInformation:
        '<p>This skier-tracked easy trail follows a fairly flat old road after crossing a narrow bridge over Soda Butte Creek at the trailhead. The trail elevation gain/loss is 132 feet. Service dogs allowed with backcountry access permit.</p>',

      tags: [
        'Yellowstone National Park',
        'Yellowstone National Park ski trail',
        'ski trail',
        'snowshoe trail',
        'snowshoeing',
        'cross country skiing',
        'Northeast Area',
        'easy ski',
        'forested trail',
        'mountains',
        'recreation',
        'winter recreation',
      ],
    }),
  ]);

  const randomUsers = [];

  randomUsers.push(
    User.create({
      firstName: 'Nadia',
      lastName: 'Harris',
      email: 'nadia.khristean@gmail.com',
      password: '123',
    })
  );

  randomUsers.push(
    User.create({
      firstName: 'Christine',
      lastName: 'Zheng',
      email: 'christine@gmail.com',
      password: '321',
    })
  );

  randomUsers.push(
    User.create({
      firstName: 'Lu',
      lastName: 'Miao',
      email: 'lu@gmail.com',
      password: '111',
    })
  );

  Array.from({ length: 10 }).forEach(() => {
    randomUsers.push(
      User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    );
  });

  const users = await Promise.all(randomUsers);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
    nadia: users[0],
      christine: users[1],
    },
    activities: {
      'Bannock Ski Trail': activities[0],

    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
