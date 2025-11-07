export default (req, res, next) => {
    if (req.cookies.token) {
        res.redirect("/");
        return;
    }
    next();
};
