import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const saveToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });

    return saveToken;
};

export default generateToken;
