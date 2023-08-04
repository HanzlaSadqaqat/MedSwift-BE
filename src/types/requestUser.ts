import { ObjectId } from 'mongoose'

export interface RequestUser {
  email: string
  _id: ObjectId
}
