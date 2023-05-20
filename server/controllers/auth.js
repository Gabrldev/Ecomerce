import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { httpError } from "../utils/HttpError.js";

const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      ocupation,
    } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashPass,
      picturePath,
      friends,
      location,
      ocupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impresions: Math.floor(Math.random() * 10000),
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    httpError(res, error, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found"});
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "wrong password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });

  } catch (error) {
    httpError(res, error, 500);
  }
};

export { register, login };
