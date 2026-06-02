import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import passport from "./config/oauth.js";
import sessionConfig from "./config/sessionConfig.js";
import userRouter from "./modules/auth/auth.routes.js";
import { AppError } from "./utils/AppError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import theatreRouter from "./modules/theatre/theatre.routes.js";
import movieRouter from "./modules/movie/movie.routes.js";
import seatRouter from "./modules/seat/seat.routes.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());

// Session middleware
app.use(sessionConfig);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// log requests and responses
app.use((req: Request, res: Response, next: NextFunction) => {
	const start = Date.now();

	console.log(
		`request: ${req.method} ${req.url} ${
			req.method === "POST" ? JSON.stringify(req.body) : ""
		}`,
	);

	res.on("finish", () => {
		const duration = Date.now() - start;

		console.log(
			`response: ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`,
		);
	});

	next();
});

app.get("/", (req: Request, res: Response) => res.json({success: true, message: "Server health: OK!"}));

// Protected route
app.get("/home", (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).send("Unauthorized");
	}

	res.json({
		message: "Successfully authenticated",
		user: req.user,
	});
});

app.use("/api/auth", userRouter)
app.use("/api/theatre", theatreRouter)
app.use("/api/movie", movieRouter)
app.use("/api/seat", seatRouter)

// not found
app.use((req: Request, res: Response) => { 
	throw new AppError("Route not found", 404);
})

// error handler
app.use(errorHandler)

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
