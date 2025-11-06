import { Router } from "express";

const router = Router();

router.get("/products", (req, res) => {
    res.render("products", {
        title: "Products | Eli",
        isProducts: true,
    });
});

router.get("/add", (req, res) => {
    res.render("add", {
        title: "Add | Eli",
        isAdd: true,
    });
});

export default router;
