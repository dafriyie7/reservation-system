import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../utils/prisma.js";
import { scheduleStatus } from "./movieSchedule.dto.js";
import { sendResponse } from "../../utils/response.js";

// update a schedule
const updateStatus = async (req: Request, res: Response) => {
	const { scheduleId } = req.params;
	const { status } = req.body;

	if (!scheduleId || !status)
		throw new AppError("status and scheduleId required", 400);

	const movieSchedule = await prisma.movieSchedule.update({
		where: { id: scheduleId as string },
		data: { status: status as scheduleStatus}
	});

	sendResponse(res, {}, "success", 200)
};

export { updateStatus };
