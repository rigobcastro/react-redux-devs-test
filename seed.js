import seeder from 'mongoose-seed'
import faker from 'faker'
import { times } from 'lodash'

import { DATABASE_URL } from './config'

const documents = []

times(3, () => documents.push({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
}))

const data = [
  {
    model: 'User',
    documents
  }
];

// Connect to MongoDB via Mongoose
seeder.connect(DATABASE_URL, () => {
  seeder.loadModels([
    'src_users/api/models/user.js',
  ]);

  seeder.clearModels(['User'], () => {
    seeder.populateModels(data, function () {
      console.log('populated!');
      process.exit();
    });
  });
});