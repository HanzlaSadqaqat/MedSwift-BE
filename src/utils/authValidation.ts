import Joi from 'joi'
import { LoginPayload, SignupPayload, loginDetailPayload, profilePayload, sendEmailPayload, verificationPayload } from '../models/User'
// import { PassThrough } from 'stream'

export const signUpValidation = (data: SignupPayload): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18),
    conformPassword: Joi.string().required().min(8).max(18),
    role: Joi.string().required()
  }).validate(data)

export const loginValidation = (data: LoginPayload): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18)
  }).validate(data)

export const profileValidation = (data: profilePayload): Joi.ValidationResult =>
  Joi.object({
    image: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.string()
  }).validate(data)

export const verifyValidation = (data: verificationPayload): Joi.ValidationResult =>
  Joi.object({
    verificationCode: Joi.string().length(6).required(),
    email: Joi.string().email().required()
  }).validate(data)

export const sendEmailValidation = (data: sendEmailPayload): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().email().required()
  }).validate(data)

export const loginDetailValidation = (data: loginDetailPayload): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().email()
  }).validate(data)
