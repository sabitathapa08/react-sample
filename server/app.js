import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from './src/models';
import routes from './src/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('*', cors()); // include before other routes

app.use('/users', routes.users);
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
