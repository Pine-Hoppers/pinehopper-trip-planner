'use strict';
const {
  db,
  models: { User, Activity, Trip, Wishlist },
} = require('../server/db');

const { faker } = require('@faker-js/faker');

/*
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // CREATE USERS
  const randomUsers = [];

  randomUsers.push(
    User.create({
      firstName: 'Nadia',
      lastName: 'Harris',
      username: 'nadia',
      email: 'nadia.khristean@gmail.com',
      password: '123',
    })
  );

  randomUsers.push(
    User.create({
      firstName: 'Christine',
      lastName: 'Zheng',
      username: 'zzz',
      email: 'christine@gmail.com',
      password: '321',
    })
  );

  randomUsers.push(
    User.create({
      firstName: 'Lu',
      lastName: 'Miao',
      username: 'lu',
      email: 'lu@gmail.com',
      password: '111',
    })
  );

  Array.from({ length: 10 }).forEach(() => {
    randomUsers.push(
      User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    );
  });
  const users = await Promise.all(randomUsers);

  console.log(`seeded ${users.length} users`);

  // CREATE TRIPS
  const tripsArr = [
    Trip.create({
      tripName: 'March Yellowstone Trip',
      startDate: '2022-03-11',
      endDate: '2022-03-18',
    }),
    Trip.create({
      tripName: 'April Yellowstone Trip',
      startDate: '2022-04-02',
      endDate: '2022-04-12',
    }),
    Trip.create({
      tripName: 'July Yellowstone Trip',
      startDate: '2022-07-05',
      endDate: '2022-07-19',
    }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2022-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2022-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2023-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2023-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2023-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2023-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2022-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2021-07-19',
    // }),
    // Trip.create({
    //   tripName: 'THE 9th Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2020-07-19',
    // }),
    // Trip.create({
    //   tripName: 'July Yellowstone Trip',
    //   startDate: '2022-07-05',
    //   endDate: '2021-07-19',
    // }),
  ];

  const trips = await Promise.all(tripsArr);

  // ASSOCIATE TRIP WITH USER
  await trips[0].setUser(users[0].id);
  await trips[1].setUser(users[1].id);
  await trips[2].setUser(users[2].id);
  // await trips[3].setUser(users[0].id);
  // await trips[4].setUser(users[0].id);
  // await trips[5].setUser(users[0].id);
  // await trips[6].setUser(users[0].id);
  // await trips[7].setUser(users[0].id);
  // await trips[8].setUser(users[0].id);
  // await trips[9].setUser(users[0].id);
  // await trips[10].setUser(users[0].id);

  console.log(`seeded ${trips.length} trips`);

  // CREATING ACTIVITIES
  const activities = await Promise.all([
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        JSON.stringify({
          credit: '',
          crops: [
            {
              aspectratio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
            {
              aspectratio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
          ],
          altText: 'The Bannock Trail is a mostly flat through mature forest.',
          title: '',
          caption: '',
          url: 'https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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
    Activity.create({
      activity_name: 'Natural Bridge Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-trail-natural-bridge.htm',
      images: [
        JSON.stringify({
          url: 'https://www.nps.gov/common/uploads/cropped_image/F8B3FBE2-1DD8-B71B-0BEF6E7D84F0FE32.jpg',
          credit: '',
          altText: 'Gray stone rock arches over a creek drainage.',
          title: '',
          description: '',
          caption: '',
          crops: [
            {
              aspectRatio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/F8B3FBE2-1DD8-B71B-0BEF6E7D84F0FE32.jpg',
            },
            {
              aspectRatio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/F8B3FBE2-1DD8-B71B-0BEF6E7D84F0FE32.jpg',
            },
          ],
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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
      dateOfActivity: '2022-03-13',
      tripId: trips[0].id,
    }),
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        JSON.stringify({
          credit: '',
          crops: [
            {
              aspectratio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
            {
              aspectratio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
          ],
          altText: 'The Bannock Trail is a mostly flat through mature forest.',
          title: '',
          caption: '',
          url: 'https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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
      dateOfActivity: '2022-04-05',
      tripId: trips[1].id,
    }),
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        JSON.stringify({
          credit: '',
          crops: [
            {
              aspectratio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
            {
              aspectratio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
          ],
          altText: 'The Bannock Trail is a mostly flat through mature forest.',
          title: '',
          caption: '',
          url: 'https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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
      dateOfActivity: '2022-07-10',
      tripId: trips[2].id,
    }),
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        JSON.stringify({
          credit: '',
          crops: [
            {
              aspectratio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
            {
              aspectratio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
          ],
          altText: 'The Bannock Trail is a mostly flat through mature forest.',
          title: '',
          caption: '',
          url: 'https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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
    Activity.create({
      activity_name: 'Bannock Ski Trail',
      activity_id: '8B175753-D37B-4DD5-BF96-00383F7BB46C',
      url: 'https://www.nps.gov/thingstodo/yell-bannock-ski-trail.htm',
      images: [
        JSON.stringify({
          credit: '',
          crops: [
            {
              aspectratio: '3',
              url: 'https://www.nps.gov/common/uploads/cropped_image/primary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
            {
              aspectratio: '1',
              url: 'https://www.nps.gov/common/uploads/cropped_image/secondary/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
            },
          ],
          altText: 'The Bannock Trail is a mostly flat through mature forest.',
          title: '',
          caption: '',
          url: 'https://www.nps.gov/common/uploads/cropped_image/20970C88-BB81-37F7-5FB606A6D4A87D9B.jpeg',
        }),
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
      activity_category: [
        JSON.stringify({
          id: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
          name: 'Skiing',
        }),
      ],
      activityDescription: 'Easiest',
      longDescription:
        '<p>The Bannock Ski Trail is a 2 mile (3.2 km) easy ski that follows the old road bed that once used to supply the mining town of Cooke City, Montana. Begin at Warm Creek picnic area, one mile west of the Northeast Entrance. This trail takes its name from the Bannock band of the Shoshone, who used this route to reach the buffalo grounds of the Great Plains. After crossing Soda Butte Creek, the terrain is mostly flat and the trail traverses open meadows and mixed conifer forests. You will reach the North Absaroka Wilderness approximately one mile (1.6 km) from the trailhead. At two miles (3.2 km) you come to Silver Gate, Montana. From here the road bed is used as a snowmobile route and is good skiing to Cooke City, 3 miles (4.8 km) to the east.</p>\n\n<p><b>Notes:</b> Bison and elk frequent this trail. Federal regulations require you to stay at least 100 yards (91 m) away from bears and wolves, and at least 25 yards (23 m) away from bison and all other wild animals.</p>\n\n<p>Check out the<a href="/thingstodo/yell-bannock-ski-trail.htm#Details" id="CP___PAGEID=5744528,yell-bannock-ski-trail.htm#Details,30639|"> ski trail details and accessibility information</a> at the bottom of this page.</p>',
      additional_category: [
        JSON.stringify({
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        }),
      ],
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

  console.log(`seeded ${activities.length} activities`);

  // CREATE WISHLISTS
  const wishlist1 = Wishlist.build();
  wishlist1.set({
    userId: users[3].id,
    activityId: activities[0].id,
  });
  await wishlist1.save();

  const wishlist2 = Wishlist.build();
  wishlist2.set({
    userId: users[4].id,
    activityId: activities[4].id,
  });
  await wishlist2.save();

  const wishlist3 = Wishlist.create({
    userId: users[5].id,
    activityId: activities[5].id,
  });

  const wishlists = await Promise.all([wishlist1, wishlist2, wishlist3]);
  console.log(`seeded ${wishlists.length} wishlists`);

  console.log(`seeded everything successfully`);

  return {
    users: {
      nadia: users[0],
      christine: users[1],
      lu: users[2],
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

// We export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
