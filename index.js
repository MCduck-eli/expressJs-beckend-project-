import express, { json } from "express";
import { create } from "express-handlebars";
import AuthRouter from "./route/auth.js";
import ProductsRoter from "./route/product.js";

const app = express();

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
app.use(json());

app.use(AuthRouter);
app.use(ProductsRoter);

const startApp = () => {
    try {
        const PORT = process.env.PORT || 4100;
        app.listen(PORT, console.log("Port worked succesfully"));
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

startApp();
