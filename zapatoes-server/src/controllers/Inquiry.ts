import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry';

const createInquiry = (req: Request, res: Response, next: NextFunction) => {
    const  { name, contactInfo, question }  = req.body;

    const inquiry = new Inquiry({
        _id: new mongoose.Types.ObjectId(),
        name, contactInfo, question
    });

    return inquiry
        .save()
        .then((inquiry) => res.status(201).json({ inquiry }))
        .catch((error) => res.status(500).json({ error }));
};

const readInquiry = (req: Request, res: Response, next: NextFunction) => {
    const inquiryId = req.params.inquiryId;

    return Inquiry.findById(inquiryId)
    .then((inquiry) => (inquiry ? res.status(200).json({ inquiry }) : res.status(404).json({
    message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Inquiry.find()
    .then((inquiries) =>  res.status(200).json({ inquiries }))
    .catch((error) => res.status(500).json({ error }));
};
const updateInquiry = (req: Request, res: Response, next: NextFunction) => {
    const inquiryId = req.params.inquiryId;

    return Inquiry.findById(inquiryId)
    .then((inquiry) => {
        if (inquiry)
        {
            inquiry.set(req.body)

            return inquiry
            .save()
            .then((inquiry) => res.status(201).json({ inquiry }))
            .catch((error) => res.status(500).json({ error }));
        }
        else
        {
            res.status(404).json({ message: 'Not found' })
        }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteInquiry = (req: Request, res: Response, next: NextFunction) => {
    const inquiryId = req.params.inquiryId;

    return Inquiry.findByIdAndDelete(inquiryId)
        .then( inquiry => (inquiry ? res.status(201).json({ message: 'deleted' }) : res.status(404)
        .json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));

};

export default { createInquiry, readInquiry, readAll, updateInquiry, deleteInquiry};