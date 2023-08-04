import nodemailer from 'nodemailer'
import { sendEmailDetail } from '../models/User'

const initializeMailer = () =>
  nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST,
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
  })

export const sendEmail = async (data: sendEmailDetail) => {
  try {
    const mailer = initializeMailer()

    await mailer.sendMail({
      from: process.env.USER,
      to: data.email,
      subject: data.subject,
      html: data.html,
      text: data.text
    })
    console.log('sendEmail')
    return
  } catch (error) {
    console.log(error)
  }
}
