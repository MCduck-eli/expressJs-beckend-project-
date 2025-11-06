import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Boomshop | Eli",
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login | Eli",
        isLogin: true,
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Eli",
        isRegister: true,
    });
});

export default router;
