import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res.json({ success: false, message: "Email Already Exist!" });
    }

    const hanshedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hanshedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    const userData = {name: newUser.name}

    return res.json({success: true, message: "User Registered", userData});

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
