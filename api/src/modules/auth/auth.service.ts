import {unauthorized} from '@hapi/boom';
import { hash, compare } from 'bcrypt';
import { Secret, sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';

import {config} from '../../core/config';
import { UpdateUSerDto } from '../users/dto/updateUser.dto';
import { ResolverContext } from '../users/types/user.types';
import { UserService } from '../users/users.service';
import { ChangePasswordType, LoginType, MailType, RecoveryType } from './types/auth.types';
const service = new UserService();

export class AuthService {
  constructor() {}

  async getUser(parent: unknown, args: LoginType, context: ResolverContext) {
    const user = await service.findByEmail(parent, args, context);
    if (!user) {
      throw unauthorized();
    }

    const isMatch = await compare(args.password, user.session?.password as string);

    if (!isMatch) {
      throw unauthorized();;
    }

    return user;
  }

  signToken(user: any) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const access_token = sign(payload, config.jwtSecret as Secret);
    return {
      user,
      access_token
    };
  }

  async sendRecovery(parent: unknown, args: UpdateUSerDto, context: ResolverContext) {
    const user = await service.findByEmail(parent, args, context);
    if (!user) {
      throw unauthorized();
    }
    const payload = { sub: user.id };
    const token = sign(payload, config.jwtSecret as Secret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(parent, {id: user.id, dto: {recoveryToken: token}}, context);

    const mail: MailType = {
      from: config.smtpEmail,
      to: `${user.session?.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(
    parent: unknown,
    args: ChangePasswordType,
    context: ResolverContext) {
    try {
      const payload = verify(args.token, config.jwtSecret as Secret);
      const payloadId = payload.sub as string

      const user = await service.findOne(
        parent,
        {
          id: payloadId
        },
        context
      );

      if (user.session.recoveryToken !== args.token) {
        throw unauthorized();
      }
      const hashpass = await hash(args.newPassword, 10);

      await service.update(
        parent,
        {
          id: user.id,
          dto: {
            recoveryToken: null,
            password: hashpass,
          }
        },
        context);
      return 'Password changed';
    } catch (error) {
      throw unauthorized();
    }
  }

  async sendMail(infoMail: MailType) {
    const mailOptions = {
      host: config.smtpHost,
      secure: false,
      port: config.smtpPort as number,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      }
    }
    const transporter = createTransport(mailOptions);
    await transporter.sendMail(infoMail);
    return 'Mail Succesfully Sent';
  }
}
