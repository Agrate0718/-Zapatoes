import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry {
    name: string;

    contactInfo: string;

    question: string;
}

export interface IInquiryModel extends IInquiry, Document {}

const InquirySchema: Schema = new Schema(
    {
        name: { type: String, required: true},

        contactInfo: { type: String, required: true},

        question: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IInquiryModel>('Inquiry',InquirySchema)