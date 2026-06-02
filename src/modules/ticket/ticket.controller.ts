import { Request, Response } from "express";

// create tickets
const createTickets = async (req: Request, res: Response) => { 
	const theatreId = req.params.theatreId as string || req.body.theatreId as string
	const total = req.body.total as number;

	if (!theatreId || !total) {
		throw new Error("Theatre ID or total tickets required");
	}

	
}