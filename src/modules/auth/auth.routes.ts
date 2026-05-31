import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { logoutUser, signupUser } from "./auth.controller.js";
import passport from "../../config/oauth.js";
import { AppError } from "../../utils/AppError.js";
import { sendResponse } from "../../utils/response.js";

const userRouter: Router = Router();

// passport local strategy sign in
userRouter.post("/login", (req: Request, res:Response, next: NextFunction) => {
	passport.authenticate("local", (err: any, user: any, info: any) => {
		if (err) return next(new AppError(err.message, 500));
		if (!user)
			return next(new AppError(info?.message || "Unauthorized", 401));

		req.logIn(user, (err) => {
			if (err) return next(new AppError(err.message, 500));

			return sendResponse(res, { user }, "success", 200);
		});
	})(req, res, next);
});

// google auth-2.0 authentication
userRouter.get("/login", (req: Request, res: Response) => {
	res.send(`<a href="/api/auth/google">Authenticate with Google</a>`);
});
userRouter.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	}),
); // sign-in
userRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		res.redirect("/home");
	},
); // callback route

// standard auth routes
userRouter.post("/signup", asyncHandler(signupUser));
userRouter.get("/logout", asyncHandler(logoutUser));

export default userRouter;
