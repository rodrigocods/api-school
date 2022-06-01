import 'reflect-metadata';

// Set env variables from .env file
import { config } from 'dotenv';
config();

import * as express from 'express';
import { Server } from './api/server';
import { AppDataSource } from '../database/data-source';

// Init express server
const app: express.Application = new Server().app;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });


// Start express server
app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is running on port ${process.env.NODE_PORT}...`);
});
