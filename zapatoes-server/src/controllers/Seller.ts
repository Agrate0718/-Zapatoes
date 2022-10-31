import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Seller from "../models/Seller";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check if user exists already
        const findSeller = await Seller.findOne({
          userName: req.body.userName
        })
    
        // don't allow userNames to register twice
        if(findSeller) return res.status(400).json({ msg: 'userName exists already' })
      
        // hash password
        const password = req.body.password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
      
        // create new user
        const newSeller = new Seller({
          userName: req.body.userName,
          password: hashedPassword
        })
      
        await newSeller.save()
    
        // create jwt payload
        const payload = {
          userName: newSeller.userName, 
          id: newSeller.id
        }
    
        // sign jwt and send back
        const token = await jwt.sign(payload, process.env.JWT_SECRET)
    
        res.json({ token })
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
      }
};

const sellerLogin = async (req: Request, res: Response) => {
    try {
        // try to find user in the db
        const foundSeller = await Seller.findOne({
          userName: req.body.userName
        })
    
        const noLoginMessage = 'Incorrect username or password'
    
        // if the user is not found in the db, return and sent a status of 400 with a message
        if(!foundSeller) return res.status(400).json({ msg: noLoginMessage })
        
        // check the password from the req body against the password in the database
        const matchPasswords = await bcrypt.compare(req.body.password, foundSeller.password)
        
        // if provided password does not match, return an send a status of 400 with a message
        if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })
    
        // create jwt payload
        const payload = {
          name: foundSeller.userName, 
          id: foundSeller.id
        }
    
        // sign jwt and send back
        const token = await jwt.sign(payload, process.env.JWT_SECRET)
    
        res.json({ token })
      } catch(error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
      }
}

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

export default { createSeller, readSeller, readAll, updateSeller, deleteSeller, sellerLogin};