import {config as globalConf} from 'dotenv';

globalConf();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL || 'admin',
  smtpPassword: process.env.SMTP_PASSWORD || 'admin',
  smtpPort: process.env.SMTP_PORT || 3000,
  smtpHost: process.env.SMTP_HOST
}
