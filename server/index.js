import express from 'express';
import db from './config/sql.config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', routes);

const initApp = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Database Connected');
    app.listen(
      process.env.PORT ? process.env.PORT : 8080,
      process.env.HOST ? process.env.HOST : '127.0.0.1',
      console.log(
        `listening on http://localhost:${
          process.env.PORT ? process.env.PORT : 8080
        }/`
      )
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error.original);
  }
};
initApp();
