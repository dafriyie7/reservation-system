import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Role, User } from "../modules/auth/auth.dto.js";

// admin protect
export const adminProtect = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user as User;

	// console.log(user);

	if (!user) {
		throw new AppError("You are not logged in", 401);
	}

	if (user.role !== Role.ADMIN) {
		throw new AppError("Admin privileges required", 403);
	}

	next();
};

// auth check
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	const user = req.user as User;

	if (!user) {
		throw new AppError("You are not logged in", 401);
	}

	next()
}