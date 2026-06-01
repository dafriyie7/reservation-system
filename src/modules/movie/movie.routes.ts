import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addMovie, getAllMovies, getMovieById, updateMovie } from "./movie.controller.js";
import { adminProtect } from "../../middlewares/checkAuth.js";

const movieRouter: Router = Router();

movieRouter.post("/add", adminProtect, asyncHandler(addMovie));
movieRouter.get("/all", asyncHandler(getAllMovies))
movieRouter.get("/:movieId", asyncHandler(getMovieById))
movieRouter.patch("/update/:movieId", adminProtect, asyncHandler(updateMovie))

export default movieRouter;
