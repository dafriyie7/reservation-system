import { Router } from "express";
import { adminProtect } from "../../middlewares/checkAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateStatus } from "./movieSchedule.controller.js";

const scheduleRouter: Router = Router()

scheduleRouter.post("/update/:scheduleId", adminProtect, asyncHandler(updateStatus))

export default scheduleRouter