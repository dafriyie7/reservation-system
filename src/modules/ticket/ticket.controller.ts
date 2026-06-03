import { Request, Response } from "express";
import { prisma } from "../../utils/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { sendResponse } from "../../utils/response.js";
import { Ticket, TicketStatus } from "./ticket.dto.js";

const generateTickets = async (req: Request, res: Response) => {
	const theatreId = req.params.theatreId || req.body.theatreId;
	const { movieId, startTime, endTime } = req.body;

	if (!theatreId || !movieId || !startTime || !endTime) {
		throw new AppError("Missing required fields", 400);
	}

	// create schedule
	const movieSchedule = await prisma.movieSchedule.create({
		data: {
			theatreId,
			movieId,
			startTime: new Date(startTime),
			endTime: new Date(endTime),
		},
	});

	// get all seats in theatre
	const seats = await prisma.seat.findMany({
		where: {
			theatreId,
		},
		select: {
			id: true,
		},
	});

	if (!seats.length) {
		throw new AppError("No seats found for theatre", 404);
	}

	// create one ticket for every seat
	const ticketsToGenerate = seats.map((seat) => ({
		seatId: seat.id,
		scheduleId: movieSchedule.id,
	}));

	const createdTickets = await prisma.ticket.createMany({
		data: ticketsToGenerate,
		skipDuplicates: true,
	});

	return sendResponse(
		res,
		{
			schedule: movieSchedule,
			ticketsCreated: createdTickets.count,
		},
		"success",
		201,
	);
};

// get all tickets
const getAllTickets = async (req: Request, res: Response) => {
	const tickets = await prisma.ticket.findMany({
		include: {
			seat: true,
			schedule: { include: { theatre: true, movie: true } },
		},
	});

	// sanitize ticket response
	const sanitizedTickets = tickets.map((ticket) => ({
		id: ticket.id,
		seat: ticket.seat,
		movie: ticket.schedule.movie.title,
		theatre: ticket.schedule.theatre.name,
		schedule: ticket.schedule.startTime,
	}));

	return sendResponse(res, { tickets: sanitizedTickets }, "success", 200);
};

// get ticket details
const getTicketDetails = async (req: Request, res: Response) => {
	const ticketId = req.params.ticketId;

	if (!ticketId) {
		throw new AppError("Ticket ID is required", 400);
	}

	const ticket = await prisma.ticket.findUnique({
		where: { id: ticketId as string },
		include: {
			user: true,
			seat: true,
			schedule: { include: { theatre: true, movie: true } },
		},
	});

	sendResponse(res, ticket, "success", 200);
};

// update a ticket
const updateTicket = async (req: Request, res: Response) => {
	const ticketId = req.params.ticketId;
	const { status, userId } = req.body;

	if (!ticketId || !status) {
		throw new AppError("Ticket ID and status are required", 400);
	}

	let data: Partial<Ticket> = { status, paidAt: new Date() };
	if (userId) data.userId = userId;

	const exists = await prisma.ticket.findUnique({ where: { id: ticketId as string } })
	if (!exists) throw new AppError("Ticket not found", 404)

	// update ticket
	const ticket = await prisma.ticket.update({
		where: { id: ticketId as string },
		data: data
	});

	sendResponse(res, {ticket}, "success", 200)
};

export { generateTickets, getAllTickets, getTicketDetails, updateTicket };
