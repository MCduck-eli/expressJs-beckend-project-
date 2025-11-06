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
        loginError: req.flash("loginError"),
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("loginError", "All wrong");
        res.redirect("/login");
        return;
    }

    const userExit = await User.findOne({ email });

    if (!userExit) {
        req.flash("loginError", "User not found");
        res.redirect("/login");
        return;
    }

    const isValidPassword = await bcrypt.compare(
        req.body.password,
        userExit.password
    );

    if (!isValidPassword) {
        req.flash("loginError", "Password Wrong");
        res.redirect("/login");
        return;
    }
    console.log(userExit);
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Eli",
        isRegister: true,
        registerError: req.flash("registerError"),
    });
});

router.post("/register", async (req, res) => {
    const { userName, lastName, email, password } = req.body;
    if (!userName || !lastName || !email || !password) {
        req.flash("registerError", "All wrong");
        return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userBase = {
        userName: userName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    };

    const userEmail = await User.findOne({ email });

    if (userEmail) {
        req.flash("registerError", "Email already exits");
        return res.redirect("/register");
    }

    const user = await User.create(userBase);

    res.redirect("/");
});

export default router;
