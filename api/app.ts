import express from 'express';
import cors from 'cors';
import {serveGraphql} from './src/server'

export const createApp = async() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  await serveGraphql(app);
  return app
};
