import { Example, Get, Request, Route, Security, Tags } from 'tsoa'
import User, { SessionResponse } from '../models/User'
import { sessionExample } from './Examples/sessionExample'
import express from 'express'

@Route('api/session')
@Tags('Session')
@Security('bearerAuth')
export class sessionController {
  @Get('/')
  @Example<SessionResponse>(sessionExample)
  async getSessionInfo(@Request() req: express.Request): Promise<SessionResponse> {
    const { email } = req.user!
    let existingUser = await User.findOne({ email })
    if (!existingUser) throw { code: 403, message: 'User Does not exist' }

    let newUser = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    }

    return newUser
  }
}
