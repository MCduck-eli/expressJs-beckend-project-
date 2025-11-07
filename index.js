import express, { json } from "express";
import { create } from "express-handlebars";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import AuthRouter from "./route/auth.js";
import ProductsRoter from "./route/product.js";
import cookieParser from "cookie-parser";
import _varMiddleware from "./middleware/var.js";

dotenv.config();

const app = express();

process.removeAllListeners("warning");

const hbs = create({
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "Eli", resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.use(flash());
app.use(json());
app.use(_varMiddleware);

app.use(AuthRouter);
app.use(ProductsRoter);

const startApp = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            console.log("Database connected")
        );
        const PORT = process.env.PORT || 4101;
        app.listen(PORT, console.log("Port worked succesfully"));
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

startApp();
