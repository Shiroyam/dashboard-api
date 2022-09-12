import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

dotenv.config();

export class App {
	app: Express;
	server: Server;
	port: string;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.app = express();
		this.port = process.env.PORT || '8000';
		this.logger = logger;
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
