import mongoose, { Date, Document, Model, Schema, Types } from 'mongoose'
// import { UserDocument } from './User'

const schema = mongoose.Schema

export interface MedicineDocument extends Document {
  name: string
  description: string
  weight: string
  expireDate: Date
  dosageInstructions: string
  availability: boolean
  price: number
  quantity: number
  imageUrl: string[]
  user: Types.ObjectId
}

export interface MedicineResponse {
  code: number
  message: string
}
export interface medicineDetailResponse {
  code: 200
  data: MedicineDocument[]
}
export interface uploadImageResponse extends MedicineResponse {}

const medicineSchema = new schema<MedicineDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: String },
  expireDate: { type: Date, default: Date.now, required: true },
  dosageInstructions: { type: String, required: true },
  availability: { type: Boolean, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
const Medicine: Model<MedicineDocument> = mongoose.model<MedicineDocument>('Medicine', medicineSchema)
export default Medicine
