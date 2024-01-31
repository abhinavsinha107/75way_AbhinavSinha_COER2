import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDatabase } from "./dbConnection";
import customerAuthRoutes from "./routes/customerAuth.route"
import driverAuthRoutes from "./routes/driverAuth.route"
import customerLocRoutes from "./routes/customerLoc.route"
import driverLocRoutes from "./routes/driverLoc.route"

dotenv.config();
const app = express();
const PORT = 8000;

declare global {
    namespace Express {
        interface Request {
            customerId: string;
            driverId: string;
        }
    }
}

app.use(cors({ credentials: true }));
app.use(cookieParser())
app.use(bodyParser.json());


app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Taxi App");
})

// Connection with DB
connectToDatabase(process.env.MONGO_URL as string);

app.listen(PORT, () => {
    console.log(`App is live at http://localhost:${PORT}`)
})

// Routes
app.use("/api/customerAuth", customerAuthRoutes);
app.use("/api/driverAuth", driverAuthRoutes);
app.use("/api/customerLoc", customerLocRoutes);
app.use("/api/driverLoc", driverLocRoutes);