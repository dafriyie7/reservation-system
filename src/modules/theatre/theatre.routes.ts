import { Router } from "express";
import { adminProtect } from "../../middlewares/checkAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addTheatre, getAllTheatres, getTheatreById, updateTheatre } from "./theatre.controller.js";

const theatreRouter: Router = Router()

theatreRouter.post("/add", adminProtect, asyncHandler(addTheatre))
theatreRouter.get("/all", asyncHandler(getAllTheatres))
theatreRouter.get("/:id", asyncHandler(getTheatreById))
theatreRouter.post("/update/:id", adminProtect, asyncHandler(updateTheatre))

export default theatreRouter;