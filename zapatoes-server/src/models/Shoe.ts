import { string } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IShoe {
    name: string;

    image: string;

    quality: string;

    price: number;
}

export interface IShoeModel extends IShoe, Document {}

const ShoeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },

        image: { type: String },

        quality: { type: String },

        price: { type: Number }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IShoeModel>('Shoe', ShoeSchema);