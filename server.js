import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import UserModel from './src_users/api/models/user'

import { DATABASE_URL } from './config'

const app = express();
const port = process.env.PORT || 8080;
const public_path = express.static(__dirname + '/public');
const index_path = __dirname + '/public/index.html';
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router
  .route('/users')
  .get((req, res) => {
    UserModel.find((err, users) => {
      if (err) res.send(err);
      res.json(users);
    });
  })
  .post((req, res) => {
    const user = new UserModel();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.state = req.body.state;

    user.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });

router
  .route('/users/:user_id')
  .get((req, res) => {
    UserModel.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  })
  .put((req, res) => {
    UserModel.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phone = req.body.phone;
      user.state = req.body.state;

      user.save(function (err) {
        if (err) res.send(err);
        res.json(user);
      });
    });
  })
  .delete((req, res) => {
    UserModel.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);

      user.state = user.state === 'inactive' ? 'active': 'inactive';

      user.save((err) => {
        if (err) res.send(err);
        res.json(user);
      });
    });
  });

app.use(public_path);
app.use('/api', router);

app.get('*', (request, response) => {
  response.sendFile(index_path, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log("Listening at http://localhost:" + port);
}

function connect () {
  const options = { server: { socketOptions: { keepAlive: 1 } } };

  return mongoose.connect(DATABASE_URL, options).connection;
}
