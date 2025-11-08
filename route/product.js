import { Router } from "express";
import addMiddleware from "../middleware/add.js";
import User from "../modules/User.js";
import Product from "../modules/Product.js";

const router = Router();

router.get("/products", async (req, res) => {
    const user = req.userId ? req.userId.toString() : null;
    const products = await Product.find({ user }).populate("user").lean();
    res.render("products", {
        title: "Products | Eli",
        isProducts: true,
        products: products,
    });
});

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).lean();

    res.render("detaile", {
        title: "Product | Eli",
        product: product,
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

    const product = await Product.create({ ...req.body, user: req.userId });
    console.log(product);

    res.redirect("/");
});

router.get("/edit-product/:id", async (req, res) => {
    const { id } = req.params;
    const editProduct = await Product.findById(id).lean();

    res.render("edit-product", {
        title: "EditProduct | Eli",
        editProduct: editProduct,
    });
});

router.post("/edit-product/:id", async (req, res) => {
    const { title, description, image, price } = req.body;
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect("/products");
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findOneAndDelete(id);
    res.redirect("/");
});

export default router;
