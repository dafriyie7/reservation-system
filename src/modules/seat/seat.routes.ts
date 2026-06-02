import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTheatreSeats, getTheatreSeats } from "./seat.controller.js";
import { adminProtect } from "../../middlewares/checkAuth.js";

const seatRouter: Router = Router();

seatRouter.post("/create/:theatreId", adminProtect, asyncHandler(createTheatreSeats))
seatRouter.get("/get/:theatreId", asyncHandler(getTheatreSeats))

export default seatRouter;