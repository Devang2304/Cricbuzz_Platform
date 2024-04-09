const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../schema/schema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordsExist,
  insertData,
} = require("../utils/sqlFunc");
const dotenv=require('dotenv');

require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const newUser = {
    userId: uuidv4(),
    email,
    password: hashpassword,
  };
  try {
    await createTable(userSchema);
    const userExist = await checkRecordsExist("users", "email", email);
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      await insertData("users", newUser);
      res.status(200).json({status:"Admin Account successfully created",status_code:200});
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
    return;
  }
  try {
    const userExist = await checkRecordsExist("users", "email", email);
    if (userExist) {
      if (!userExist.password) {
        return res.status(400).json({ msg: "wrong password" });
      }

      const passwordMatch = await bcrypt.compare(password, userExist.password);

      if (!passwordMatch) {
        return res.status(400).json({ msg: "wrong password" });
      } else {
        res.status(200).json({
          "status": "Login successful",
          "status_code": 200,
          "user_id": userExist.userId,
          token: generateToken(userExist.userId),
        });
      }
    } else {
      res.status(400).json({ "status": "Incorrect username/password provided. Please retry",
       "status_code": 401 });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const check = async (req, res) => {
  res.status(200).json("yeah working");
};
module.exports = { register, login,check};
