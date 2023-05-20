import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import applicationsRoutes from "./routes/applications";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import rideRequestsRoutes from "./routes/ride_requests";
import staffRoutes from "./routes/staff";
import rosterRoutes from "./routes/rosters";
import memberRoutes from "./routes/members";
import session from "express-session";
import env from './util/validateEnv';
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret:env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/applications", applicationsRoutes);

app.use("/api/staff", staffRoutes);

app.use("/api/members", memberRoutes);

app.use("/api/riderequests", rideRequestsRoutes);

app.use("/api/rosters", rosterRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error has occurred.";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
})

export default app;
