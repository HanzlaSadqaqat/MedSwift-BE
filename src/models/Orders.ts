import mongoose, { Document, Model } from 'mongoose'

const schema = mongoose.Schema

export interface OrderDocument extends Document {
  productId: string
  quantity: number
  name: string
  price: number
  userId: string
}
export interface ordersDetailResponse {
  code: number
  data: object
}
const orderSchema = new schema<OrderDocument>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String },
  price: { type: Number, required: true },
  userId: { type: String, required: true }
})

const Orders: Model<OrderDocument> = mongoose.model<OrderDocument>('Orders', orderSchema)

export default Orders
