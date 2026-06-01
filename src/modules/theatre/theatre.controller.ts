import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../utils/prisma.js";
import { sendResponse } from "../../utils/response.js";
import { Theatre } from "./theatre.dto.js";

// add theatre
const addTheatre = async (req: Request, res: Response) => {
	const { name, address } = req.body

	if (!name || !address) throw new AppError("All fields are required fields", 400)

	const theatre = await prisma.theatre.create({
		data: {
			name,
			address
		}
	})

	return sendResponse(res, {theatre}, "success", 201)
}


// get all theatres
const getAllTheatres = async (req: Request, res: Response) => {
	const theatres = await prisma.theatre.findMany()

	return sendResponse(res, {theatres}, "success", 200)
}

// get a theatre by id
const getTheatreById = async (req: Request, res: Response) => { 
	const { id } = req.params

	if (!id) throw new AppError("No id provided", 403)

	const theatre = await prisma.theatre.findUnique({
		where: {
			id: id as string
		}
	})

	return sendResponse(res, {theatre}, "success", 200)
}

// update a theatre
const updateTheatre = async (req: Request, res: Response) => {
	const { id } = req.params

	if (!id) throw new AppError("No id provided", 403)
	
	const exists = await prisma.theatre.findUnique({
		where: {
			id: id as string
		}
	})
	if (!exists) throw new AppError("Theatre not found", 404)

	const {name, address } = req.body
	
	const data: Partial<Theatre> = {};
	if (name) data.name = name
	if (address) data.address = address

	const theatre = await prisma.theatre.update({
		where: { id: id as string },
		data: data
	})

	return sendResponse(res, {theatre}, "success", 200)
}

// delete a theatre
const deleteTheatre = async (req: Request, res: Response) => { 
	const { id } = req.params || req.body
	
	if (!id) throw new AppError("No id provided", 403)

	const exists = await prisma.theatre.findUnique({
		where: {
			id: id as string
		}
	})

	if (!exists) throw new AppError("Theatre not found", 404)

	const theatre = await prisma.theatre.delete({
		where: {
			id: id as string
		}
	})

	return sendResponse(res, {theatre}, "Theatre deleted successfully", 200)
}

export {
	addTheatre,
	getAllTheatres,
	getTheatreById,
	updateTheatre,
	deleteTheatre
}