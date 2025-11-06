import { Router } from "express";
import User from "../modules/User.js";
import bcrypt from "bcrypt";

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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userExit = await User.findOne({ email });
    console.log(userExit);

    res.redirect("/");
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Eli",
        isRegister: true,
    });
});

router.post("/register", async (req, res) => {
    const { userName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userBase = {
        userName: userName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    };

    const user = await User.create(userBase);
    console.log(user);

    res.redirect("/");
});

export default router;
