import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Seller from "../models/Seller";

const createSeller = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const seller = new Seller({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return seller
        .save()
        .then((seller) => res.status(201).json({ seller }))
        .catch((error) => res.status(500).json({ error }));
};

const readSeller = (req: Request, res: Response, next: NextFunction) => {
    const sellerId = req.params.sellerId;

    return Seller.findById(sellerId)
    .then((seller) => (seller ? res.status(200).json({ seller }) : res.status(404).json({
    message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Seller.find()
    .then((sellers) =>  res.status(200).json({ sellers }))
    .catch((error) => res.status(500).json({ error }));
};
const updateSeller = (req: Request, res: Response, next: NextFunction) => {
    const sellerId = req.params.sellerId;

    return Seller.findById(sellerId)
    .then((seller) => {
        if (seller)
        {
            seller.set(req.body)

            return seller
            .save()
            .then((seller) => res.status(201).json({ seller }))
            .catch((error) => res.status(500).json({ error }));
        }
        else
        {
            res.status(404).json({ message: 'Not found' })
        }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteSeller = (req: Request, res: Response, next: NextFunction) => {
    const sellerId = req.params.sellerId;

    return Seller.findByIdAndDelete(sellerId)
        .then( seller => (seller ? res.status(201).json({ message: 'deleted' }) : res.status(404)
        .json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));

};

export default { createSeller, readSeller, readAll, updateSeller, deleteSeller};