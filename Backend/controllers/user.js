const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const check = await User.findOne({ email });
    if (check)
      return res
        .status(400)
        .json({ message: "Email already exists, try different mail" });

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "first name must between 3 and 30 character." });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "last name must between 3 and 30 character." });
    }
    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "password must between 6 and 40 character." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);
    const user = await new User({
      first_name,
      last_name,
      email,
      username,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
