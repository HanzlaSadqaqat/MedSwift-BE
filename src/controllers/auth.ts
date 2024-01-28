import User, { LoginDetailResponse, LoginResponse, SignupResponse, UserDocument, verifyResponse } from '../models/User'
import * as bcrypt from 'bcrypt'
import { generateAccessToken } from '../utils/generateAccessToken'
import { BodyProp, Example, FormField, Get, Post, Query, Route, Tags, UploadedFile } from 'tsoa'
import { LoginExample, signupExample, verificationExample } from './Examples/authExamples'
import { generateRefreshToken } from '../utils/generateRefreshToken'
import { sendEmail } from '../utils/sendEmail'
import randomstring from 'randomstring'
import { uploader } from '../utils/s3Utils'

@Route('api/auth')
@Tags('Auth')
export class AuthController {
  @Post('/signup')
  @Example<SignupResponse>(signupExample)
  async signup(
    @FormField() name,
    @FormField() email,
    @FormField() password,
    @FormField() conformPassword,
    @FormField() role
  ): Promise<SignupResponse> {
    const existingUser: UserDocument | null = await User.findOne({ email })

    if (existingUser) {
      throw {
        code: 403,
        message: 'User Already Exists'
      }
    }
    const check: boolean = password === conformPassword
    if (!check)
      throw {
        code: 403,
        message: 'Conform password not matched'
      }
    //create hash of your password
    const hashPassword = await bcrypt.hash(password, 10)

    //create new user
    const newUser: UserDocument = new User({ name: name, email: email, password: hashPassword, role: role })

    newUser.verified = false

    await newUser.save()
    return {
      code: 200,
      message: 'User Created Successfully'
    }
  }

  @Post('/login')
  @Example<LoginResponse>(LoginExample)
  async login(@BodyProp() email, @BodyProp() password): Promise<LoginResponse> {
    const existingUser: UserDocument | null = await User.findOne({ email })
    if (!existingUser) {
      throw {
        code: 403,
        message: 'invalid Login Details'
      }
    }
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch)
      throw {
        code: 403,
        message: 'invalid Login Details'
      }

    if (existingUser.verified === false)
      throw {
        code: 403,
        message: 'Please Verify Your Email Account!'
      }
    //login token generate

    const accessToken: string = generateAccessToken({ email: existingUser.email, id: existingUser._id })
    const refreshToken: string = generateRefreshToken({ email: existingUser.email, id: existingUser._id })
    return {
      code: 200,
      accessToken,
      refreshToken,
      message: 'You login successfully'
    }
  }
  @Post('/email/verify')
  @Example<verifyResponse>(verificationExample)
  async verifyEmail(@BodyProp() email: string, @BodyProp() verificationCode: string) {
    const user: UserDocument | null = await User.findOne({ email })
    if (!user)
      throw {
        code: 403,
        message: 'Invalid Details'
      }
    if (user.verificationCode === verificationCode) {
      user.verified = true
      await user.save()
      return {
        code: 200,
        message: 'Your Code verified successfully'
      }
    }
    return {
      code: 403,
      message: 'Invalid Code'
    }
  }

  async sendEmail(email) {
    const findUser: UserDocument | null = await User.findOne({ email })

    if (!findUser)
      throw {
        code: 403,
        message: 'User not found!'
      }

    if (findUser.verified === true) return { code: 403, message: 'You are already verified!' }
    const subject = 'Email Verification'
    const verificationCode = randomstring
      .generate({
        length: 6,
        charset: 'numeric'
      })
      .toString()
    const html = `<p>Your Verification Code is: <strong>${verificationCode}</strong></p>`
    await sendEmail({ email: findUser.email, subject, html })
    findUser.verificationCode = verificationCode
    findUser.save()
    return {
      code: 200,
      message: 'Code send successfully'
    }
  }
  @Post('/profile')
  async getProfileDetails(
    @UploadedFile('image') image: Express.Multer.File,
    @FormField() phoneNumber: string,
    @FormField() address: string,
    @Query() email: string
  ): Promise<verifyResponse> {
    const findUser: UserDocument | null = await User.findOne({ email })
    if (!findUser)
      throw {
        code: 403,
        message: 'User Not Found'
      }
    const uploadImagePromise = await uploader.upload(image.path, { upload_preset: 'uploadPictures' })

    const imageUrl = uploadImagePromise.secure_url
    findUser.phoneNumber = phoneNumber
    findUser.imageUrl = imageUrl
    findUser.address = address
    console.log(imageUrl)
    await findUser.save()

    return {
      code: 200,
      message: 'Profile Uploaded'
    }
  }
  @Get('/login/details')
  async getLoginDetails(@Query() email): Promise<LoginDetailResponse> {
    const data = await User.findOne({ email })

    if (!data)
      throw {
        code: 403,
        message: 'Data Not Found'
      }

    return {
      code: 200,
      data: data
    }
  }
}
