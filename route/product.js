import { Router } from "express";
import Product from "../modules/Product.js";
import addMiddleware from "../middleware/add.js";

const router = Router();

router.get("/products", (req, res) => {
    res.render("products", {
        title: "Products | Eli",
        isProducts: true,
    });
});

router.get("/add", addMiddleware, (req, res) => {
    res.render("add", {
        title: "Add | Eli",
        isAdd: true,
        addError: req.flash("addError"),
    });
});

router.post("/add", async (req, res) => {
    const { title, description, image, price } = req.body;
    if (!title || !description || !image || !price) {
        req.flash("addError", "The information is incomplete!");
        res.redirect("/add");
        return;
    }
    await Product.create(req.body);
    res.redirect("/");
});

export default router;
