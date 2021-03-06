import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

// config env
config();

const app = express();
//
app.use(json());
app.use(urlencoded({ extended: false }));
// cors
app.use(cors());
// enable logging
app.use(morgan('dev'));
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' });
  next();
});

// router setup
import routers from './routers';
routers(app);

export default app;
