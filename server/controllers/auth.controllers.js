import bcrypt from 'bcrypt';
// import { Jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      purchaseLists,
      collaborators,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      purchaseLists,
      collaborators,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // Check if user exists
    if (!user)
      return res.status(400).json({ msg: 'This user does not exist.' });

    // compare user password provided and what is saved in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    // Create JWT token for verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete password so its not sent to FE
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
