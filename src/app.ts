import 'reflect-metadata';

// Set env variables from .env file
import { config } from 'dotenv';
config();

import * as express from 'express';

import { createServer, Server as HttpServer } from 'http';

import { env } from './config/globals';

import { Server } from './api/server';

// Startup

// Connect db
// const connection: Connection = createConnection();

// Init express server
const app: express.Application = new Server().app;
const server: HttpServer = createServer(app);

// Start express server
server.listen(env.NODE_PORT);
