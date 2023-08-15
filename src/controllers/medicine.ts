import Medicine, { MedicineDocument, medicineDetailResponse, sendEditMedicineResponse, uploadImageResponse } from '../models/Medicine'
import { Post, Route, Tags, UploadedFiles, FormField, Query, Get, BodyProp, Patch } from 'tsoa'
import { uploader } from '../utils/s3Utils'
import { Types } from 'mongoose'

@Route('api/medicine')
@Tags('Medicine')
export class medicineController {
  @Post('/upload')
  async getMedicineFile(
    @FormField() name,
    @FormField() description,
    @FormField() weight,
    @FormField() expireDate,
    @FormField() dosageInstructions,
    @FormField() availability,
    @FormField() price,
    @FormField() quantity,
    @Query() userId,
    @UploadedFiles() image: Express.Multer.File[]
  ): Promise<uploadImageResponse | string> {
    const uploadedPromise = await image.map(async (image) => {
      return await uploader.upload(image.path, { upload_preset: 'uploadPictures' })
    })

    const result = await Promise.all(uploadedPromise)
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.log('s3 error: ', error)
        throw {
          code: 401,
          message: 'promise rejected'
        }
      })
    if (!result)
      throw {
        code: 403,
        message: 'invalid image'
      }
    let imageUrl = result.map((result) => result.secure_url)
    const newMedicine: MedicineDocument = new Medicine({
      name,
      description,
      weight,
      expireDate,
      dosageInstructions,
      availability,
      price,
      quantity,
      userId,
      imageUrl
    })
    await newMedicine.save()
    console.log('done')
    return {
      code: 200,
      message: 'image uploaded successfully'
    }
  }
  @Get('/detail')
  async getMedicineDetails(): Promise<medicineDetailResponse> {
    const data = await Medicine.find()

    return {
      code: 200,
      data: data
    }
  }
  @Patch('/edit')
  async editMedicineDetails(@Query() id: string, @BodyProp() quantity: number, @BodyProp() price: number): Promise<sendEditMedicineResponse> {
    console.log(id)
    await Medicine.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          price,
          quantity
        }
      }
    )
    console.log('done')

    return {
      code: 200,
      message: 'Data updated successfully'
    }
  }
}
