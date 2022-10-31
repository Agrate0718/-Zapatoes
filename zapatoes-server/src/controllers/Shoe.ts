import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Shoe from '../models/Shoe';

const createShoe = (req: Request, res: Response, next: NextFunction) => {
    const  { name, image, quality, price  }  = req.body;

    const shoe = new Shoe({
        _id: new mongoose.Types.ObjectId(),
        name, image, quality, price
    });

    return shoe
        .save()
        .then((shoe) => res.status(201).json({ shoe }))
        .catch((error) => res.status(500).json({ error }));
};

const readShoe = (req: Request, res: Response, next: NextFunction) => {
    const shoeId = req.params.shoeId;

    return Shoe.findById(shoeId)
    .then((shoe) => (shoe ? res.status(200).json({ shoe }) : res.status(404).json({
    message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Shoe.find()
    .then((shoes) =>  res.status(200).json({ shoes }))
    .catch((error) => res.status(500).json({ error }));
};
const updateShoe = (req: Request, res: Response, next: NextFunction) => {
    const shoeId = req.params.shoeId;

    return Shoe.findById(shoeId)
    .then((shoe) => {
        if (shoe)
        {
            shoe.set(req.body)

            return shoe
            .save()
            .then((shoe) => res.status(201).json({ shoe }))
            .catch((error) => res.status(500).json({ error }));
        }
        else
        {
            res.status(404).json({ message: 'Not found' })
        }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteShoe = (req: Request, res: Response, next: NextFunction) => {
    const shoeId = req.params.shoeId;

    return Shoe.findByIdAndDelete(shoeId)
        .then( shoe => (shoe ? res.status(201).json({ message: 'deleted' }) : res.status(404)
        .json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));

};

export default { createShoe, readShoe, readAll, updateShoe, deleteShoe};