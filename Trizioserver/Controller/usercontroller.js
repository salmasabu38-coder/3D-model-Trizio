import User from "../Modal/userschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER FUNCTION
export const savedata = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: 400,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 200,
      message: "Register successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, err, message: "Server error" });
  }
};

// LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect Password",
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: finduser._id, email: finduser.email },
      "MY_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: 200,
      message: "Login successful",
      token,
      id: finduser._id 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, err, message: "Server error" });
  }
};
