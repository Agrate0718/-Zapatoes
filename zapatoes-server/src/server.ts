import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config'
import Logging from './library/Logging'
import shoeRoutes from './routes/Shoe';
import sellerRoutes from './routes/Seller'
import inquiryRoutes from './routes/Inquiry'

const router = express();
const cors = require('cors')

router.use(cors())
router.use(express.json())


// Connect to Mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority'})
    .then(() => {
        Logging.info('connected to mongoDB.')
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect:');
        Logging.error(error)
    });

// Only start the server if Mongo Connects
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request 
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the response 
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);

        });
        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Rules of our API 
    router.use((req, res, next) => {
        res.header('Access-Control-Alllow-Origin', '*');
        res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes 
    router.use('/sellers', sellerRoutes);
    router.use('/shoes', shoeRoutes)
    router.use('/inquiries', inquiryRoutes)

    // Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}));

    // Error Handling
    router.use((req, res, next ) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message })
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};