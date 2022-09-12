import { Request, Response } from 'express';

export interface IExeptionFilter {
	catch: (error: Error, req: Request, res: Response) => void;
}
