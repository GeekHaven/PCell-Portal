import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', routes);
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully');
    app.listen(
      process.env.PORT ? process.env.PORT : 8080,
      process.env.HOST ? process.env.HOST : '127.0.0.1',
      console.log(
        `listening on http://localhost:${
          process.env.PORT ? process.env.PORT : 8080
        }/`
      )
    );
  })
  .catch((error) => console.log(error.message));
