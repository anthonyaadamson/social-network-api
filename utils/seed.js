const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomApplications } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let applicationCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (applicationCheck.length) {
    await connection.dropCollection('thougts');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  const UserOne = {
    username: 'MisterMoose',
    email: 'MisterMoose@email.com'
  }

  await User.collection.insert(UserOne);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
