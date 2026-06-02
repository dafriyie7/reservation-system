import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../utils/prisma.js";
import { sendResponse } from "../../utils/response.js";

// add seats
const createTheatreSeats = async (req: Request, res: Response) => {
	const theatreId = req.params.theatreId as string;
	const { seatNumber = 9 } = req.body;

	if (!theatreId) {
		throw new AppError("Theatre ID is required", 400);
	}

	// Verify theatre exists
	const theatre = await prisma.theatre.findUnique({
		where: { id: theatreId },
	});

	if (!theatre) {
		throw new AppError("Theatre not found", 404);
	}

	const rows: string[] = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const seatsToCreate: {
		rowLabel: string;
		seatNumber: number;
		theatreId: string;
	}[] = [];

	// Create A1-A9, B1-B9, etc.
	for (const row of rows) {
		for (let seat = 1; seat <= seatNumber; seat++) {
			seatsToCreate.push({
				rowLabel: row,
				seatNumber: seat,
				theatreId,
			});
		}
	}

	const createdSeats = await prisma.seat.createMany({
		data: seatsToCreate,
		skipDuplicates: true, // optional
	});

	res.status(201).json({
		status: "success",
		data: {
			count: createdSeats.count,
			seats: seatsToCreate.map(
				(seat) => `${seat.rowLabel}${seat.seatNumber}`,
			),
		},
	});
};

// get all seats for a theatre
const getTheatreSeats = async (req: Request, res: Response) => { 
	const theatreId = req.params.theatreId as string;

	if (!theatreId) {
		throw new AppError("Theatre ID is required", 400);

	}

	const theatre = await prisma.theatre.findUnique({
		where: { id: theatreId },
		include: { seats: true },
	});

	return sendResponse(res, {theatre}, "success", 200)
}

export { createTheatreSeats, getTheatreSeats};
