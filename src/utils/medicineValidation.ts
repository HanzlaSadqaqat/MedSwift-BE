import { MedicineDocument, editDetailPayload } from 'src/models/Medicine'
import Joi from 'joi'

export const medicineInfoValidation = (data: MedicineDocument): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    weight: Joi.string(),
    expireDate: Joi.date().required(),
    dosageInstructions: Joi.string().required(),
    availability: Joi.boolean().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    userId: Joi.object()
  }).validate(data)

export const editDetailValidation = (data: editDetailPayload): Joi.ValidationResult =>
  Joi.object({
    price: Joi.number(),
    quantity: Joi.number()
  }).validate(data)

// export const medicineFileValidation = (data: UploadedImage): Joi.ValidationResult =>
//   Joi.object({
//     folderName: Joi.string(),
//     originalName: Joi.string(),
//     encoding: Joi.string(),
//     mimeType: Joi.string(),
//     destination: Joi.string(),
//     fileName: Joi.string(),
//     path: Joi.string(),
//     size: Joi.string()
//   }).validate(data)
