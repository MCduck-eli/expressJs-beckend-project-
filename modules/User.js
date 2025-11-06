import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, uniqu: true },
    password: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
