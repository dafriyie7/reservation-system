import { Router } from "express";
import { adminProtect } from "../../middlewares/checkAuth.js";
import { generateTickets, getAllTickets, getTicketDetails, updateTicket } from "./ticket.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const ticketRouter: Router = Router();

ticketRouter.post("/generate", adminProtect, asyncHandler(generateTickets))
ticketRouter.get("/all", asyncHandler(getAllTickets))
ticketRouter.get("/:ticketId", asyncHandler(getTicketDetails)),
ticketRouter.post("/update/:ticketId", adminProtect, asyncHandler(updateTicket))

export default ticketRouter;