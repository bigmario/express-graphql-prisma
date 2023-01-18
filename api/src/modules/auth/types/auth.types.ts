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
  from: string | undefined,
  to: string | undefined,
  subject: string | undefined,
  html: string | undefined,
}
