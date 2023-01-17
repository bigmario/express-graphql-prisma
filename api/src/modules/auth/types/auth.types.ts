export type LoginType = {
  email: string,
  password: string
}

export type RecoveryType = Pick<LoginType, "email">

export type ChangePasswordType = {
  token: string,
  newPassword: string
}

export type MailType = {
  from: string,
  to: string,
  subject: string,
  html: string,
}
