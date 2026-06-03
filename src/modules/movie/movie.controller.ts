import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import { Movie } from "./movie.dto.js";
import { prisma } from "../../utils/prisma.js";
import { sendResponse } from "../../utils/response.js";

// add a movie
const addMovie = async (req: Request, res: Response) => {
	const { title, description, duration } = req.body;

	if (!title) throw new AppError("Title is required", 400);
	const data: Movie = { title, description, duration };

	const movie = await prisma.movie.create({ data });

	return sendResponse(res, { movie }, "Movie added successfully", 201);
};

// get all movies
const getAllMovies = async (req: Request, res: Response) => { 
	const movies = await prisma.movie.findMany();

	return sendResponse(res, { movies }, "Movies fetched successfully", 200);
}

// get move by id
const getMovieById = async (req: Request, res: Response) => {
	const movieId = req.params.movieId as string;

	if (!movieId) throw new AppError("Id is required", 400);

	const movie = await prisma.movie.findUnique({ where: { id: movieId } });

	return sendResponse(res, { movie }, "Movie fetched successfully", 200);
}

// update a movie
const updateMovie = async (req: Request, res: Response) => { 
	const movieId = req.params.movieId as string;

	if (!movieId) throw new AppError("Id is required", 400);

	// check if movie exists
	const exists = await prisma.movie.findUnique({ where: { id: movieId } });
	if (!exists) throw new AppError("Movie not found", 404);

	const { title, description, duration } = req.body;

	const movieData: Partial<Movie> = {}

	if (title) movieData.title = title;
	if (description) movieData.description = description;
	if (duration) movieData.duration = duration;

	// update movie
	const movie = await prisma.movie.update({ where: { id: movieId }, data: movieData });

	return sendResponse(res, { movie }, "success", 200);
}

export { addMovie, getAllMovies, getMovieById, updateMovie };
