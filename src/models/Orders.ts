import mongoose, { Document, Model } from 'mongoose'

const schema = mongoose.Schema

export interface OrderDocument extends Document {
  productId: string
  quantity: number
  totalQuantity: number
  name: string
  price: number
  sellerId: string
  buyerId: string
  buyerName: string
  buyerEmail: string
  buyerNumber: string
  address: string
}
export interface ordersDetailResponse {
  code: number
  data: OrderDocument[]
}
const orderSchema = new schema<OrderDocument>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalQuantity: { type: Number },
  name: { type: String },
  price: { type: Number, required: true },
  sellerId: { type: String, required: true },
  buyerId: { type: String, required: true },
  buyerName: { type: String },
  buyerEmail: { type: String },

  buyerNumber: { type: String },
  address: { type: String, required: true }
})

const Orders: Model<OrderDocument> = mongoose.model<OrderDocument>('Orders', orderSchema)

export default Orders
