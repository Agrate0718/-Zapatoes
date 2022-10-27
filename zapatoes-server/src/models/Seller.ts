import mongoose, { Document, Schema } from 'mongoose' ;

export interface ISeller {
    name: string;
}

export interface ISellerModel extends ISeller, Document {}

const SellerSchema: Schema = new Schema(
    {
        name: { type: String, required: true}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<ISellerModel>('Author', SellerSchema);