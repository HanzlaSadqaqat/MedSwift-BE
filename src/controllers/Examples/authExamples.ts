import { LoginResponse, SignupResponse, verifyResponse } from '../../models/User'

export const signupExample: SignupResponse = {
  code: 200,
  message: 'Signed Up Successfully'
}
export const LoginExample: LoginResponse = {
  accessToken: 'JWT Token',
  refreshToken: 'JWT Token',
  code: 200,
  message: 'Signed Up Successfully'
}

export const verificationExample: verifyResponse = {
  code: 200,
  message: 'Your account is verified successfully'
}
