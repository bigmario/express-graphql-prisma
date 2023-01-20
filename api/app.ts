import path from 'path';
import express from 'express';
import cors from 'cors';
import {serveGraphql} from './src/server'
import passport from 'passport';
import { JwtStrategy } from './src/utils/auth/strategies/jwt.strategy';
import { GQLLocalStrategy } from './src/utils/auth/strategies/local-gql.strategy';

export const createApp = async() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  passport.use(JwtStrategy);
  passport.use(GQLLocalStrategy)

  app.use('/images', express.static(path.join(__dirname, '/public')));

  await serveGraphql(app);
  return app
};
