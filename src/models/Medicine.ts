import mongoose, { Date, Document, Model, Schema, Types } from 'mongoose'
// import { UserDocument } from './User'

const schema = mongoose.Schema

export interface MedicineDocument extends Document {
  // userEmail: string
  name: string
  description: string
  weight: string
  expireDate: Date
  dosageInstructions: string
  availability: boolean
  price: number
  quantity: number
  imageUrl: string[]
  userId: Types.ObjectId
}
export interface editDetailPayload {
  price: number
  quantity: number
}
export interface MedicineResponse {
  code: number
  message: string
}
export interface medicineDetailResponse {
  code: number
  data: MedicineDocument[] | null
}
export interface sendEditMedicineResponse {
  code: number
  message: string
}
export interface uploadImageResponse extends MedicineResponse {}

const medicineSchema = new schema<MedicineDocument>({
  // userEmail: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: String },
  expireDate: { type: Date, default: Date.now, required: true },
  dosageInstructions: { type: String, required: true },
  availability: { type: Boolean, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: Array,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
const Medicine: Model<MedicineDocument> = mongoose.model<MedicineDocument>('Medicine', medicineSchema)
export default Medicine
