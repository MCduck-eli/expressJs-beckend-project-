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

router.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Eli",
        isRegister: true,
    });
});

router.post("/register", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

export default router;
