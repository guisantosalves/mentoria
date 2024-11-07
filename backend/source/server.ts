import express, { Express } from "express";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import router from "./routes";

const app: Express = express();
const PORT: number = 3000;

// logging
app.use(morgan("dev"));

// parse the request
app.use(express.urlencoded({ extended: true }));

// parse json data
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
    res.status(200).json({});
  }
  next();
});

// routing
app.use("/", router);

// handling with errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("not found");
  res.status(404).json({ message: error.message });
});

// starting server
app.listen(PORT, () => console.log("Ther server is running in port " + PORT));
