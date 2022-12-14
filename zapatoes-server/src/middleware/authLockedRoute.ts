const jwt = require('jsonwebtoken')
const db = require('../../models')
import { NextFunction, Response, Request  } from "express";
import Seller from "../models/Seller";

// route specific middleware for jwt authorization
const authLockedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // jwt from client
    const authHeader = req.headers.authorization
    // will throw to catch if jwt can't be verified
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
    // find Seller from db
    const foundSeller = await Seller.findById(decode.id)
    // mount Seller on locals
    res.locals.Seller = foundSeller
    next()

  } catch(error) {
    console.log(error)
    // respond with status 401 if auth fails
    res.status(401).json({ msg: 'auth failed' })
  }
} 

module.exports = authLockedRoute