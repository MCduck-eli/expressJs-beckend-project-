import { Router } from "express";
import User from "../modules/User.js";
import bcrypt from "bcrypt";
import generateToken from "../service/token.js";
import authMiddleware from "../middleware/auth.js";
import Product from "../modules/Product.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await Product.find().lean();

    res.render("index", {
        title: "Boomshop | Eli",
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    });
});

router.get("/login", authMiddleware, (req, res) => {
    res.render("login", {
        title: "Login | Eli",
        isLogin: true,
        loginError: req.flash("loginError"),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
    return;
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
    const token = generateToken(userExit);
    res.cookie("token", token, { secure: true });
    res.redirect("/");
});

router.get("/register", authMiddleware, (req, res) => {
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
    const token = generateToken(user._id);
    res.cookie("token", token, { secure: true });

    res.redirect("/");
});

export default router;
