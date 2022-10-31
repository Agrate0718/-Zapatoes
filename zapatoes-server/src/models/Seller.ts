import mongoose, { Document, Schema } from 'mongoose' ;

export interface ISeller {
    userName: string;
    password: string
}

export interface ISellerModel extends ISeller, Document {}

const SellerSchema: Schema = new Schema(
    {
        userName: { type: String, required: true},

        password: { type: String, required: true}

    },
    {
        versionKey: false
    }
)

export default mongoose.model<ISellerModel>('Author', SellerSchema);